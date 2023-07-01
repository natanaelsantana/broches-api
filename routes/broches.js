const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

//model
const Broche = require("../models/broche");

const bodyParser = require("body-parser");

// Configuração do Multer para armazenar os arquivos enviados no diretório 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, preco, idUnico, imagem } = req.body;
    let imagemPath;

    if (req.file) {
      // Caso o cliente tenha enviado um arquivo local
      imagemPath = req.file.path;
    } else if (imagem.startsWith("http")) {
      // Caso o cliente tenha enviado uma URL de imagem
      const response = await axios.get(imagem, { responseType: "arraybuffer" });
      const timestamp = Date.now();
      const filename = `${timestamp}_remote_image.jpg`;

      // Salva o arquivo temporariamente no diretório 'uploads'
      imagemPath = `uploads/${filename}`;

      // Escreve o conteúdo do array de bytes no arquivo
      fs.writeFileSync(imagemPath, Buffer.from(response.data, "binary"));
    }

    const novoBroche = new Broche({
      nome,
      imagem: imagemPath,
      preco,
      descricao,
    });

    const brocheSalvo = await novoBroche.save();

    res.json(brocheSalvo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para obter todos os broches
router.get("/", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    const broches = await Broche.find();
    res.json(broches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para obter um broche específico
router.get("/:id", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );

    const broche = await Broche.findById(req.params.id);

    if (!broche) {
      return res.status(404).json({ message: "Broche não encontrado" });
    }

    res.json(broche);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
