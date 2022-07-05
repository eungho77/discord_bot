const Discord = require('discord.js')
const fs = require('node:fs')

const loa_commands1 = require('./commands/loa_commands1')
const loa_commands2 = require('./commands/loa_commands2')
const selectData = require('./commands/selectBox/selectBox')

const { REST } = require ('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { token, url, clientId, guildId, fileUrL } = require('./config.json')

const commands = [];
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const commandFiles = fs.readdirSync(fileUrL+'/commands/command').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/command/${file}`)
    commands.push(command.data.toJSON())
}


const rest = new REST({version: '9'}).setToken(token)
let shop = "";

client.on('ready', () => {
    (async () => {
        try {
            if(!guildId) {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );
            } else {
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
            }

            console.log('모든 명령어 등록 성공')
        } catch (error) {
            console.error(error);
        }
    })();

    console.log(`${client.user.tag}에 로그인하였습니다!`)
    const status = "명령어 모음에 대해서 알고 싶다면 /help 를 쳐보세요. \n 문의 : 성수소년"
    param = {
        game : {
            name : status
        },
        status: 'online'
    }
    client.user.setActivity(status)
});

// { / } 명령어 이용시
client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) return

    if (interaction.commandName === 'help') {
        await interaction.reply({embeds: [loa_commands1.help(interaction)]})
    }
    if (interaction.commandName === '검색') {
        if (interaction.commandName === '검색') {
            result = await loa_commands1.character_search1(interaction, url)
            await interaction.reply({embeds: [result], components: [selectData.character_search(interaction.options.getString('닉네임'))]})
        }
    }
    if(interaction.commandName === "인포") {
        await interaction.reply({ content: "해당 명령어는 /검색으로 통합시켰습니다. /검색 {닉네임} 입력하신 후 선택박스에서 선택해보세요." })
    }
    if(interaction.commandName === "배럭") {
        await interaction.reply({ content: "해당 명령어는 /검색으로 통합시켰습니다. /검색 {닉네임} 입력하신 후 선택박스에서 선택해보세요." })
    }
    if (interaction.commandName === "보석") {
        await interaction.reply({ content: "해당 명령어는 /검색으로 통합시켰습니다. /검색 {닉네임} 입력하신 후 선택박스에서 선택해보세요." })
    }
    if (interaction.commandName === "내실") {
        await interaction.editReply({ content: "해당 명령어는 /검색으로 통합시켰습니다. /검색 {닉네임} 입력하신 후 선택박스에서 선택해보세요." })
    }
    if (interaction.commandName === "도전") {
        result = await loa_commands1.loa_challenge(interaction, url)
        await interaction.reply({ embeds: [result] })
    }
    if (interaction.commandName === "스케줄") {
        result = await loa_commands1.loa_totay(interaction, url)
        await interaction.reply({ embeds: [result] })
    }
    if (interaction.commandName === "상점") {
        await interaction.deferReply();
        shop = await loa_commands1.loa_shop(interaction, url)

        if(shop.row != null) {
            await interaction.followUp({ embeds: [shop.exampleEmbed], components: [shop.row] })
        } else {
            await interaction.followUp({ embeds: [shop.exampleEmbed] })
        }
    }
    if (interaction.commandName === "마리샵") {
        result = await loa_commands1.loa_shop_mari(interaction, url)
        await interaction.reply({ embeds: [result] })
    }
})

// { ! } 명령어 이용시
client.on('message', async(msg) => {
    if(msg.content === "!help" || msg.content === "!?") {
        result = await loa_commands2.help(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if((msg.content.split(" ")[0] === "!검색" || msg.content.split(" ")[0] === "!ㄳ" || msg.content.split(" ")[0] === "!ㄱㅅ") && msg.content.split(" ")[1] != null) {
        result = await loa_commands2.character_search(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if((msg.content.split(" ")[0] === "!인포" || msg.content.split(" ")[0] === "!ㅇㅍ") && msg.content.split(" ")[1] != null) {
        result = await loa_commands2.character_info(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if((msg.content.split(" ")[0] === "!배럭" || msg.content.split(" ")[0] === "!ㅂㄹ") && msg.content.split(" ")[1] != null) {
        result = await loa_commands2.character_barracks(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if ((msg.content.split(" ")[0] === "!보석" || msg.content.split(" ")[0] === "!쥬얼" || msg.content.split(" ")[0] === "!ㅈㅇ") && msg.content.split(" ")[1].length >= 1) {
        result = await loa_commands2.character_jewel(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if ((msg.content.split(" ")[0] === "!내실" || msg.content.split(" ")[0] === "!ㄴㅅ") && msg.content.split(" ")[1] != null) {
        result = await loa_commands2.character_life(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if ((msg.content.split(" ")[0] === "!도전" || msg.content.split(" ")[0] === "!ㄷㅈ")) {
        result = await loa_commands2.loa_challenge(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if ((msg.content.split(" ")[0] === "!스케줄" || msg.content.split(" ")[0] === "!ㅅㅋㅈ")) {
        result = await loa_commands2.loa_totay(msg, url)
        await msg.channel.send({ embeds: [result] })
    }
    if ((msg.content.split(" ")[0] === "!상점" || msg.content.split(" ")[0] === "!ㅅㅈ") && msg.content.substring(4).length != 0) {
        // result = await loa_commands2.loa_shop(msg, url)
        await msg.channel.send("해당 명령어는 폐기했습니다. '/상점'을 이용해주시길 바랍니다.")
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if(interaction.customId === 'search') {
        await interaction.deferReply();
        result = await loa_commands1.select_item(interaction, url)
        await interaction.followUp({ embeds: [result], components: [selectData.character_search(interaction.values[0].split(":")[1])]})
    }

    if(interaction.customId === 'items') {
        await interaction.deferReply();
        result = await loa_commands1.loa_shop(interaction, url)
        await interaction.followUp({ embeds: [result.exampleEmbed], components: [shop.row] })
    }
});

client.login(token)