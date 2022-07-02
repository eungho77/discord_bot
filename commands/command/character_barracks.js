const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('배럭')
        .setDescription('보유캐릭터')
        .addStringOption(option =>
            option
                .setName('닉네임')
                .setDescription('로스트아크 닉네임')
                .setRequired(true))
}

module.exports = discord