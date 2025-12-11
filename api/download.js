export default async function handler(req, res) {
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

  // Kullanıcıyı gerçek indirme sitesine yönlendir
  const downloadSites = {
    'MP4': `https://www.y2mate.com/youtube/${encodeURIComponent(url)}`,
    'MP3': `https://ytmp3.nu/youtube-to-mp3/?url=${encodeURIComponent(url)}`,
    'MP4 HD': `https://www.y2mate.com/youtube/${encodeURIComponent(url)}`,
    'WAV': `https://ytmp3.nu/youtube-to-mp3/?url=${encodeURIComponent(url)}`,
    '3GP': `https://www.y2mate.com/youtube/${encodeURIComponent(url)}`,
    'FLV': `https://www.y2mate.com/youtube/${encodeURIComponent(url)}`
  };

  return res.json({
    success: true,
    redirect: true,
    downloadUrl: downloadSites[format] || downloadSites['MP4'],
    message: `${format} için indirme sayfası açılıyor...`
  });
}
