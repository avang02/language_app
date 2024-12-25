const { response } = require("express");



module.exports = {
  getKanji
}

async function getKanji(req, res) {
  const hiragana = req.body.text;
  try {
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API}`, {
      q: hiragana,
      target: "ja"
    })
    const translatedText = response.data.data.translations[0].translatedText;
    res.json({ translatedText });
  } catch (error) {
    console.log("Error during translation: ", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
}