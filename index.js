const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '448727496:AAHLPsVhd272Elei-pM35kTKv6hVPuflHjQ'

const bot = new TelegramBot(TOKEN, {polling: true})

const KB = {
	news: 'Новости',
	request: 'Обращение',
	sendRequest: 'Подать обращение',
	checkRequest: 'Проверить статус',
	back: 'Назад'
}

bot.onText(/\/start/, msg => {
	sendGreeting(msg)
})

bot.on('message', msg => {

	switch (msg.text) {
		case KB.news:
			sendRequestScreen(msg.chat.id)
			break
		case KB.request:
			break
		case KB.back:
			sendGreeting(msg, false)
			break
		case KB.checkRequest:
		case KB.sendRequest:
			break
	}

})

function sendRequestScreen(chatId) {
	bot.sendMessage(chatId, `Выберите тип новостей: `, {
		reply_markup: {
			keyboard: [
				[KB.checkRequest, KB.sendRequest],
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