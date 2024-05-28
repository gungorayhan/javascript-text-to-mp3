const { Builder, until, Key, By } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")

const translateText=async(text)=> {
    let options = new chrome.Options()
    // .headless()  //chrome uygulamasını açmadan kullanılır
    // .excludeSwitches('enable-automation')
    // .addArguments('--disable-blink-features=AutomationControlled','--headless');


    let driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();
    try {
        // await driver.get('https://translate.google.com/');
        await driver.get(`https://translate.google.com/?hl=tr&sl=en&tl=tr&text=${text}`);
        while (true) {
            try {
                const text = await driver.findElement(By.css('.ryNqvb'));
                break;
            } catch (error) {

            }
        }
        const translatedTextElement = await driver.findElement(By.css('.ryNqvb'));
        await driver.wait(until.elementIsVisible(translatedTextElement), 5000);
        const translatedText = await translatedTextElement.getText();
        console.log(translatedText)
        return translatedText;
    }catch(err){
        console.log(err)
    } finally {
         await driver.quit();
    }
}

// const t=async ()=>{
//     const t = await translateText("The program encountered an error and had to abort the process")
// console.log(t)
// }
// t()




module.exports={
    translateText
}