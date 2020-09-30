// import tesseract from 'tesseract.js';
// import express from 'express';
// import multer from 'multer';
// const { createWorker } = tesseract;
const { createWorker } = require('tesseract.js');
const express = require('express');
const multer = require('multer');
const fs = require('fs')
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })




app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const data = await fs.promises.readFile(`./uploads/${req.file.originalname}`)
    const worker = createWorker({
        logger: m => console.log(m)
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(data);
    await worker.terminate();
    res.send(text)
})

const PORT = 3000 ?? process.env.PORT

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`on port ${PORT}`);
})
