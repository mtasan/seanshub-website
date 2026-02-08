export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const { message, history } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Build conversation with system context
    const systemContext = `Sen SeansHub'ın yapay zeka destekli müşteri destek asistanısın. SeansHub, özel ders öğretmenleri, eğitmenler ve kurs merkezleri için bir seans ve öğrenci yönetim sistemidir.

Temel bilgiler:
- SeansHub web tabanlı bir SaaS uygulamasıdır (app.seanshub.com)
- 3 plan var:
  * Başlangıç: Ücretsiz, 1 eğitmen, 5 öğrenciye kadar
  * Profesyonel: ₺229/ay, 1 eğitmen, sınırsız öğrenci
  * Kurum: ₺499/ay, sınırsız eğitmen ve öğrenci
- Özellikler: Öğrenci yönetimi, seans planlama, ders notları (revizyon geçmişi), takvim, raporlar, ekip yönetimi
- Yüz yüze, online ve telefon seansları desteklenir
- E-posta ve SMS hatırlatmaları (Profesyonel ve Kurum planlarında)
- KVKK uyumlu, veriler şifreli, kurumlar arası izolasyon
- Responsive tasarım, telefon/tablet/bilgisayardan erişilebilir
- Excel/CSV ile öğrenci verisi aktarımı mümkün
- 14 gün ücretsiz deneme (Profesyonel ve Kurum planları)
- İptal ücretsiz, veriler 30 gün korunur
- Destek: destek@seanshub.com

Kurallar:
- Kısa ve net cevaplar ver (2-3 cümle)
- Türkçe cevap ver
- Sadece SeansHub ile ilgili sorulara cevap ver
- Bilmediğin konularda destek@seanshub.com adresine yönlendir
- Rakip ürünler hakkında yorum yapma
- Fiyat bilgisi verirken güncel planları kullan`

    const contents = []

    // Add conversation history if provided
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })
      }
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    })

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemContext }],
          },
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 300,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', response.status, errorData)
      return res.status(502).json({ error: 'AI service error' })
    }

    const data = await response.json()

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Üzgünüm, şu anda yanıt veremiyorum. Lütfen destek@seanshub.com adresine yazın.'

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
