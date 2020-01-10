const express = require("express");
const router = express.Router();

const Word = require("../models/word");

const authMiddleware = require('../middlewares/auth');

router.get("/", async (req, res) => {
    const words = await Word.find();

    if(!words){
        res.status(400).json({ error: "Erro ao carregar as palavras" });
    }

    res.status(200).json(words);

});

router.post("/", authMiddleware, async (req, res) => {
 
    try{
        const { word, translation, language, audio } = req.body;

        const wordReturned = await Word.findOne({ word });

        if (wordReturned) {

            if (wordReturned.translations.map(t => t.language).indexOf(language) != -1) {
                res.status(400).json({ error: "A palavra já existe" });
            }else{
                
                wordReturned.translations.push({ translation, language, audio });
                await wordReturned.save();

                res.status(200).json({ message: "Palavra inserida com sucesso" });
            }

        } else {
            const translations = [{ translation, language, audio }]
            await Word.create({ word, translations });

            res.status(200).json({ message: "Palavra inserida com sucesso" });
        }

    }catch(err){
        res.status(400).json({ error: "Erro ao inserir palavra" });
    }

});

module.exports = app => app.use("/dictionary", router);