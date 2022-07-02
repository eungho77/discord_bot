const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('도전')
        .setDescription('도전 가디언 토벌, 도전 어비스 던전')
}

module.exports = discord