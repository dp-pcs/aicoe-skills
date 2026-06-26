---
name: coe-skill-template
description: Canonical template for authoring a Trilogy AI CoE skill. Use as the starting point when creating a new skill for the aicoe-skills marketplace — copy this folder, rename it, rewrite the frontmatter description, and replace the body with your skill's instructions.
---

# CoE Skill Template

This skill is the canonical example for the Trilogy AI CoE skill marketplace. It does two
jobs: it installs cleanly so the marketplace is never empty, and it shows contributors the
exact structure a real skill should follow.

When authoring a real skill, delete everything below and write task instructions in the
imperative ("Do X", "When the user asks for Y, gather Z first"). Keep the body focused on
*what the agent should do*, not prose about the skill.

## Anatomy of a skill

A skill is a folder with a `SKILL.md` file. Required frontmatter is `name` and
`description`. The `description` is the single most important field: it is what every
runtime uses to decide whether to load the skill, so make it specific and include the
trigger phrases a user would actually say.

```
plugins/<skill-name>/
├── .claude-plugin/
│   └── plugin.json          # plugin manifest (name, description, version)
└── skills/
    └── <skill-name>/
        └── SKILL.md         # frontmatter + instructions (this file)
```

Optional supporting files live alongside `SKILL.md` and are loaded on demand:

- `reference/` — longer docs the agent reads only when needed
- `scripts/` — executable helpers the agent can run
- `assets/` — templates, images, or sample data

## Writing a good description

- Lead with the action, then the triggers: "Generate X. Use when the user says 'A', 'B', or asks to C."
- Name concrete artifacts and verbs, not vague capabilities.
- Keep it under ~500 characters; specificity beats length.

## Writing good instructions

- Use imperative steps the agent can follow deterministically.
- Surface required inputs up front; if something is missing, say what to ask for.
- Prefer a short checklist or numbered procedure over narrative.
- Call out edge cases and failure modes explicitly.

## How this gets installed

This skill ships as a plugin in the `aicoe-skills` marketplace. Once the marketplace is
added, a user installs it with:

```
/plugin install coe-skill-template@aicoe-skills
```

Because `SKILL.md` is the open Agent Skills standard, the same folder also works in Codex
CLI, opencode/OpenClaw, and other compatible runtimes by placing it in their skills
directory. See the repo README for per-runtime install paths.
