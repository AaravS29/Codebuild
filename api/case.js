export default function handler(req, res) {
  const id = String(req.query?.id || '').trim();
  res.setHeader('Content-Type', 'application/json');
  if (!id) return res.status(400).json({ error: 'Case ID is required' });
  return res.status(200).json({ caseId: id, status: 'Ambulance assigned', eta: '08 min', route: 'Response team en route' });
}
