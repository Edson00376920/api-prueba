const { body } = require("express-validator");
const Quizz = require("../models/quizz.model");

const controller = {};

controller.createQ = async (req, res, next) => {
   try {
    const { description, quizzQA, time_limit } = req.body;

    const quizz = new Quizz({
        description: description,
        quizzQA: quizzQA,
        time_limit: time_limit,
    });

    const quizzSaved = await quizz.save();
    if(!quizzSaved){
        return res.status(409).json({error: "El quizz no se pudo crear correctamente"});
    }

    return res.status(201).json(quizzSaved);
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno en el servidor"});
   }

}

controller.findAll = async (req, res, next) => {
    try {
        const quizz = await Quizz.find({ hidden: false });


        return res.status(200).json({ quizz });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

controller.findOneById = async (req, res, next) => {

    try {
        const { identifier } = req.params;

        const quizz = await Quizz.findById(identifier);
        if (!quizz) {
            return res.status(404).json({ error: "Post not found" })
        }

        return res.status(200).json(quizz);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

module.exports = controller;