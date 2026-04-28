export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan method POST" });
  }

  const { activities } = req.body;

  if (!activities) {
    return res.status(400).json({ error: "Data kosong" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
Berikut aktivitas harian:

${activities}

Tolong simpulkan apakah orang ini rajin atau tidak.
Berikan alasan singkat dan 2 saran.
Gunakan bahasa sederhana.
        `
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.output_text
    });

  } catch (err) {
    res.status(500).json({
      error: "Gagal"
    });
  }
}
