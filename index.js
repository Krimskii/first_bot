const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '448727496:AAHLPsVhd272Elei-pM35kTKv6hVPuflHjQ'

const bot = new TelegramBot(TOKEN, {polling: true})

const KB = {
	news: 'Новости',
	request: 'Обращение',
	cat: 'КотЭ',
	car: 'Машина',
	back: 'Назад'
}

bot.onText(/\/start/, msg => {
	sendGreeting(msg)
})

bot.on('message', msg => {

	switch (msg.text) {
		case KB.news:
			sendNewsScreen(msg.chat.id)
			break
		case KB.request:
			break
		case KB.back:
			sendGreeting(msg, false)
			break
		case KB.car:
		case KB.cat:
			break
	}

})

function sendNewsScreen(chatId) {
	bot.sendMessage(chatId, `Выберите тип новостей: `, {
		reply_markup: {
			keyboard: [
				[KB.car, KB.cat],
				[KB.back]
			]
		}
	})
}

function sendGreeting(msg, sayHello = true) {
	const text = sayHello
	? `Добрый день, ${msg.from.first_name}\nЧто вы хотите?`
	: `Что вы хотите сделать?`

	bot.sendMessage(msg.chat.id, text, {
		reply_markup: {
			keyboard: [
				[KB.news, KB.request]
			]
		}
	})	
}