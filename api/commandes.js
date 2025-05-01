import fs from 'fs/promises';
export default async function handler(req, res) {
  const filePath = './commande.json';
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: 'Erreur de lecture.' });
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body;
      await fs.writeFile(filePath, JSON.stringify({ state: body }, null, 2));
      res.status(200).json({ status: 'OK', state: body });
    } catch {
      res.status(500).json({ error: 'Erreur d'écriture.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}