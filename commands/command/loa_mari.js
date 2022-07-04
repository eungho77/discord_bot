const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('마리샵')
        .setDescription('마리샵 아이템 목록')
}

module.exports = discord