require("dotenv").config();

const {logger} = require("./dist/logger");
const {commands} = require("./dist/commands");
const {Sender} = require("./dist/discordbot");
const {Client} = require("discord.js");
const {ChatGPT, DALLE} = require("./dist/chatgpt");
const {Memory} = require("./dist/memory");
const {OpenAIModel} = require("./dist/models");

const models = new OpenAIModel(process.env.OPENAI_API, process.env.OPENAI_MODEL_ENGINE);

const memory = new Memory(process.env.SYSTEM_MESSAGE);
const chatgpt = new ChatGPT(models, memory);
const dalle = new DALLE(models);


const client = new Client({
	intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
	presence: {
		status: "online",
		activities: [
			{
				type: 3, // Watching
				name: "/chat | /reset | /imagine",
			}
		]
	}
});

client.synced = false;
client.added = false;

const sender = new Sender();

client.login(process.env.BOT_TOKEN).then(async () => {
	logger.info("Syncing");
});

client.on("ready", async (bot) => {
	if (!bot.synced) {
		await bot.application?.fetch();
		await bot.application?.commands.set(commands);
		bot.synced = true;
	}
	if (!bot.added) {
		bot.added = true;
	}
	logger.info(`${bot.user?.username} is running!`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.user.bot) return;
	const {commandName, options} = interaction;

	if (commandName === "chat") {
		const text = options.getString("text") || "";
		logger.debug(`Chat ${text}`);
		await interaction.deferReply();
		await chatgpt.getResponse(interaction.user.id, text).then(async (response) => {
			logger.debug(`Response ${response}`);
			await sender.sendMessage(interaction, text, response);
		});
	}

	if (commandName === "imagine") {
		const text = options.getString("text");
		const number = options.getInteger("number");
		logger.debug(`Imagine ${text}`);
		await interaction.deferReply();
		await dalle.generate(text, number).then(async (response) => {
			logger.debug(`Response ${response}`);
			await sender.sendImage(interaction, text, response);
		});
	}

	if (commandName === "reset") {
		logger.debug(`Reset`);
		await interaction.deferReply();
		chatgpt.cleanHistory(interaction.user.id.toString());
		await interaction.editReply("> **Chat history has been reset!**");
	}
});
