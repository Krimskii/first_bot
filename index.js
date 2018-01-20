const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '448727496:AAHLPsVhd272Elei-pM35kTKv6hVPuflHjQ'

const bot = new TelegramBot(TOKEN, {polling: true})

const KB = {
	news: 'Новости',
	request: 'Обращение',
	claim: 'Жалоба',
	propsal: 'Предложение',
	back: 'Назад'
}

bot.onText(/\/start/, msg => {
	sendGreeting(msg)
})

bot.on('message', msg => {

	switch (msg.text) {
		case KB.news:
			break
		case KB.request:
			sendRequestScreen(msg.chat.id)
			break
		case KB.back:
			sendGreeting(msg, false)
			break
		case KB.propsal:
		case KB.claim:
			break
	}
})

function sendGreeting(msg, sayHello = true) {
	const text = sayHello
	? `${msg.from.first_name}, добро пожаловать в бот-канал общественной приемной акимата Алматы.`
	: `Воспользуйтесь меню`

	bot.sendMessage(msg.chat.id, text, {
		reply_markup: {
			keyboard: [
				[KB.news, KB.request]
			],
			resize_keyboard: true
		}
	})	
}

function sendRequestScreen(chatId) {
	bot.sendMessage(chatId, `Выберите тип обращения: `, {
		reply_markup: {
			keyboard: [
				[KB.propsal, KB.claim],
				[KB.back],
				resize_keyboard: true
			]
		}
	})
}


function sendNewsScreen(chatId) {
	bot.sendMessage(chatId, `Выберите тип новостей: `, {
		reply_markup: {
			keyboard: [
				[KB.propsal, KB.claim],
				[KB.back],
				resize_keyboard: true
			]
		}
	})
}