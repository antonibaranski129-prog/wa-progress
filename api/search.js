const BASES = [
  "https://worldathletics.nimarion.de",
  "https://worldathletics.pfingstsportfest.de"
];

async function fetchJson(path) {
  let lastErr;
  for (const base of BASES) {
    try {
      const r = await fetch(base + path, {
        headers: {
          "accept": "application/json",
          "user-agent": "WA-Progress-Tracker/3.0"
        }
      });
      const text = await r.text();
      let data;
      try { data = JSON.parse(text); }
      catch { throw new Error(`Invalid JSON from ${base}`); }
      if (!r.ok) throw new Error(data?.message || data?.error || `Upstream HTTP ${r.status}`);
      return data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("No upstream available");
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return res.status(400).json({ error: "Brak zapytania." });

    if (/^\d{6,10}$/.test(q)) {
      const athlete = await fetchJson(`/athletes/${encodeURIComponent(q)}`);
      return res.status(200).json([athlete]);
    }

    const data = await fetchJson(`/athletes/search?name=${encodeURIComponent(q)}`);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message || "Nie udało się połączyć ze źródłem danych." });
  }
};