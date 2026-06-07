const { Telegraf } = require('telegraf');

require('dotenv').config({ path: './bot_token' });

const { getRandomPrediction } = require('./oracle');

// Мини-веб-сервер для Render (чтобы бот не засыпал)
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🔮 Дельфийский Оракул жив и работает!');
});

app.listen(PORT, () => {
    console.log(`🌐 Веб-сервер запущен на порту ${PORT}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Спрашивай, но не вини меня, если ответ тебе не понравится...')
});

bot.on('text', (ctx) => {
    const prediction = getRandomPrediction();

    ctx.reply(prediction);
});

console.log('✅ Дельфийский оракул успешно запущен!');
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));