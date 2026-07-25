import { NextResponse } from 'next/server'

// Cache the fetched quotes for 5 minutes (ISR-style) so we don't hammer the
// upstream on every visit.
export const revalidate = 300

const SYMBOLS: { key: string; label: string; symbol: string }[] = [
  { key: 'nifty', label: 'NIFTY 50', symbol: '^NSEI' },
  { key: 'RELIANCE', label: 'RELIANCE', symbol: 'RELIANCE.NS' },
  { key: 'HDFCBANK', label: 'HDFCBANK', symbol: 'HDFCBANK.NS' },
  { key: 'ICICIBANK', label: 'ICICIBANK', symbol: 'ICICIBANK.NS' },
  { key: 'TCS', label: 'TCS', symbol: 'TCS.NS' },
  { key: 'INFY', label: 'INFY', symbol: 'INFY.NS' },
]

type Meta = {
  regularMarketPrice?: number
  chartPreviousClose?: number
  previousClose?: number
  regularMarketTime?: number
}

async function quote(symbol: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol,
  )}?interval=1d&range=5d`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`upstream ${res.status}`)
  const json = await res.json()
  const meta: Meta = json?.chart?.result?.[0]?.meta ?? {}
  const level = meta.regularMarketPrice
  const prev = meta.chartPreviousClose ?? meta.previousClose
  if (typeof level !== 'number' || typeof prev !== 'number') {
    throw new Error('missing fields')
  }
  return { level, prev, time: meta.regularMarketTime ?? null }
}

export async function GET() {
  try {
    const rows = await Promise.all(
      SYMBOLS.map(async (s) => {
        const { level, prev, time } = await quote(s.symbol)
        const change = level - prev
        return {
          key: s.key,
          label: s.label,
          level,
          change,
          pct: prev ? (change / prev) * 100 : 0,
          up: change >= 0,
          time,
        }
      }),
    )
    const asOf = rows.find((r) => r.key === 'nifty')?.time ?? null
    return NextResponse.json({ ok: true, asOf, data: rows })
  } catch (err) {
    // Client falls back to its built-in snapshot on failure.
    return NextResponse.json({ ok: false, error: String(err) })
  }
}
