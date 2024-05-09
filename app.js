const say = require('say');

// Dönüştürmek istediğiniz metin
const metin = 'After detecting a critical issue, the system automatically aborted the operation to prevent further complications';

// Metni sese dönüştür 
say.export(metin,null, 1, 'ses.mp3', (hata) => {
  if (hata) {
    return console.error('Hata oluştu:', hata);
  }
  console.log('Ses dosyası başarıyla oluşturuldu!');
});