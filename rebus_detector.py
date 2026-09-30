import argparse
from datetime import date, datetime

import requests


def has_rebus(data):
    for cell in data["body"][0]["cells"]:
        if len(cell.get("answer", "")) > 1:
            # print(cell)
            return True

        if "moreAnswers" in cell:
            # print(cell)
            return True

    return False


def parse_date(value):
    try:
        parsed_date = datetime.strptime(value, "%Y-%m-%d").date()
        if parsed_date.strftime("%Y-%m-%d") != value:
            raise ValueError
        return parsed_date
    except ValueError as error:
        raise argparse.ArgumentTypeError(
            "date must be a valid date in yyyy-mm-dd format"
        ) from error


def main():
    parser = argparse.ArgumentParser(
        description="Detect whether a NYT crossword contains a rebus."
    )
    parser.add_argument(
        "--date",
        type=parse_date,
        default=date.today(),
        help="puzzle date in yyyy-mm-dd format (default: today)",
    )
    args = parser.parse_args()

    url = (
        "https://www.nytimes.com/svc/crosswords/v6/"
        f"puzzle/daily/{args.date:%Y-%m-%d}.json"
    )
    response = requests.get(
        url,
        headers={"X-Games-Auth-Bypass": "true"},
        timeout=10,
    )

    response.raise_for_status()
    rebus_result = "Yes" if has_rebus(response.json()) else "No"

    print(f"Does the daily crossword on {args.date:%Y-%m-%d} contain a rebus? {rebus_result}")


if __name__ == "__main__":
    main()
