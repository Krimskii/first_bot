const TelegramBot = require('node-telegram-bot-api')

const emoji = require('node-emoji')

const TOKEN = '448727496:AAHLPsVhd272Elei-pM35kTKv6hVPuflHjQ'

const bot = new TelegramBot(TOKEN, {polling: true})

const KB = {
	news: emoji.get('newspaper') + ' Новости',
	request: emoji.get('envelope') + ' Обращение',
	sendRequest: emoji.get('clipboard') + 'Подать обращение',
	checkRequest: emoji.get('postbox') + 'Проверить статус',
	back: emoji.get('back') + ' Назад'
}

bot.onText(/\/start/, msg => {
	sendGreeting(msg)
})

bot.on('message', msg => {

	switch (msg.text) {
		case KB.request:
			sendRequestScreen(msg.chat.id)
			break
		case KB.news:
			break
		case KB.back:
			sendGreeting(msg, false)
			break
		case KB.checkRequest:
		case KB.sendRequest:
			break
	}

})

function sendGreeting(msg, sayHello = true) {
	const text = sayHello
	? `Добрый день, ${msg.from.first_name}\nВас приветствует БОТ общественной приемной акимата г.Алматы`
	: `Воспользуйтесь меню` + emoji.get('point_up_2')

	bot.sendMessage(msg.chat.id, text, {
		reply_markup: {
			keyboard: [
				[KB.request, KB.news]
			],
			resize_keyboard: true
		}
	})	
}

function sendRequestScreen(chatId) {
	bot.sendMessage(chatId, `Что вы хотите сделать?`, {
		reply_markup: {
			keyboard: [
				[KB.sendRequest, KB.checkRequest],
				[KB.back]
			],
			resize_keyboard: true,
		}
		
	})
}

