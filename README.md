# Headway task

## Getting Started

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint        # check
npm run lint:fix    # auto-fix
```

## Adding Questions

All quiz content lives in one file: **`src/quiz/quiz.json`**.

### Adding a single-choice question

Add an entry to the `questions` array. `id` must be a unique integer that continues the sequence. Exactly one option should have `"isAnswer": true`.

```json
{
  "id": 13,
  "type": "single",
  "text": "What is the capital of Japan?",
  "options": [
    { "id": "A", "text": "Osaka", "isAnswer": false },
    { "id": "B", "text": "Tokyo", "isAnswer": true },
    { "id": "C", "text": "Kyoto", "isAnswer": false },
    { "id": "D", "text": "Sapporo", "isAnswer": false }
  ]
}
```

### Adding a multiple-choice question

Set `"type": "multiple"` and mark **all** correct options with `"isAnswer": true`. The player must select exactly that many options to submit.

```json
{
  "id": 13,
  "type": "multiple",
  "text": "Which of these are Scandinavian countries?",
  "options": [
    { "id": "A", "text": "Norway", "isAnswer": true },
    { "id": "B", "text": "Germany", "isAnswer": false },
    { "id": "C", "text": "Sweden", "isAnswer": true },
    { "id": "D", "text": "Finland", "isAnswer": true }
  ]
}
```

### Adding a prize ladder step

Each question can have a corresponding prize in the `prizeLadder` array. `questionId` must match the question's `id`.

```json
{ "questionId": 13, "prize": 2000000 }
```

> **Notes:**
>
> - Question `id` values must be consecutive integers starting from `1` — the app navigates between questions as `/quiz/1`, `/quiz/2`, etc.
> - Option `id` values (`"A"`, `"B"`, …) must be unique within a question but can repeat across questions.

## Features

- Single and multiple-choice questions
- Prize ladder showing your current progress
- Responsive layout — sidebar ladder on desktop, slide-in dialog on mobile
