# nyt-rebus-detector

Detects if a NYT crossword contains a rebus. The web app sends NYT requests
through a server-side Next.js route to avoid browser CORS restrictions.

A rebus will be found if any of the following conditions are met:

- a cell solution contains more than one character
- moreAnswers is included in the cell solution.  For example, leaving the cell blank

## Web app

Install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Python script

Check today's crossword:

```powershell
uv run .\rebus_detector.py
```

Check a crossword for a specific date using the `yyyy-mm-dd` format:

```powershell
uv run .\rebus_detector.py --date 2026-09-30
```

The output includes the puzzle date and whether it contains a rebus:

```text
Does the daily crossword on 2026-09-30 contain a rebus? No
```
