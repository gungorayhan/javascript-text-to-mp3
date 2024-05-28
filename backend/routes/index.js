const express = require("express")
const Language = require("../models/language.model")
const router = express.Router();
const { convertTextVocabularySchema } = require("../utils")
const fs = require("fs");
const { translateText } = require("../utils/translate");


// {
//   "language":"English",
//   "abbreviate":"en",

//  "vocabulary":"Add-On",
//   "mean":"Eklenti",

//   "text":"The development team is considering integrating a new add-on to extend the software's capabilities and improve user experience",

//   "textLevel":"B2",

//   "textVocabularyString":"Consider – dikkate almak / integrating – entegrasyon / integration-entegre / extend -genişletmek / capability – kabiliyet / improve – geliştirme / experince – deneyim "
// }
router.post("/", async (req, res) => {

  const { language, abbreviate, vocabulary, mean, text, textLevel, textVocabularyString, } = req.body

  const existing = await Language.findOne({ vocabulary })
  if (existing) {
    let textVocabulary = []
    let textTranslate = []




    let textArray = { text, textLevel, textVocabulary, textTranslate }

    const vocabularyArrayMean = convertTextVocabularySchema(textVocabularyString)

    vocabularyArrayMean.forEach(item => {
      textArray.textVocabulary.push(item)

    })

    let textTranslateGoogle = await translateText(text)
    textArray.textTranslate.push({
      textTranslate: textTranslateGoogle,
      translateLang: "tr"
    })
    // console.log(textArray.textTranslate)
    existing.text.push(textArray);
    // console.log(existing.text)
    await existing.save()

    return res.status(201).json(existing)

  }
  else {
    const result = await Language.create({
      language,
      abbreviate,
      vocabulary,
      mean,
    })

    const textArray = { text, textLevel }

    result.text.push(textArray);

    const vocabularyArrayMean = convertTextVocabularySchema(textVocabularyString)

    vocabularyArrayMean.forEach(item => {
      result.text[0].textVocabulary.push(item)
    })

    let textTranslate = await translateText(text)
    result.text[0].textTranslate.push({
      textTranslate,
      translateLang: "tr"
    })


    await result.save()

    return res.status(201).json(result)
  }
})

router.get("/", async (req, res) => {


  // const result = await Language.find().count()
  // const result = await Language.find({vocabulary: "Abort","text.textLevel": { "$in": ["B1", "B2"] } });

  const resultArray = [];
  const result = await Language.find()
  for (item of result) {
    let text = []
    for (textItem of item.text) {
      text.push({
        text: textItem.text,
        textLevel: textItem.textLevel,
        textVocabulary: textItem.textVocabulary,
        textTranslate: textItem.textTranslate
      })
    }
    resultArray.push({
      vocabulary: item.vocabulary,
      mean: item.mean,
      text: text
    })
  }
  res.status(200).json(resultArray)
})

router.get("/translate", async (req, res) => {
  try {
    const result = await Language.find();
    // result.pop()
    let i = 0;
    for (item of result) {
      console.log("--------------------------------------------------")
      //  console.log(item)
      let j = 0;
      for (itemText of item.text) {
        //    console.log(itemText.text)
        // console.log(i)
        const text = await translateText(itemText.text)
        result[i].text[j].textTranslate.push({
          textTranslate: text,
          translateLang: "tr"
        })
        j++
      }

      console.log("--------------------------------------------------")
      // Her bir belgeyi güncelle ve kaydet
      // await item.save();
      i++;

    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/unique-vocabulary", async (req, res) => {
  const result = await Language.find()
 
  let vocabulary = [];
  for (item of result) {
    for (textItem of item.text) {
      for (textVo of textItem.textVocabulary) {

        vocabulary.push(textVo.vocabulary)
      }
    }
  }
  const resultCount = await Language.find().count()

  const setVocabulary = new Set(vocabulary)
  console.log(setVocabulary.size + "--" + vocabulary.length)
  res.status(200).send({baseVocabulary:resultCount , uniqueVocabularyCount: setVocabulary.size, vocabularyCount: vocabulary.length });
})

module.exports = router