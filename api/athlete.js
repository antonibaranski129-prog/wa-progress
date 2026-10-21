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
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=1800");
  try {
    const id = String(req.query.id || "").trim();
    if (!/^\d+$/.test(id)) return res.status(400).json({ error: "Nieprawidłowe WA ID." });

    const [athlete, results] = await Promise.all([
      fetchJson(`/athletes/${encodeURIComponent(id)}`),
      fetchJson(`/athletes/${encodeURIComponent(id)}/results`)
    ]);

    return res.status(200).json({
      athlete,
      results: Array.isArray(results) ? results : (results?.results || [])
    });
  } catch (e) {
    return res.status(502).json({ error: e.message || "Nie udało się pobrać zawodnika." });
  }
};