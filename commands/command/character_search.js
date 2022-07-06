const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = {
    data: new SlashCommandBuilder()
        .setName('검색')
        .setDescription('기본적으로 캐릭터 검색을 하고 선택항목에 따라 정보를 볼 수 있습니다.')
        .addStringOption(option =>
            option
                .setName('닉네임')
                .setDescription('로스트아크 닉네임')
                .setRequired(true))
}

module.exports = discord