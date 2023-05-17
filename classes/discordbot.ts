import { ChatInputCommandInteraction } from 'discord.js';
import { logger } from './logger';

export class Sender {
    async sendMessage(interaction: ChatInputCommandInteraction, send: string, receive: string) {
        try {
            const user = interaction.user;
            const response = `> **${send}** - <@${user.id}> \n\n ${receive}`;
            await interaction.editReply(response);
            logger.info(`${user.id} sent: ${send}, response: ${receive}`);
        } catch (e) {
            await interaction.editReply('> **Error: Something went wrong, please try again later!**');
            logger.error(`Error while sending:${send} in chatgpt model, error: ${e}`);
        }
    }

    async sendImage(interaction: ChatInputCommandInteraction, send: string, receive: string[]) {
        try {
            const user = interaction.user;
            const response = `> **${send}** - <@${user.id}> \n\n`;
            const files = Array.from(receive, (url, index) => ({attachment: url, file: url, name: `Object ${index + 1}.jpg`}))
            // return logger.debug(files);
            await interaction.editReply(response);
            await interaction.followUp({files: files});
            logger.info(`${user.id} sent: ${send}, response: ${receive}`);
        } catch (e) {
            await interaction.editReply('> **Error: Something went wrong, please try again later!**');
            logger.error(`Error while sending:${send} in dalle model, error: ${e}`);
        }
    }
}
