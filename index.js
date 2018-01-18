const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '448727496:AAHLPsVhd272Elei-pM35kTKv6hVPuflHjQ'

const bot = new TelegramBot(TOKEN, {polling: true})

bot.onText(/\/start/, msg =>{
	const text = `Добрый день, ${msg.from.first_name}\nЧто вы хотите?`

	bot.sendMessage(msg.chat.id, text, {
		reply_markup: {
			keyboard: [
				['Новости', 'Обращение']
			]
		}
	})
})