const Statut = require('../models/Statut');

async function getAll() {
  return Statut.find({}).lean();
}

async function grouperParPhase() {
  const statuts = await getAll();
  const phases = ['avant', 'transit', 'douane', 'livraison', 'probleme'];
  return phases.map(phase => ({
    id: phase,
    statuts: statuts
      .filter(s => s.phase === phase)
      .sort((a, b) => a.fr.localeCompare(b.fr, 'fr'))
  }));
}

module.exports = {
  getAll,
  grouperParPhase
};