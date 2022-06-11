const Discord = require('discord.js');
const MessageEmbed = require('discord.js');
const axios = require('axios');
const web = require('./link/url_info');
const dc = require('./discord/info');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const exampleEmbed = {
    color: 0x0099ff,
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
    console.log(`${client.user.tag}에 로그인하였습니다!`)

    const status = "명령어 모음에 대해서 알고 싶다면 !? or !help를 쳐보세요. \n 문의 : 성수소년";

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
        data = [];

        data.push(
            { name: '[명령어 모음]', value: '\u200B' },
            { name: '!검색 or !ㄱㅅ or !ㄳ', value: '기본정보, 전투특성' },
            { name: '!세부정보 or !ㅅㅂㅈㅂ', value: '각인, 카드, 생활스킬(임시)'},
            { name: '!보석 or !쥬얼 or !ㅈㅇ', value: '전투스킬에 대한 보석'},
            { name: '!배럭 or !ㅂㄹ', value: '배럭캐릭터'},
            { name: '!내실 or !ㄴㅅ', value: '생활스킬, 수집품 정보'},
            { name: '!도전 or !ㄷㅈ', value: '도전 가디언 토벌, 도전 어비스 던전'},
            { name: '!스케줄 or !ㅅㅋㅈ', value: '로스트아크 스케줄'},

            { name: 'ex) !ㄱㅅ 불주먹성수', value: '\u200B' },
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

    if((msg.content.split(" ")[0] === "!검색" || msg.content.split(" ")[0] === "!ㄳ" || msg.content.split(" ")[0] === "!ㄱㅅ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '정보 / 기본, 전투 특성'
        const message = msg.content;
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(web.url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    const result = info.data;
                    const data = [];

                    // 기본 정보
                    data.push(
                        { name: '[기본 정보]', value: '\u200B' },
                        { name: '닉네임', value: result.nickname, inline: true },
                        { name: '서버', value: result.server, inline: true},
                        { name: '직업', value: result.job, inline: true },
                        { name: '원정대 레벨', value: "Lv. " + result.expedition, inline: true },
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
                    )
                    for(var x of result.battle){
                        data.push({ name: x.name, value: x.number, inline: true })
                    }
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 기본 정보입니다.';
                    exampleEmbed.fields = data;
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.';
                    exampleEmbed.fields = []
                }
            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
                exampleEmbed.fields = [];
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if((msg.content.split(" ")[0] === "!세부정보" || msg.content.split(" ")[0] === "!ㅅㅂㅈㅂ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '각인 / 카드 안내'
        const message = msg.content;
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(web.url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    const result = info.data;
                    const data = [];

                    console.log(result)

                    data.push({ name: '[각인 정보]', value: '\u200B' })
                    for(var i of result.engrave){
                        data.push({ name: i.name + "/" + i.level, value: i.text, inline: true })
                    }
                    data.push(
                        { name: '\u200B', value: '\u200B' },
                        { name: '[카드 정보]', value: '\u200B' },
                    )
                    for(var j of result.card){
                        data.push({ name: j.card_name, value: j.card_stone_count + "각", inline: true })
                    }
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 세부정보 입니다.';
                    exampleEmbed.fields = data;
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.';
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
                exampleEmbed.fields = [];
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if((msg.content.split(" ")[0] === "!배럭" || msg.content.split(" ")[0] === "!ㅂㄹ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '보유캐릭터 안내'
        const message = msg.content;
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(web.url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    const result = info.data;
                    const data = [];

                    for(var z of result.expand){
                        data.push({ name:  z.nickname +"/"+ " Lv. " + z.itemLevel, value: "서버 : " + z.server + "\n 직업 : " + z.job, inline: true})
                    }
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 보유캐릭터 정보입니다.';
                    exampleEmbed.fields = data;
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.';
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
                exampleEmbed.fields = [];
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!보석" || msg.content.split(" ")[0] === "!쥬얼" || msg.content.split(" ")[0] === "!ㅈㅇ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '보석 안내'
        const message = msg.content;
        let info;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                info = await axios.get(web.url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    const result = info.data;
                    const data = [];

                    // 보석 정보
                    for(var z of result.jewel){
                        data.push({ name:  z.jewel_name +"/ " + z.jewel_level, value: z.jewel_effect, inline: true})
                    }
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 보석 정보입니다.';
                    exampleEmbed.fields = data;
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.';
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
                exampleEmbed.fields = [];
            }
        }
        
        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!내실" || msg.content.split(" ")[0] === "!ㄴㅅ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '생활 수집 / 수집품 안내'
        const message = msg.content;
        if(message.split(" ")[1].length >= 1) {
            if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
                const info = await axios.get(web.url+'/api/info?nickname=' + encodeURI(message.split(" ")[1]));
                if(info.data.nickname != null) {
                    await msg.channel.send("약 10 ~ 15초 정도 기다리셔야합니다..")
                    const result = await axios.get(web.url+'/api/internal_stability?nickname=' + encodeURI(message.split(" ")[1]));
                    const collection = result.data;
                    const data = [];

                    // 생활 스킬
                    data.push(
                        { name: '\u200B', value: '\u200B' },
                        { name: '[생활스킬 정보]', value: '\u200B' },
                    )
                    for(var z of collection.life){
                        data.push({ name:  z.life_name, value: z.life_level, inline: true})
                    }

                    // 내실
                    data.push(
                        { name: '\u200B', value: '\u200B' },
                        { name: '[내실 정보]', value: '\u200B' },
                    )
                    for(var j of collection.collection){
                        data.push({ name:  j.collection_name, value: j.collection_count + "개", inline: true})
                    }
                    exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 내실 정보입니다.';
                    exampleEmbed.fields = data;
                } else {
                    exampleEmbed.description = '캐릭터 정보가 없습니다.';
                    exampleEmbed.fields = []
                }

            } else {
                exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
                exampleEmbed.fields = [];
            }
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    if ((msg.content.split(" ")[0] === "!도전" || msg.content.split(" ")[0] === "!ㄷㅈ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '도전 가디언 토벌 / 어비스 던전 안내'
        const message = msg.content;
        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            const result = await axios.get(web.url+'/api/inven/challenge');
            const param = result.data;
            const data = [];
            
            var count = 1;

            // 도전 가디언 토벌
            data.push(
                { name: '[도전 가디언 토벌]', value: '\u200B' },
            )
            for(var z of param.raid){
                data.push({ name: '[도전 ' + count + ']' , value: z.name, inline: true})
                count = count + 1;
            }
            count = 1;
            // 도전 어비스 던전
            data.push(
                { name: '\u200B', value: '\u200B' },
                { name: '[도전 어비스 던전]', value: '\u200B' }
            )
            for(var z of param.abyss){
                data.push({ name: '[도전 ' + count + ']' , value: z.name, inline: true})
                count = count + 1;
            }
            exampleEmbed.description = param.date;
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }

    if ((msg.content.split(" ")[0] === "!스케줄" || msg.content.split(" ")[0] === "!ㅅㅋㅈ") && msg.content.split("\n").length == 1) {
        exampleEmbed.title = '로스트아크 스케줄 정보'
        const message = msg.content;
        if (msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
            const result = await axios.get(web.url+'/api/inven/timer');
            const param = result.data;
            const data = [];

            var count = 1;

            // 도전 가디언 토벌
            for(var z of param){
                data.push({ name: count + ". " + z.name, value: z.time, inline: true})
                count = count + 1;
            }

            exampleEmbed.description = '';
            exampleEmbed.fields = data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        await msg.channel.send({ embeds: [exampleEmbed] })
    }
    // if((msg.content.split(" ")[0] === "!거래가" || msg.content.split(" ")[0] === "!ㄱㄹㄱ") && msg.content.split("\n").length == 1) {
    //     let param = ""
    //     let result = ""
    //     let flag = false
    //     const data = [];
    //
    //     if(msg.content.split(" ")[1] === "각인") {
    //         if(msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
    //             await msg.channel.send("약 10 ~ 15초 정도 기다리셔야합니다..")
    //
    //             param = await axios.get(web.url+'/api/store/imprint');
    //             result = param.data;
    //
    //             data.push(
    //                 { name: '[최근 거래가]', value: '\u200B' },
    //             )
    //             for(var i of result){
    //                 data.push({ name: i.store_name, value: i.store_price, inline: true })
    //             }
    //
    //             exampleEmbed.description = "각인에 대한 최근 거래가입니다.";
    //             exampleEmbed.fields = data
    //         } else {
    //             exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
    //             exampleEmbed.fields = [];
    //         }
    //     } else {
    //         if(msg.channel.id === "981105473585549332" || msg.channel.id === "981103805485703188" || msg.channel.id === "981223608728813668"){
    //             exampleEmbed.description = "명령어를 잘못 입력하셨습니다.";
    //             exampleEmbed.fields = [];
    //         } else {
    //             exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
    //             exampleEmbed.fields = [];
    //         }
    //     }
    //
    //     await msg.channel.send({ embeds: [exampleEmbed] })
    // }
});

client.login(dc.sess);