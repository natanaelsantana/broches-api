const mongoose = require('mongoose');

const brocheSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  imagem: { type: String, required: true },
  preco: { type: Number, required: true },
  idUnico: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Broche', brocheSchema);
