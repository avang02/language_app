const express = require("express");
const router = express.Router();
const { getKanji } = require("../controller/kanji.controller")

router.post("/convert", getKanji)