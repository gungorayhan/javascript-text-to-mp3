const express = require("express")
const Language = require("../models/language.model")
const router = express.Router();
const convertTextVocabularySchema = require("../utils")

router.post("/",async(req,res)=>{

  const {vocabulary,mean,text,textLevel,textVocabulary} = req.body

  const existing = await Language.findOne({vocabulary,textLevel})
  if(existing) res.status(200).json({message:"Vocabulary have saved in the database!"})
  const result = await Language.create({
    vocabulary,
    mean,
    text,
    textLevel,
  })

  const vocabularyArrayMean = convertTextVocabularySchema(textVocabulary)

  vocabularyArrayMean.forEach(item=>{
    result.textVocabulary.push(item)
  })

  await result.save()

  res.status(201).json(result)
})


module.exports = router