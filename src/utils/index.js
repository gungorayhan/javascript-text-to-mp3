
const convertTextVocabularySchema = (schema) => {

    const vocabularyArray = schema.split("/")

    const vocabularyArrayMean = vocabularyArray.map(item => {

        if(item.includes("–")){
            let [english, turkish] = item.split("–")
            return { vocabulary: english.trim(), mean: turkish.trim() }  
        }

        else{
            let [english, turkish] = item.split("-")
        return { vocabulary: english.trim(), mean: turkish.trim() }
        }
    })

    return vocabularyArrayMean;
}
// const text = "Before installing -the application - uygulamayı yüklemeden önce / carefully-dikkatlice / review-gözden geçirme / options-seçenekler / avoid-kaçınmak,önlemek / inadvertently-yanlışlıkla"

// console.log(convertTextVocabularySchema(text))



module.exports = convertTextVocabularySchema