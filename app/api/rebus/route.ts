import { NextRequest, NextResponse } from "next/server";

type CrosswordCell = {
  answer?: unknown;
  moreAnswers?: unknown;
};

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function hasRebus(data: unknown) {
  if (!data || typeof data !== "object" || !("body" in data)) return null;

  const body = data.body;
  if (!Array.isArray(body) || !body[0] || !Array.isArray(body[0].cells)) {
    return null;
  }

  return (body[0].cells as CrosswordCell[]).some(
    (cell) =>
      (typeof cell.answer === "string" && cell.answer.length > 1) ||
      Object.prototype.hasOwnProperty.call(cell, "moreAnswers"),
  );
}

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !isValidDate(date)) {
    return NextResponse.json(
      { error: "A valid date in yyyy-mm-dd format is required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://www.nytimes.com/svc/crosswords/v6/puzzle/daily/${date}.json`,
      {
        headers: { "X-Games-Auth-Bypass": "true" },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "The crossword could not be found for that date." },
        { status: response.status === 404 ? 404 : 502 },
      );
    }

    const result = hasRebus(await response.json());
    if (result === null) {
      return NextResponse.json(
        { error: "The crossword response was not in the expected format." },
        { status: 502 },
      );
    }

    return NextResponse.json({ date, hasRebus: result });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the crossword service." },
      { status: 502 },
    );
  }
}
