const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('사전')
        .setDescription('로스트아크 아이템 사전 (각인)')
        .addStringOption(option =>
            option
                .setName('아이템')
                .setDescription('각인 아이템')
                .setRequired(true))
}

module.exports = discord