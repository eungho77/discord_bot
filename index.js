const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const axios = require('axios')
const { token, url } = require('./config.json')

// 명령어 모음
const { order } = require('./common/order')

// const Commands = require('./slashCommends/slash')
// const config = require('./slashCommends/config')



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const exampleEmbed = {
    color: 0x0099ff,
    // url: 'https://discord.js.org',
    author: {
        name: 'LostArk',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
    }
};

// Slash Command 추가
// Commands(config.token, config.clientId, config.guildId);

client.on('ready', () => {
    console.log(`${client.user.tag}에 로그인하였습니다!`)

    const status = "명령어 모음에 대해서 알고 싶다면 /? or /help를 쳐보세요. \n 문의 : 성수소년";

    param = {
        game : {
            name : status
        },
        status: 'online'
    }

    client.user.setActivity(status)
});

client.on('message', async(msg) => {
    if(msg.content === "!help" || msg.content === "!?" && msg.content.split("\n").length == 1) {
        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            
            exampleEmbed.description = '명령어 정보들입니다.'
            exampleEmbed.fields = order.help()
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }
        await msg.channel.send({ embeds: [exampleEmbed] })
    }

    if((msg.content.split(" ")[0] === "!검색" || msg.content.split(" ")[0] === "!ㄳ" || msg.content.split(" ")[0] === "!ㄱㅅ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '정보 / 기본, 전투 특성'
        const message = msg.content
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]))
                if(info.data.nickname != null) {
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 기본 정보입니다.'
                    exampleEmbed.fields = order.search(info.data)
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.'
                    exampleEmbed.fields = []
                }
            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
                exampleEmbed.fields = []
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if((msg.content.split(" ")[0] === "!인포" || msg.content.split(" ")[0] === "!ㅇㅍ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '각인 / 카드 안내'
        const message = msg.content
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 세부정보 입니다.'
                    exampleEmbed.fields = order.info(info.data)
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.'
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
                exampleEmbed.fields = []
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if((msg.content.split(" ")[0] === "!배럭" || msg.content.split(" ")[0] === "!ㅂㄹ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '보유캐릭터 안내'
        const message = msg.content
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]))
                if(info.data.nickname != null) {
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 보유캐릭터 정보입니다.'
                    exampleEmbed.fields = order.barak(info.data)
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.'
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
                exampleEmbed.fields = []
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!보석" || msg.content.split(" ")[0] === "!쥬얼" || msg.content.split(" ")[0] === "!ㅈㅇ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '보석 안내'
        const message = msg.content
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 보석 정보입니다.';
                    exampleEmbed.fields = order.jewel(info.data)
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.'
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
                exampleEmbed.fields = []
            }
        }
        
        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!내실" || msg.content.split(" ")[0] === "!ㄴㅅ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '생활 수집 / 수집품 안내'
        const message = msg.content
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                const info = await axios.get(url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]))
                if(info.data.nickname != null) {
                    await msg.channel.send("약 10 ~ 15초 정도 기다리셔야합니다..")
                    const result = await axios.get(url+'/api/internal_stability?nickname=' + encodeURI(message.split(" ")[1]))

                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 내실 정보입니다.'
                    exampleEmbed.fields = order.life(result.data)
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.'
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
                exampleEmbed.fields = []
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!도전" || msg.content.split(" ")[0] === "!ㄷㅈ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '도전 가디언 토벌 / 어비스 던전 안내'
        const message = msg.content
        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            const result = await axios.get(url+'/api/inven/challenge')
            const param = result.data

            exampleEmbed.description = result.data.date
            exampleEmbed.fields = order.challenge(param)
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!스케줄" || msg.content.split(" ")[0] === "!ㅅㅋㅈ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '로스트아크 스케줄 정보'
        const message = msg.content;
        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            const result = await axios.get(url+'/api/inven/timer');
            const param = result.data;

            exampleEmbed.description = '';
            exampleEmbed.fields = order.today(param);
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!상점" || msg.content.split(" ")[0] === "!ㅅㅈ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '로스트아크 상점가'
        const message = msg.content;
        // if(message.split(" ")[1] != null){
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                const item = message.split("!상점")[1].trim()

                const result = await axios.get(url+'/api/shop/search?items='+encodeURI(item));
                const param = result.data;
                
                exampleEmbed.description = '';
                exampleEmbed.fields = await order.shop(param);
            } else {
                // exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
                // exampleEmbed.fields = [];
            }
        // }

        // console.log(exampleEmbed)

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
});

client.login(token);