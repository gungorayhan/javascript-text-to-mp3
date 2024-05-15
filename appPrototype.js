const express = require("express")
const say = require('say');
const fs = require('fs');

const app = express()

app.use(express.json())

app.post("/convert", async (req, res) => {

const {vocabulary,text,level} = req.body;
  // const vocabulary = 'Abort';
  const folderPath = './' + vocabulary;
  // const text = 'The program encountered an error and had to abort the process';
  // const level = "B1";


  // fs.mkdirSync(folderPath, (err) => {
  //   if (err) {
  //     console.error('was not make folder:', err);
  //     return;
  //   }

  //   say.export(text, null, 0.75, `${folderPath}/${vocabulary}${level}.mp3`, (error) => {
  //     if (error) {
  //       return console.error("Error: ",error);
  //     }
  //   });
  // });

  fs.stat(vocabulary, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.mkdirSync(folderPath, (err) => {
          if (err) {
            console.error('was not make folder:', err);
            return;
          }

          say.export(text, null, 0.75, `${folderPath}/${vocabulary}${level}.mp3`, (error) => {
            if (error) {
              return console.error("Error: ", error);
            }
          });
        });
      } else {
        console.error('Bir hata oluştu:', err);
      }
    } else {
      say.export(text, null, 0.75, `${folderPath}/${vocabulary}${level}.mp3`, (error) => {
        if (error) {
          return console.error("Error: ", error);
        }
      });
    }
  });
  
  res.send("işlem başarılı")
})



app.listen(8000, () => {
  console.log("convert api is running on port 8000")
})