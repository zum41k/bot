import TelegramBot from "node-telegram-bot-api";
// Импортируем модуль google-tts-api
import googleTTS from 'google-tts-api';
import path from 'path';
import axios from "axios";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'
const currentModuleUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentModuleUrl);
const currentDir = dirname(currentFilePath);


// Функция для преобразования текста в речь
const textToSpeech = async (text, lang = 'en', speed = 0.5) => {
    const url = googleTTS.getAudioUrl(text, {
      lang: lang,
      slow: true,
      host: 'https://translate.google.com',
    });
    console.log(url)
    return url;
  };
  
  // Функция для сохранения файла
  const saveFile = async (url, fileName) => {
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const writer = fs.createWriteStream(fileName);
      response.data.pipe(writer);
  
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.log(error)
    }
  };
  

  

// // Creates a client
// const client = new textToSpeech.TextToSpeechClient();
// async function quickStart() {
//   // The text to synthesize
//   const text = 'hello, world!';

//   // Construct the request
//   const request = {
//     input: {text: text},
//     // Select the language and SSML voice gender (optional)
//     voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
//     // select the type of audio encoding
//     audioConfig: {audioEncoding: 'MP3'},
//   };

//   // Performs the text-to-speech request
//   const [response] = await client.synthesizeSpeech(request);
//   // Write the binary audio content to a local file
//   const writeFile = util.promisify(fs.writeFile);
//   await writeFile('output.mp3', response.audioContent, 'binary');
//   console.log('Audio content written to file: output.mp3');
// }
// quickStart();








// let keyboard = {
//   reply_markup: {
//     keyboard: [
//       [ {text: 'hello'}, {text: 'good buy'} ]
//     ]
//   }
// }

let keyboard = {
  reply_markup: {
    inline_keyboard: [
      [ {text: 'hello', callback_data: 'hello'}, {text: 'good buy', callback_data: 'good buy'} ]
    ]
  }
}







console.log('start')


let token = '6057157623:AAGJCzju2mOLFmC7wUWYqjwTDuNqjvObPk8' // password
let myId = ''

let bot = new TelegramBot(token, {polling: true})


bot.on('message', async function (message) {
    // bot.sendMessage(message.chat.id, 'hello')

    if (message.text == '/start') {
      await bot.sendPhoto(message.chat.id, 'img/завантаження.jpg', {caption: 'Відправте ваш текст і я переведу його в голос'}) 
      await bot.sendMessage(message.chat.id, '<b>Welcome</b> <i>Your bot is process creating</i> Input your text and bot convert to voice:', {parse_mode: 'HTML'})
    }
    else if (message.text == '/info'){
      await bot.sendMessage(message.chat.id, '<u>underline</u><a href="https://google.com"> link to google</a>', {parse_mode: 'HTML'})
    }

    else if (message.text == 'temp'){
      await bot.sendMessage(message.chat.id, 'Choose keyboard', keyboard)
    }

    else {
        bot.sendMessage(message.chat.id, 'hi')
          // Пример использования
        const text = message.text;
        const lang = 'en';
        const speed = 1;
        
        const speechUrl = await textToSpeech(text, lang, speed);
        const fileName = path.join(currentDir, 'output.mp3');

        
        saveFile(speechUrl, fileName)
            .then(() => {
                console.log(`Файл ${fileName} успешно сохранен.`)
                bot.sendAudio(message.chat.id, 'output.mp3')
    })
            .catch((error) => console.error(error.message));
        
    }





    //   if (message.text == 'hello') {
    //     bot.sendMessage(message.chat.id, 'hi')
    //       // Пример использования
    //     const text = 'Привет, это пример текста для преобразования в речь.';
    //     const lang = 'ru';
    //     const speed = 1;
        
    //     const speechUrl = await textToSpeech(text, lang, speed);
    //     const fileName = path.join(currentDir, 'output.mp3');

        
    //     saveFile(speechUrl, fileName)
    //         .then(() => {
    //             console.log(`Файл ${fileName} успешно сохранен.`)
    //             bot.sendAudio(message.chat.id, 'output.mp3')
    // })
    //         .catch((error) => console.error(error.message));
        
    // }
    // if (message.text == 'by') {
    //     bot.sendMessage(message.chat.id, 'Goodby')    
    // }
    // if (message.text == 'help') {
    //   bot.sendPhoto(message.chat.id, '1.jpg')
    //   bot.sendMessage(message.chat.id, 'Can I help you?')    
    // }

  })
    

bot.on('photo', function (message) {
    bot.sendPhoto(message.chat.id, '1.jpg')

})
bot.on('audio', function (message) {
    bot.sendAudio(message.chat.id, '1.mp3')
    
})



