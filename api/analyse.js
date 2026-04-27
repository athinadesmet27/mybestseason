export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, mediaType } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageBase64 }
            },
            {
              type: "text",
              text: `You are an expert seasonal color analyst. Analyse this person's natural coloring — their skin tone undertone (warm/cool/neutral), hair color, and eye color — and determine their color season from the 12-season system.

The 12 seasons are: Soft Autumn, True Autumn, Deep Autumn, Soft Summer, True Summer, Light Summer, True Winter, Deep Winter, Bright Winter, Soft Spring, True Spring, Light Spring.

Respond ONLY with valid JSON in this exact format, no other text:
{
  "season": "Season Name",
  "confidence": "high/medium/low",
  "explanation": "2-3 sentence explanation of why this season suits them, mentioning their specific coloring",
  "keyTraits": ["trait 1", "trait 2", "trait 3"]
}`
            }
          ]
        }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
}
