// 명령어 모음
const { order } = require('../common/order')
const axios = require('axios')

const { channelsId } = require('../config.json')

const exampleEmbed = {
    color: 0x0099ff,
    // url: 'https://discord.js.org',
    author: {
        name: 'LostArk',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
    }
};

const discord = {
    help: (msg) => {
        exampleEmbed.title = '명령어 정보'
        if (msg.channelId === channelsId) {
            exampleEmbed.description = ''
            exampleEmbed.fields = order.help()
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        return exampleEmbed
    },
    character_search: async (msg, url) => {
        exampleEmbed.title = '정보 / 기본, 전투 특성'
        if (msg.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(msg.content.split(" ")[1]))
            if(info.data.nickname != null && info.data.mode) {
                exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 기본 정보입니다.'
                exampleEmbed.fields = order.search(info.data)
            } else {
                exampleEmbed.description = '캐릭터 정보가 없습니다.'
                exampleEmbed.fields = order.search(info.data)
            }
            if(!info.data.mode) {
                exampleEmbed.description = info.data.title
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        return exampleEmbed
    },
    character_info: async (msg, url) => {
        exampleEmbed.title = '각인 / 카드 안내'
        if (msg.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(msg.content.split(" ")[1]));
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
        return exampleEmbed
    },
    character_barracks: async (msg, url) => {
        exampleEmbed.title = '보유캐릭터 안내'
        if (msg.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(msg.content.split(" ")[1]))
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

        return exampleEmbed
    },
    character_jewel: async (msg, url) => {
        exampleEmbed.title = '보석 안내'
        if (msg.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(msg.content.split(" ")[1]))
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

        return exampleEmbed
    },
    character_life: async (msg, url) => {
        exampleEmbed.title = '생활 수집 / 수집품 안내'
        if (msg.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(msg.content.split(" ")[1]))
            if(info.data.nickname != null) {
                await msg.channel.send("약 10 ~ 15초 정도 기다리셔야합니다..")
                const result = await axios.get(url+'/api/internal_stability?nickname=' + encodeURI(msg.content.split(" ")[1]))

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

        return exampleEmbed
    },
    loa_challenge: async (msg, url) => {
        exampleEmbed.title = '도전 가디언 토벌 / 어비스 던전 안내'
        if (msg.channelId === channelsId){
            const result = await axios.get(url+'/api/inven/challenge')
            const param = result.data

            exampleEmbed.description = result.data.date
            exampleEmbed.fields = order.challenge(param)
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        return exampleEmbed
    },
    loa_totay: async (msg, url) => {
        exampleEmbed.title = '로스트아크 스케줄 정보'
        if (msg.channelId === channelsId){
            const result = await axios.get(url+'/api/inven/timer')
            const param = result.data

            exampleEmbed.description = ''
            exampleEmbed.fields = order.today(param)
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        return exampleEmbed
    },
    // loa_shop: async (msg, url) => {
    //     exampleEmbed.title = '로스트아크 상점가'
    //     if (msg.channelId === channelsId){
    //         const result = await axios.get(url+'/api/shop/search?items='+ encodeURI(msg.content.substring(4)));
    //         const param = result.data;
    //
    //         exampleEmbed.description = "아이템 명 : [" + msg.content.substring(4) + "]" ;
    //         exampleEmbed.fields = await order.shop2(param);
    //     } else {
    //         exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
    //         exampleEmbed.fields = [];
    //     }
    //
    //     return exampleEmbed
    // }
}

module.exports = discord
