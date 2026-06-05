# AGENT.md

## Purpose

This repository contains a Phaser platformer game developed for coursework.

When making changes, prioritize readability, maintainability, and preserving existing gameplay behavior.

---

# User Confirmation Rules

**Always ask for confirmation before making changes that go beyond simple, localized fixes.**

When in doubt, ask. It is better to over-ask than to assume.

## Changes That Require Confirmation

* Refactoring large sections of code
* Reorganizing file structure
* Renaming classes, functions, variables, or assets
* Changing gameplay mechanics
* Altering physics values
* Replacing existing systems
* Adding new dependencies
* Converting code to a different architecture
* Bug fixes that require redesigning or restructuring existing systems (see note below)

### Note on Bug Fixes

A bug fix is only a "small change" when the fix is localized and does not change how the surrounding system works.

**Small bug fix (no confirmation needed):** Fixing an off-by-one error, correcting a typo in a string, adding a missing null check.

**Bug fix that requires confirmation:** Fixing a bug by replacing how data is tracked, restructuring a class, introducing a new data structure, or changing the relationship between multiple systems. Even though the *goal* is to fix a bug, the *method* is a refactor.

Ask yourself: "Does this fix change how more than one function or system interacts?" If yes, ask first.

## How to Ask for Confirmation

1. Explain what will be changed.
2. Explain why it is beneficial.
3. Wait for user approval before writing any code.

Do not make large architectural decisions automatically.

## Small Changes (No Confirmation Needed)

* Simple bug fixes (localized, no structural changes)
* Syntax fixes
* Formatting improvements
* Comment updates using my comment style
* Code cleanup that does not alter behavior
* Adding missing documentation
* Minor performance improvements

---

# Phaser Guidelines

Prefer Phaser's built-in systems before creating custom solutions.

Examples:

* Use Arcade Physics when appropriate.
* Use Scene lifecycle methods.
* Use Phaser timers instead of manual timing logic where possible.
* Use Groups for collections of game objects.
* Use Tilemap collision features before custom collision code.

---

# Code Style

* Use descriptive variable names.
* Keep functions focused on a single responsibility.
* Avoid duplicate code.
* Extract repeated logic into helper functions.
* Prefer early returns when they improve readability.
* Do not introduce global variables unless required.

---

# Asset Safety

Never rename, move, or delete assets without user approval.

This includes:

* Images
* Audio files
* Tilemaps
* Sprite sheets
* Fonts

Asset references are often used throughout multiple scenes.

---

# Gameplay Safety

Preserve existing gameplay unless explicitly requested.

Do not modify:

* Jump height
* Movement speed
* Gravity
* Collision behavior
* Enemy behavior
* Scoring

unless the user specifically asks.

---

# Educational Priority

This project is a learning project.

When implementing non-trivial code:

* Explain the change.
* Explain why it works.
* Prefer clear code over clever code.

Readable code is preferred over highly optimized code.

---

# Delivering Changes

When modifying code:

1. Explain what changed.
2. Explain why it changed.
3. Show the complete modified code block when practical.
4. Do not omit important sections with placeholders.

Avoid responses such as:

Insert this somewhere in your code.

Instead, show exactly where changes belong whenever possible.
[C
