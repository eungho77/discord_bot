const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('명령어 모음')
}

module.exports = discord