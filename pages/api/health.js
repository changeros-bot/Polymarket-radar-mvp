export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'polymarket-radar-mvp',
    mode: 'preview',
    timestamp: new Date().toISOString()
  });
}
