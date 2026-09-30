# nyt-rebus-detector
Detects if a NYT crossword contains a rebus
A rebus will be found if any of the following conditions are met:
- a cell solution contains more than one character
- moreAnswers is included in the cell solution.  For example, leaving the cell blank

## Usage

uv run .\rebus_detector.py