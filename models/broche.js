const mongoose = require("mongoose");

const brocheSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  imagem: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
});

module.exports = mongoose.model("Broche", brocheSchema);
