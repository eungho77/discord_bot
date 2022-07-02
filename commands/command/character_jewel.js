const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('보석')
        .setDescription('캐릭터 보석정보')
        .addStringOption(option =>
            option
                .setName('닉네임')
                .setDescription('로스트아크 닉네임')
                .setRequired(true))
}

module.exports = discord