import requests
from datetime import date


def has_rebus(data):
    return any(
        len(cell.get("answer", "")) > 1 for cell in data["body"][0]["cells"]
    )

url = (
   "https://www.nytimes.com/svc/crosswords/v6/"
   f"puzzle/daily/{date.today():%Y-%m-%d}.json"
)

#url = "https://www.nytimes.com/svc/crosswords/v6/puzzle/daily/2026-08-06.json"

r = requests.get(
   url,
   headers={"X-Games-Auth-Bypass": "true"},
   timeout=10,
)

r.raise_for_status()
data = r.json()

#print(data)
print(has_rebus(data))