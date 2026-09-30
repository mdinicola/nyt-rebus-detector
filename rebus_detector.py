import requests
from datetime import date


def has_rebus(data):
    for cell in data["body"][0]["cells"]:
        if len(cell.get("answer", "")) > 1:
            # print(cell)
            return True

        if "moreAnswers" in cell:
            # print(cell)
            return True

    return False
        

url = (
   "https://www.nytimes.com/svc/crosswords/v6/"
   f"puzzle/daily/{date.today():%Y-%m-%d}.json"
)

# url = "https://www.nytimes.com/svc/crosswords/v6/puzzle/daily/2026-09-24.json"

r = requests.get(
   url,
   headers={"X-Games-Auth-Bypass": "true"},
   timeout=10,
)

r.raise_for_status()
data = r.json()

#print(data)
print(has_rebus(data))