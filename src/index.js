// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require('@wppconnect-team/wppconnect');
const { db } = require('../src/models/banco');
const { step } = require('../src/models/stages');

// bot.create().then((client) => start(client));

bot
	.create({
		session: 'bot-nodejs',
		whatsappVersion: '2.2230.15',
		statusFind: (statusSession, session) => {
			console.log('Status Session: ', statusSession);
			console.log('Session name: ', session);
		},
	})
	.then((client) => start(client))
	.catch((error) => console.log(error));

bot.defaultLogger.level = 'silly';

function start(client) {
	//
	async function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	//
	() => {
	
}
	client.onMessage((message) => {
		sleep(10000);
		let resp = step[getStage(message.from)].obj.execute(
			message.from,
			message.body,
			message.sender.name
		);
		for (let index = 0; index < resp.length; index++) {
			const element = resp[index];
			client.sendText(message.from, element);
		}
	});
}

function getStage(user) {
	if (db[user]) {
		//Se existir esse numero no banco de dados
		return db[user].stage;
	} else {
		//Se for a primeira vez que entra e contato
		db[user] = {
			stage: 0,
			itens: [],
		};
		return db[user].stage;
	}
}

exports.start = start;
