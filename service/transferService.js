const { transfers } = require('../model/transferModel');
const { users } = require('../model/userModel');

function transferValue({ from, to, value }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário remetente ou destinatário não encontrado');
  if (recipient.favorecido || value < 5000) {
    transfers.push({ from, to, value, date: new Date() });
    return { from, to, value };
  } else {
    throw new Error('Transferência acima de R$ 5.000,00 só pode ser feita para favorecidos');
  }
}

function getTransfers() {
  return transfers;
}

module.exports = { transferValue, getTransfers };
