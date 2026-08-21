// Vercel Serverless Function: POST /api/chat
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not configured in Vercel Environment Variables.'
    });
  }

  const primaryModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  const fallbackModels = ['gemini-flash-latest', 'gemini-3.7-flash', 'gemini-3.6-flash'];
  const modelsToTry = [primaryModel, ...fallbackModels.filter(m => m !== primaryModel)];

  const { contents, system_instruction } = req.body || {};

  if (!contents || !Array.isArray(contents)) {
    return res.status(400).json({ error: 'Invalid request body: contents array is required.' });
  }

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1200
    }
  };

  if (system_instruction) {
    payload.system_instruction = system_instruction;
  }

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }

      const errText = await response.text();
      lastError = { status: response.status, message: errText };

      // If rate-limited or temporarily overloaded, attempt fallback model
      if ([429, 500, 503].includes(response.status)) {
        continue;
      } else {
        break; // Client error like 400 invalid argument, do not retry
      }
    } catch (err) {
      lastError = { status: 500, message: err.message };
    }
  }

  return res.status(lastError?.status || 500).json({
    error: lastError?.message || 'Failed to generate response from Gemini API.'
  });
}
