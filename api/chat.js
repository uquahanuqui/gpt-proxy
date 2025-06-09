export default async function handler(req, res) {
  // ✅ CORS 설정 추가
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ OPTIONS 요청 먼저 처리 (브라우저가 먼저 물어보는 요청)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: req.body.messages,
      temperature: 0.7
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
