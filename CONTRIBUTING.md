# Contributing a skill

Skills in this marketplace follow the open `SKILL.md` standard, so anything you add here
works across Claude Code, Cowork, Codex CLI, opencode/OpenClaw, and other compatible
runtimes.

## 1. Copy the template

```bash
cp -r plugins/coe-skill-template plugins/<your-skill-name>
mv plugins/<your-skill-name>/skills/coe-skill-template \
   plugins/<your-skill-name>/skills/<your-skill-name>
```

Use **kebab-case** for `<your-skill-name>` (lowercase, digits, hyphens only). The plugin
name, skill folder name, and marketplace entry name should all match.

## 2. Update the plugin manifest

Edit `plugins/<your-skill-name>/.claude-plugin/plugin.json`:

```json
{
  "name": "<your-skill-name>",
  "description": "One line on what the skill does.",
  "version": "0.1.0",
  "author": { "name": "Your Name", "email": "you@trilogy.com" },
  "keywords": ["..."]
}
```

Bump `version` on every meaningful change so installed users receive the update.

## 3. Write the skill

Edit `plugins/<your-skill-name>/skills/<your-skill-name>/SKILL.md`:

- **Frontmatter** — `name` and `description` are required. The `description` is what every
  runtime uses to decide when to load the skill: lead with the action, then list the
  trigger phrases a user would actually say. Be specific.
- **Body** — imperative instructions the agent follows. Prefer a numbered procedure or
  checklist. Surface required inputs and edge cases. Put long references in a `reference/`
  subfolder and executable helpers in `scripts/`.

## 4. Register it in the marketplace

Add an entry to the `plugins` array in `.claude-plugin/marketplace.json`:

```json
{
  "name": "<your-skill-name>",
  "source": "./plugins/<your-skill-name>",
  "description": "One line on what the skill does.",
  "category": "<category>",
  "keywords": ["..."]
}
```

## 5. Validate and open a PR

```bash
claude plugin validate .
claude plugin validate ./plugins/<your-skill-name>
```

Both must pass with no errors. Commit on a branch and open a PR. Once merged, users pick up
the new skill with `/plugin marketplace update aicoe-skills`.

## Naming and quality bar

- kebab-case names, matched across plugin / folder / marketplace entry
- Descriptions written for triggering accuracy, not marketing
- Instructions deterministic enough that two runs produce comparable results
- No secrets, tokens, or customer data in skill files
