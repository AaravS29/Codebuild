export default function handler(req, res) {
  const path = req.url || '/api';
  res.setHeader('Content-Type', 'application/json');
  if (path.startsWith('/api/health')) {
    return res.status(200).json({ ok: true, service: 'Emergency Intelligence API', timestamp: new Date().toISOString() });
  }
  if (path.startsWith('/api/hospitals')) {
    return res.status(200).json({ hospitalsReady: 4, message: 'Emergency-ready hospitals in the network' });
  }
  return res.status(200).json({ ok: true, message: 'Emergency Intelligence API online', endpoints: ['/api/health', '/api/case?id=CASE-2026-000124', '/api/hospitals'] });
}
