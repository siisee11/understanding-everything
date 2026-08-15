#!/usr/bin/env node

import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const templateMode = args.includes("--template");
const profileIndex = args.indexOf("--profile");
const profileArg = profileIndex >= 0 ? args[profileIndex + 1] : undefined;
const fileArg = args.find((arg, index) =>
  !arg.startsWith("--") && !(profileIndex >= 0 && index === profileIndex + 1),
);
const validProfiles = new Set([
  "editorial-v1",
  "simulation-essay-v1",
  "playable-post-v1",
]);

if (!fileArg || (profileIndex >= 0 && !profileArg)) {
  console.error(
    "Usage: node validate-explainer.mjs <page.html> [--template] [--profile editorial-v1|simulation-essay-v1|playable-post-v1]",
  );
  process.exit(2);
}

if (profileArg && !validProfiles.has(profileArg)) {
  console.error(`[FAIL] Unknown profile: ${profileArg}.`);
  process.exit(2);
}

const file = resolve(fileArg);
let html;

try {
  if (!statSync(file).isFile()) throw new Error("path is not a file");
  html = readFileSync(file, "utf8");
} catch (error) {
  console.error(`[FAIL] Cannot read ${file}: ${error.message}`);
  process.exit(2);
}

const errors = [];
const warnings = [];
const requireMatch = (pattern, message) => {
  if (!pattern.test(html)) errors.push(message);
};
const requireCondition = (condition, message) => {
  if (!condition) errors.push(message);
};
const warnUnless = (pattern, message) => {
  if (!pattern.test(html)) warnings.push(message);
};
const tagAttribute = (tag, name) => tag.match(
  new RegExp(`\\b${name}=["']([^"']*)["']`, "i"),
)?.[1];
const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))]
  .map((match) => match[0]);
const hasClass = (tag, className) => (tagAttribute(tag, "class") || "")
  .split(/\s+/)
  .includes(className);

const metaTags = tags("meta");
const profileMetas = metaTags.filter((tag) => tagAttribute(tag, "name") === "explainer-profile");
const declaredProfile = profileMetas.length === 1
  ? tagAttribute(profileMetas[0], "content")
  : undefined;
const legacyEditorial = metaTags.some((tag) =>
  tagAttribute(tag, "name") === "explainer-ui"
  && tagAttribute(tag, "content") === "declaude-editorial-v1",
);
const profile = profileArg || declaredProfile || (legacyEditorial ? "editorial-v1" : undefined);

if (profileMetas.length > 1) {
  errors.push("Declare exactly one explainer-profile meta marker.");
}
if (!profile) {
  errors.push("Declare an explainer-profile meta marker.");
} else if (!validProfiles.has(profile)) {
  errors.push(`Unsupported explainer profile: ${profile}.`);
}
if (profileArg && declaredProfile && profileArg !== declaredProfile) {
  errors.push(`--profile ${profileArg} conflicts with declared profile ${declaredProfile}.`);
}
if (!declaredProfile && legacyEditorial) {
  warnings.push("Legacy declaude-editorial-v1 marker accepted as editorial-v1; migrate to explainer-profile.");
}

requireMatch(/<!doctype html>/i, "Missing HTML doctype.");
requireMatch(/<html\b[^>]*\blang=["'][^"']+["']/i, "Set a non-empty html lang attribute.");
requireMatch(/<meta\b[^>]*charset=["']?utf-8/i, "Declare UTF-8 encoding.");
requireMatch(/<meta\b[^>]*name=["']viewport["']/i, "Add a viewport meta tag.");
requireCondition(metaTags.some((tag) =>
  tagAttribute(tag, "name") === "learning-design"
  && tagAttribute(tag, "content") === "discovery-first-v1"
), "Declare discovery-first-v1 as the learning design.");
requireMatch(/<title>\s*[^<]+\s*<\/title>/i, "Add a meaningful document title.");
requireMatch(/<main\b/i, "Use a main landmark.");
requireMatch(/<section\b[^>]*\bid=["']sources["']/i, "Include a sources section with id=\"sources\".");
requireMatch(/<noscript\b/i, "Include a readable no-JavaScript message.");
requireMatch(/:focus-visible/i, "Provide a visible keyboard focus style.");
requireMatch(/prefers-reduced-motion/i, "Respect prefers-reduced-motion.");
requireMatch(/@media\s*\([^)]*max-width/i, "Include a narrow-screen layout rule.");

if (!templateMode && /\{\{[A-Z0-9_]+\}\}/.test(html)) {
  errors.push("Unresolved template placeholders remain.");
}

if (/<script\b[^>]*\bsrc=["'](?!data:)[^"']+["']/i.test(html)) {
  errors.push("Script src dependencies make the explainer non-self-contained.");
}
if (/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["'](?!data:)[^"']+["']/i.test(html)) {
  errors.push("Stylesheet href dependencies make the explainer non-self-contained.");
}

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicates.length) errors.push(`Duplicate ids: ${duplicates.join(", ")}.`);

for (const match of html.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)) {
  if (!ids.includes(match[1]) && !templateMode) {
    errors.push(`JavaScript references missing id: ${match[1]}.`);
  }
}

for (const tag of tags("button")) {
  if (!/\btype=["'](?:button|submit|reset)["']/i.test(tag)) {
    errors.push("Every button must declare its type.");
  }
}

const labelsFor = new Set(
  tags("label").map((tag) => tagAttribute(tag, "for")).filter(Boolean),
);
for (const match of html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
  const attrs = match[2];
  if (/\btype=["']hidden["']/i.test(attrs)) continue;
  const id = attrs.match(/\bid=["']([^"']+)["']/i)?.[1];
  const beforeControl = html.slice(0, match.index);
  const nestedInLabel = beforeControl.lastIndexOf("<label")
    > beforeControl.lastIndexOf("</label");
  const accessibleName = /\baria-label(?:ledby)?=["'][^"']+["']/i.test(attrs)
    || (id && labelsFor.has(id))
    || nestedInLabel;
  if (!accessibleName) errors.push(`A ${match[1].toLowerCase()} control has no accessible label.`);
}

for (const match of html.matchAll(/<canvas\b([^>]*)>([\s\S]*?)<\/canvas>/gi)) {
  const attrs = match[1];
  const fallback = match[2].replace(/<[^>]+>/g, "").trim();
  if (!/\baria-label(?:ledby)?=["'][^"']+["']/i.test(attrs)) {
    errors.push("Every canvas needs an aria-label or aria-labelledby.");
  }
  if (!fallback) warnings.push("Canvas has no fallback text between its tags.");
}

const sourceSection = html.match(
  /<section\b[^>]*\bid=["']sources["'][^>]*>([\s\S]*?)<\/section>/i,
)?.[1] ?? "";
if (!templateMode && !/<a\b[^>]*\bhref=["']https?:\/\//i.test(sourceSection)) {
  errors.push("The sources section must link to at least one web source.");
}

if (!templateMode) {
  warnUnless(/\baria-live=["'](?:polite|assertive)["']/i, "No aria-live region found for changing text.");
}
warnUnless(/<h1\b/i, "No h1 heading found.");
warnUnless(/<h2\b/i, "No h2 headings found.");

const bodyTag = tags("body")[0] || "";

if (profile === "editorial-v1") {
  requireCondition(
    hasClass(bodyTag, "editorial-profile") || hasClass(bodyTag, "declaude-editorial"),
    "Use the editorial-profile body class.",
  );
  requireMatch(/--paper:\s*#faf9f6\b/i, "Use the editorial paper token #faf9f6.");
  requireMatch(/--ink:\s*#1a1a18\b/i, "Use the editorial ink token #1a1a18.");
  requireMatch(/--muted:\s*#6b6862\b/i, "Use the editorial muted token #6b6862.");
  requireMatch(/--accent:\s*#b3541e\b/i, "Use the editorial accent token #b3541e.");
  requireMatch(/--line:\s*#e3e0d8\b/i, "Use the editorial line token #e3e0d8.");
  requireMatch(/--content-width:\s*(?:45\.125rem|722px)\b/i, "Keep the editorial column at 45.125rem/722px.");

  if (!templateMode) {
    const stepCount = [...html.matchAll(/class=["'][^"']*\bstep-title\b[^"']*["']/gi)].length;
    if (stepCount < 4 || stepCount > 7) {
      errors.push(`Use four to seven numbered step-title sections; found ${stepCount}.`);
    }
    requireMatch(/class=["'][^"']*\bgoal\b[^"']*["']/i, "Give the editorial sequence a goal callout.");
    requireMatch(/class=["'][^"']*\binteractive\b[^"']*["']/i, "Include an in-flow interactive figure.");
  }
  if (/radial-gradient|linear-gradient/i.test(html)) {
    warnings.push("Decorative gradients conflict with editorial-v1.");
  }
  if (/border-radius:\s*(?:999|9999)px/i.test(html)) {
    warnings.push("Pill controls conflict with the compact editorial control treatment.");
  }
}

if (profile === "simulation-essay-v1") {
  requireCondition(hasClass(bodyTag, "simulation-essay"), "Use the simulation-essay body class.");
  const sceneCount = tags("section").filter((tag) => tagAttribute(tag, "data-scene")).length;
  requireCondition(sceneCount >= 3, `Use at least three connected data-scene sections; found ${sceneCount}.`);
  requireMatch(/\bdata-model=["'][^"']+["']/i, "Declare the shared simulation model with data-model.");
  requireMatch(/\bdata-shared-state=["'][^"']+["']/i, "Declare shared state across simulation scenes.");
  requireMatch(/\bdata-visual=["'][^"']+["']/i, "Mark at least one model-driven visual.");
  requireMatch(/\bdata-control=["'][^"']+["']|\brole=["']slider["']/i, "Provide an accessible model control.");
  requireMatch(/\bdata-model-limit\b|class=["'][^"']*\b(?:model-limit|assumption)\b/i, "State simulation assumptions or limits near the model.");
  requireMatch(/\baria-live=["'](?:polite|assertive)["']/i, "Provide live text for simulation changes.");
  warnUnless(/class=["'][^"']*\bwide-figure\b/i, "No expanded simulation figure found.");
}

if (profile === "playable-post-v1") {
  requireCondition(hasClass(bodyTag, "playable-post"), "Use the playable-post body class.");
  requireCondition(metaTags.some((tag) =>
    tagAttribute(tag, "name") === "interaction-arc"
    && tagAttribute(tag, "content") === "manual-automate-explore-transfer"
  ), "Declare the manual-automate-explore-transfer interaction arc.");
  const stageKinds = new Set(
    tags("section").map((tag) => tagAttribute(tag, "data-stage-kind")).filter(Boolean),
  );
  requireCondition(stageKinds.has("manual"), "Include a manual playable stage.");
  requireCondition(stageKinds.has("automated"), "Include an automated playable stage.");
  requireCondition(
    stageKinds.has("sandbox") || stageKinds.has("transfer"),
    "Include a sandbox or transfer playable stage.",
  );
  requireMatch(/\bdata-action=["']reset["']/i, "Provide a deterministic reset action.");
  requireMatch(/\bdata-action=["'](?:play|replay)["']/i, "Provide play or replay for the automated stage.");
  requireMatch(/\bdata-history\b|\bdata-metric=["'][^"']+["']/i, "Provide meaningful outcome history or a metric.");
  requireMatch(/\bdata-model-limit\b|class=["'][^"']*\bmodel-limit\b/i, "Debrief the playable model's assumptions or limits.");
  requireMatch(/\baria-live=["'](?:polite|assertive)["']/i, "Provide live causal feedback for playable actions.");
  if (/Math\.random\s*\(/.test(html) && !/\bdata-seed=["'][^"']+["']|\bseed\b/i.test(html)) {
    errors.push("Randomized playable models need an explicit deterministic seed.");
  }
}

for (const warning of warnings) console.warn(`[WARN] ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`[FAIL] ${error}`);
  console.error(`[FAIL] ${file} has ${errors.length} blocking issue(s).`);
  process.exit(1);
}

console.log(`[PASS] ${file} (${profile}${warnings.length ? `, ${warnings.length} warning(s)` : ""})`);
