#!/usr/bin/env node

import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const templateMode = args.includes("--template");
const fileArg = args.find((arg) => !arg.startsWith("--"));

if (!fileArg) {
  console.error("Usage: node validate-explainer.mjs <page.html> [--template]");
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
const warnUnless = (pattern, message) => {
  if (!pattern.test(html)) warnings.push(message);
};

requireMatch(/<!doctype html>/i, "Missing HTML doctype.");
requireMatch(/<html\b[^>]*\blang=["'][^"']+["']/i, "Set a non-empty html lang attribute.");
requireMatch(/<meta\b[^>]*charset=["']?utf-8/i, "Declare UTF-8 encoding.");
requireMatch(/<meta\b[^>]*name=["']viewport["']/i, "Add a viewport meta tag.");
requireMatch(/<meta\b[^>]*name=["']explainer-ui["'][^>]*content=["']declaude-editorial-v1["']/i, "Preserve the declaude-editorial-v1 UI marker.");
requireMatch(/<meta\b[^>]*name=["']learning-design["'][^>]*content=["']discovery-first-v1["']/i, "Preserve the discovery-first-v1 learning-design marker.");
requireMatch(/<title>\s*[^<]+\s*<\/title>/i, "Add a meaningful document title.");
requireMatch(/<body\b[^>]*class=["'][^"']*\bdeclaude-editorial\b[^"']*["']/i, "Use the declaude-editorial body class.");
requireMatch(/<main\b/i, "Use a main landmark.");
requireMatch(/<section\b[^>]*\bid=["']sources["']/i, "Include a sources section with id=\"sources\".");
requireMatch(/<noscript\b/i, "Include a readable no-JavaScript message.");
requireMatch(/:focus-visible/i, "Provide a visible keyboard focus style.");
requireMatch(/prefers-reduced-motion/i, "Respect prefers-reduced-motion.");
requireMatch(/@media\s*\([^)]*max-width/i, "Include a narrow-screen layout rule.");
requireMatch(/--paper:\s*#faf9f6\b/i, "Use the required warm off-white page token (#faf9f6).");
requireMatch(/--ink:\s*#1a1a18\b/i, "Use the required near-black text token (#1a1a18).");
requireMatch(/--muted:\s*#6b6862\b/i, "Use the required muted text token (#6b6862).");
requireMatch(/--accent:\s*#b3541e\b/i, "Use the required burnt-orange accent token (#b3541e).");
requireMatch(/--line:\s*#e3e0d8\b/i, "Use the required warm-gray rule token (#e3e0d8).");
requireMatch(/--content-width:\s*(?:45\.125rem|722px)\b/i, "Keep the editorial column at 45.125rem/722px.");

if (!templateMode && /\{\{[A-Z0-9_]+\}\}/.test(html)) {
  errors.push("Unresolved template placeholders remain.");
}

if (/<script\b[^>]*\bsrc=["']https?:\/\//i.test(html)) {
  errors.push("External scripts make the explainer non-self-contained.");
}

if (/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']https?:\/\//i.test(html)) {
  errors.push("External stylesheets make the explainer non-self-contained.");
}

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicates.length) errors.push(`Duplicate ids: ${duplicates.join(", ")}.`);

for (const match of html.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)) {
  if (!ids.includes(match[1])) errors.push(`JavaScript references missing id: ${match[1]}.`);
}

for (const match of html.matchAll(/<button\b([^>]*)>/gi)) {
  if (!/\btype=["'](?:button|submit|reset)["']/i.test(match[1])) {
    errors.push("Every button must declare its type.");
  }
}

const labelsFor = new Set(
  [...html.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["']/gi)].map((match) => match[1]),
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

if (!templateMode) {
  const stepCount = [...html.matchAll(/class=["'][^"']*\bstep-title\b[^"']*["']/gi)].length;
  if (stepCount < 4 || stepCount > 7) {
    errors.push(`Use four to seven numbered step-title sections; found ${stepCount}.`);
  }
  if (!/class=["'][^"']*\bgoal\b[^"']*["']/i.test(html)) {
    errors.push("Give each learning sequence a one-idea goal callout.");
  }
  if (!/class=["'][^"']*\binteractive\b[^"']*["']/i.test(html)) {
    errors.push("Include at least one in-flow interactive figure.");
  }
  const sourceSection = html.match(/<section\b[^>]*\bid=["']sources["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
  if (!/<a\b[^>]*\bhref=["']https?:\/\//i.test(sourceSection)) {
    errors.push("The sources section must link to at least one web source.");
  }
}

warnUnless(/\baria-live=["'](?:polite|assertive)["']/i, "No aria-live region found for changing text.");
warnUnless(/<h1\b/i, "No h1 heading found.");
warnUnless(/<h2\b/i, "No h2 headings found.");
if (/radial-gradient|linear-gradient/i.test(html)) {
  warnings.push("Decorative gradients conflict with the restrained editorial UI contract.");
}
if (/border-radius:\s*(?:999|9999)px/i.test(html)) {
  warnings.push("Pill-shaped controls conflict with the compact 8px button treatment.");
}

for (const warning of warnings) console.warn(`[WARN] ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`[FAIL] ${error}`);
  console.error(`[FAIL] ${file} has ${errors.length} blocking issue(s).`);
  process.exit(1);
}

console.log(`[PASS] ${file}${warnings.length ? ` (${warnings.length} warning(s))` : ""}`);
