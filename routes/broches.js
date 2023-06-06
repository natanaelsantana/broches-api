const express = require('express');
const router = express.Router();

const Broche = require('../models/broche');

// Rota para criar um novo broche
router.post('/', async (req, res) => {
    try {
      const { nome, preco, idUnico, imagem } = req.body;
  
      const novoBroche = new Broche({
        nome,
        imagem,
        preco,
        idUnico,
      });
  
      const brocheSalvo = await novoBroche.save();
  
      res.json(brocheSalvo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para obter todos os broches
router.get('/', async (req, res) => {
  try {
    const broches = await Broche.find();
    res.json(broches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
