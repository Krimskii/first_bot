const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '448727496:AAHLPsVhd272Elei-pM35kTKv6hVPuflHjQ'

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on('message', msg => {
	bot.sendMessage(msg.chat.id, `Hello from Bot, bot says: "Hi, ${msg.from.first_name}"`)
})

