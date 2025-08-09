const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  try {
    const { from, to, value } = req.body;
    if (!from || !to || typeof value !== 'number') return res.status(400).json({ error: 'Dados de transferência inválidos' });
    const result = transferService.transferValue({ from, to, value });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getTransfers());
};
