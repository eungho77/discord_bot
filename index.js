const Discord = require('discord.js');
const MessageEmbed = require('discord.js');
const axios = require('axios');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const exampleEmbed = {
    color: 0x0099ff,
    title: 'LostArk 전투정보실',
    // url: 'https://discord.js.org',
    author: {
        name: 'LostArk',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
    },
    // thumbnail: {
    //     url: 'https://i.imgur.com/AfFp7pu.png',
    // },
    // image: {
    //     url: 'https://i.imgur.com/AfFp7pu.png',
    // },
    // timestamp: new Date(),
    // footer: {
    //     text: 'Some footer text here',
    //     icon_url: 'https://i.imgur.com/AfFp7pu.png',
    // },
};

client.on('ready', () => {
    // console.log(`${client.user.tag}에 로그인하였습니다!`)
    // exampleEmbed.description = `${client.user.tag}에 로그인하였습니다!`;
    // exampleEmbed.fields = [];

    console.log(`${client.user.tag}에 로그인하였습니다!`)

    // client.channels.cache.get('981105473585549332').send({ embeds: [exampleEmbed] })
});

client.on('message', async(msg) => {
    const message = msg.content;
    const param = await axios.get('http://localhost:3000/lostark/api/info?nickname=' + encodeURI(message.split(" ")[1]));
    const result = param.data;

    if(message === "!help" || message === "!?") {
        data = [];

        data.push(
            { name: '[명령어 모음]', value: '\u200B' },
            { name: '!검색 {nickname}', value: '기본정보, 전투특성' },
            { name: '!세부정보 {nickname}', value: '각인, 카드, 생활스킬(임시)'},
            { name: '!보석 {nickname}', value: '전투스킬에 대한 보석'},
            { name: '!보유캐릭터 {nickname}', value: '배럭캐릭터'},
        );

        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            exampleEmbed.description = '명령어 정보들입니다.';
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }

    if(message.includes("!검색")) {
        const data = [];
        if(result.nickname == ''){
            exampleEmbed.description = '캐릭터정보가 없습니다.';
            exampleEmbed.data = [];
        } else {
            // 기본 정보
            data.push(
                { name: '[기본 정보]', value: '\u200B' },
                { name: '닉네임', value: result.nickname, inline: true },
                { name: '서버', value: result.server, inline: true},
                { name: '직업', value: result.job, inline: true },
                { name: '레벨', value: result.level, inline: true },
                { name: '아이템 레벨', value: result.itemLevel, inline: true },
            );
            // 기본 특성
            data.push(
                { name: '\u200B', value: '\u200B' },
                { name: '[기본 특성]', value: '\u200B' },
                { name: '공격력', value: result.basic.attack, inline: true },
                { name: '최대생명력', value: result.basic.hp, inline: true},
            )
            // 전투 특성
            data.push(
                { name: '\u200B', value: '\u200B' },
                { name: '[전투 특성]', value: '\u200B' },
                { name: '치명', value: result.battle.Deadly, inline: true },
                { name: '특화', value: result.battle.Specialization, inline: true },
                { name: '제압', value: result.battle.Overpowering, inline: true },
                { name: '신속', value: result.battle.quick, inline: true },
                { name: '인내', value: result.battle.Patience, inline: true },
                { name: '숙련', value: result.battle.proficiency, inline: true },
            )
        }

        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            exampleEmbed.description = '[' + result.nickname + ']님의 전투정보실입니다.';
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if(message.includes("!세부정보")) {
        const data = [];
        if(result.nickname == ''){
            exampleEmbed.description = '캐릭터정보가 없습니다.';
            exampleEmbed.data = [];
        } else {
            data.push(
                { name: '[각인 정보]', value: '\u200B' },
            )
            for(var i of result.engrave){
                data.push({ name: i.engrave_option.split("Lv.")[0], value: "Lv." + i.engrave_option.split("Lv.")[1], inline: true })
            }
            data.push(
                { name: '\u200B', value: '\u200B' },
                { name: '[카드 정보]', value: '\u200B' },
            )
            for(var j of result.card){
                data.push({ name: j.card_name, value: j.card_stone_count + "각", inline: true })
            }
            data.push(
                { name: '\u200B', value: '\u200B' },
                { name: '[생활스킬 정보]', value: '\u200B' },
            )
            for(var z of result.life){
                data.push({ name:  z.life_name, value: z.life_level, inline: true})
            }
        }

        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            exampleEmbed.description = '[' + result.nickname + ']님의 세부정보실입니다.';
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if(message.includes("!보유캐릭터")) {
        data = [];
        if(result.nickname == ''){
            exampleEmbed.description = '캐릭터정보가 없습니다.';
            exampleEmbed.data = [];
        } else {
            for(var z of result.expand){
                data.push({ name:  z.nickname +"/"+ " Lv. " + z.itemLevel, value: "서버 : " + z.server + "\n 직업 : " + z.job, inline: true})
            }
        }

        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            exampleEmbed.description = '[' + result.nickname + ']님의 보유캐릭터입니다.';
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }

    if (message.includes("!보석")) {
        const data = [];

        if(result.nickname == ''){
            exampleEmbed.description = '캐릭터정보가 없습니다.';
            exampleEmbed.data = [];
        } else {
            // 전투스킬 정보
            for(var z of result.jewel){
                data.push({ name:  z.jewel_name +"/ " + z.jewel_level, value: z.jewel_effect, inline: true})
            }
        }

        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            exampleEmbed.description = '[' + result.nickname + ']님이 보유하신 보석입니다.';
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
});

client.login('OTgwNzg2NjQ1OTM2NzgzNDAw.GBrZ6s.I5fSGEhhioQZsD-7ePohjfMD2fejz0LuRSr24Y');