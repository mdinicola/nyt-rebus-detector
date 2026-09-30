# NYT Rebus Detector

Detects if a dated NYT crossword contains a rebus. It does not provide details on what or where the rebus is, only if it has at least one.

A rebus will be found if any of the following conditions are met:
- a cell solution contains more than one character
- moreAnswers is included in the cell solution.  For example, leaving the cell blank

The Mini and Midi crosswords are not supported.

## Web app

Install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Production build

Install the locked dependencies and create an optimized production build:

```powershell
npm ci
npm run build
```

Start the production server:

```powershell
npm run start
```

Then open `http://localhost:3000`. The production server must be started after
`npm run build` has completed successfully.

## Python script

Check today's crossword:

```powershell
uv run .\rebus_detector.py
```

Check a crossword for a specific date using the `yyyy-mm-dd` format:

```powershell
uv run .\rebus_detector.py --date 2026-09-30
```

Output:

```text
Does the daily crossword on 2026-09-30 contain a rebus? No
```
