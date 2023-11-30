const express = require("express");
const router = express.Router();

const postRouter = require ("./post.router");
const authRouter = require ("./auth.router");
const quizzRouter = require ("./quizz.router")

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/quizz", quizzRouter);

module.exports = router;