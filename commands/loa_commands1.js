// 명령어 모음
const { order } = require('../common/order')
const axios = require('axios')
// const wait = require('node:timers/promises').setTimeout;

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
    help: (interaction) => {
        exampleEmbed.title = '명령어 정보'
        if (interaction.channelId === channelsId) {
            exampleEmbed.description = ''
            exampleEmbed.fields = order.help()
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        return exampleEmbed
    },
    select_item: async (interaction, url) => {
        const num = parseInt(interaction.values[0].split(":")[0])
        const nickname = interaction.values[0].split(":")[1]
        let result;

        if(num == 1){
            result = await discord.character_search(interaction, url, nickname)
        }
        if(num == 2){
            result = await discord.character_barracks(interaction, url, nickname)
        }
        if(num == 3){
            result = await discord.character_life(interaction, url, nickname)
        }

        return result
    },
    character_search: async (interaction, url, nickname) => {
        let result = {}

        exampleEmbed.title = '정보 / 기본, 전투 특성'
        if (interaction.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname))
            if(info.data.search) {
                exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 기본 정보입니다.'
                exampleEmbed.fields = order.search(info.data)
            } else {
                exampleEmbed.description = '[' + nickname + ']님은 존재하지 않습니다.'
                exampleEmbed.fields = info.data.search
            }
            if(!info.data.mode) {
                exampleEmbed.description = '[서버 점검 중]'
                exampleEmbed.fields = info.data.title
            }

            result = {
                exampleEmbed: exampleEmbed,
                search: info.data.search,
                mode: info.data.mode
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []

            result = {
                exampleEmbed: exampleEmbed,
                mode: false
            }
        }

        return result
    },
    character_barracks: async (interaction, url, nickname) => {
        let result = {}

        exampleEmbed.title = '보유캐릭터 안내'
        if (interaction.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname))
            if(info.data.search) {
                exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 보유캐릭터 정보입니다.'
                exampleEmbed.fields = order.barak(info.data)
            } else {
                exampleEmbed.description = '캐릭터 정보가 없습니다.'
                exampleEmbed.fields = []
            }
            if(!info.data.mode) {
                exampleEmbed.description = '[서버 점검 중]'
                exampleEmbed.fields = info.data.title
            }

            result = {
                exampleEmbed: exampleEmbed,
                search: info.data.search,
                mode: info.data.mode
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []

            result = {
                exampleEmbed: exampleEmbed,
                mode: false
            }
        }

        return result
    },
    character_life: async (interaction, url, nickname) => {
        let result = {}

        exampleEmbed.title = '생활 수집 / 수집품 안내'
        if (interaction.channelId === channelsId){
            let info = await axios.get(url+'/api/internal_stability?nickname=' + encodeURI(nickname))
            if(info.data.search) {
                exampleEmbed.description = '[' + nickname + ']님이 가지고 있는 내실 정보입니다.'
                exampleEmbed.fields = order.life(info.data)
            } else {
                exampleEmbed.description = '캐릭터 정보가 없습니다.'
                exampleEmbed.fields = []
            }
            if(!info.data.mode) {
                exampleEmbed.description = '[서버 점검 중]'
                exampleEmbed.fields = info.data.title
            }

            result = {
                exampleEmbed: exampleEmbed,
                search: info.data.search,
                mode: info.data.mode
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []

            result = {
                exampleEmbed: exampleEmbed,
                mode: info.data.mode
            }
        }

        return result
    },
    loa_challenge: async (interaction, url) => {
        exampleEmbed.title = '도전 가디언 토벌 / 어비스 던전 안내'
        if (interaction.channelId === channelsId){
            const result = await axios.get(url+'/api/inven/challenge')
            const param = result.data

            exampleEmbed.description = "▶ 기간 : " + param.date.split("이번 주 도전 가디언 & 어비스 날짜 및 시간 :")[1]
            exampleEmbed.fields = order.challenge(param)
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        return exampleEmbed
    },
    loa_totay: async (interaction, url) => {
        exampleEmbed.title = '로스트아크 스케줄 정보'
        if (interaction.channelId === channelsId){
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
    loa_shop: async (interaction, url) => {
        const shop_param = "";
        let items_name = "";

        if(interaction.commandName === "상점") {
            items_name = interaction.options.getString('아이템')
        }

        if(interaction.customId === 'items'){
            items_name = interaction.values[0]
        }

        exampleEmbed.title = '로스트아크 상점가'
        if (interaction.channelId === channelsId){
            const result = await axios.get(url+'/api/shop/search?items='+encodeURI(items_name));
            const param = result.data;
            const shop_param = await order.shop1(param);

            exampleEmbed.description = "아이템 명 : [" + items_name + "]" ;
            exampleEmbed.fields = shop_param.data;

            final_result = {
                row: shop_param.row,
                exampleEmbed: exampleEmbed
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];

            final_result = {
                exampleEmbed: exampleEmbed
            }
        }

        return final_result
    },
    loa_shop_mari: async (interaction, url) => {
        const shop_param = "";
        let items_name = "";

        exampleEmbed.title = '로스트아크 마리샵'
        if (interaction.channelId === channelsId){
            const result = await axios.get(url+'/api/shop/mari');
            const param = result.data;

            exampleEmbed.description = "" ;
            exampleEmbed.fields = await order.shop_mari(param);
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        return exampleEmbed
    }
}

module.exports = discord
