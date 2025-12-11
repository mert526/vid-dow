export default async function handler(req, res) {
  // CORS ayarları
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, format } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL gerekli' });
  }

  // Demo response - Gerçek indirme için yt-dlp gerekir
  return res.json({
    success: true,
    message: 'Video hazırlanıyor...',
    downloadUrl: '#',
    info: {
      title: 'Demo Video',
      format: format,
      note: 'Gerçek indirme için yt-dlp entegrasyonu gerekir'
    }
  });
}
