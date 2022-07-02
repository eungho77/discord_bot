const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('상점')
        .setDescription('로스트아크 거래소')
        .addStringOption(option =>
            option
                .setName('아이템')
                .setDescription('아이템 입력')
                .setRequired(true))
}

module.exports = discord