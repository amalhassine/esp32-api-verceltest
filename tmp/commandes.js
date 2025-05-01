import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join('/tmp', 'commande.json'); // ✅ Dossier en écriture sur Vercel

  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch {
      // Si le fichier n'existe pas, retourner une valeur par défaut
      res.status(200).json({ state: { pompe: false, buzzer: false } });
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body;
      await fs.writeFile(filePath, JSON.stringify({ state: body }, null, 2));
      res.status(200).json({ status: 'OK', state: body });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Erreur d\'écriture.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
