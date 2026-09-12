# AfterCare

AI companion that walks patients home from the hospital — texting, calling, and checking in until recovery is actually done.

## The problem
- Up to 79% of hospital readmissions are considered preventable, tied to poor post-discharge coordination.
- Patients who clearly understand discharge instructions are 30% less likely to be readmitted.
- Medication adherence among chronic-disease patients averages only 50% in developed countries.

## What it does
- Turns a hospital's discharge plan (meds, symptoms to watch, follow-up rule) into daily reminders and check-ins.
- Tracks reported symptoms across days, not just today.
- Autonomously books the right follow-up (urgent vs. routine) when a condition is met.
- Supports text and voice check-ins.

## Stack
- OpenAI — reasoning / escalation decisions
- OpenRouter — model routing
- Exa — hospital/clinic lookup

## Setup
1. \`cp .env.example .env\` and fill in your keys
2. Install dependencies (see \`/app\` and \`/agent\`)
3. Run locally — instructions TBD as build progresses

## Team
Ahmed Abuessa · Arnur · Alex · Aslykhan
