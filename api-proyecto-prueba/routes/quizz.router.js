const express = require("express");
const router = express.Router();

const quizzController = require("../controllers/quizz.controller");

router.post("/",
quizzController.createQ,
);

router.get("/",
quizzController.findAll,
);

router.get("/:identifier",
quizzController.findOneById,
);

module.exports = router;