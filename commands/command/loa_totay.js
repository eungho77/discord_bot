const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('스케줄')
        .setDescription('로스트아크 스케줄')
}

module.exports = discord