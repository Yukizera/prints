const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuração de armazenamento do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Inicialização do Multer
const upload = multer({ storage });

// Rota para receber os arquivos
app.post('/upload', upload.fields([
    { name: 'itemScreenshot', maxCount: 1 },
    { name: 'paymentProof', maxCount: 1 }
]), (req, res) => {
    console.log(req.files); // Verifica os arquivos recebidos
    res.status(200).json({ message: 'Arquivos enviados com sucesso!', files: req.files });
});

// Pasta para arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
