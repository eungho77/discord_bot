const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('검색')
        .setDescription('기본정보, 전투특성')
        .addStringOption(option =>
            option
                .setName('닉네임')
                .setDescription('로스트아크 닉네임')
                .setRequired(true))
}

module.exports = discord