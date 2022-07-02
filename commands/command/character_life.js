const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('내실')
        .setDescription('생활스킬, 수집품 정보')
        .addStringOption(option =>
            option
                .setName('닉네임')
                .setDescription('로스트아크 닉네임')
                .setRequired(true))
}

module.exports = discord