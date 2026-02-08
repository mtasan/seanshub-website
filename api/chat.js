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

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const { message, history } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' })
    }

    const systemPrompt = `Sen SeansHub'ın yapay zeka destekli müşteri destek asistanısın. SeansHub, özel ders öğretmenleri, eğitmenler ve kurs merkezleri için bir seans ve öğrenci yönetim sistemidir.

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

    // Build conversation contents
    const contents = []

    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    })

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 800,
      },
    }

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (data.error) {
      console.error('Gemini API error:', data.error.message)
      return res.status(200).json({
        reply: 'Şu anda yapay zeka servisine ulaşamıyorum. Sorularınız için destek@seanshub.com adresine yazabilirsiniz.',
      })
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const reply = data.candidates[0].content.parts[0].text
      return res.status(200).json({ reply })
    }

    return res.status(200).json({
      reply: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen destek@seanshub.com adresine yazın.',
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(200).json({
      reply: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya destek@seanshub.com adresine yazın.',
    })
  }
}
