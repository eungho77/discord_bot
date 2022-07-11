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

        console.log(result)
        return result
    },
    character_search: async (interaction, url, nickname) => {
        let result = {}
        let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname) + '&username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("검색"))

        if (interaction.channelId === channelsId){
            if(info.data.search) {
                exampleEmbed.title = '정보 / 기본, 전투 특성'
                exampleEmbed.description = '[' + nickname + ']님이 가지고 있는 기본 정보입니다.'
                exampleEmbed.fields = order.search(info.data)
            } else {
                exampleEmbed.title = '[' + nickname + ']님은 존재하지 않습니다.'
                exampleEmbed.description = info.data.content
                exampleEmbed.fields = []
            }
            if(!info.data.mode) {
                exampleEmbed.title = '[' + info.data.title + ']'
                exampleEmbed.description = ''
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        result = {
            exampleEmbed: exampleEmbed,
            search: info.data.search,
            mode: info.data.mode
        }

        return result
    },
    character_barracks: async (interaction, url, nickname) => {
        let result = {}
        let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname) + '&username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("배럭"))

        if (interaction.channelId === channelsId){
            if(info.data.search) {
                exampleEmbed.title = '보유캐릭터 안내'
                exampleEmbed.description = '[' + info.data.nickname + ']님이 가지고 있는 보유캐릭터 정보입니다.'
                exampleEmbed.fields = order.barak(info.data)
            } else {
                exampleEmbed.title = '[' + nickname + ']님은 존재하지 않습니다.'
                exampleEmbed.description = info.data.content
                exampleEmbed.fields = []
            }
            if(!info.data.mode) {
                exampleEmbed.title = '[' + info.data.title + ']'
                exampleEmbed.description = ''
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        result = {
            exampleEmbed: exampleEmbed,
            search: info.data.search,
            mode: info.data.mode
        }

        return result
    },
    character_life: async (interaction, url, nickname) => {
        let result = {}
        let info = await axios.get(url+'/api/internal_stability?nickname=' + encodeURI(nickname) + '&username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("내실"))

        exampleEmbed.title = '생활 수집 / 수집품 안내'
        if (interaction.channelId === channelsId){
            if(info.data.search) {
                exampleEmbed.title = '보유캐릭터 안내'
                exampleEmbed.description = '[' + nickname + ']님이 가지고 있는 내실 정보입니다.'
                exampleEmbed.fields = order.life(info.data)
            } else {
                exampleEmbed.title = '[' + nickname + ']님은 존재하지 않습니다.'
                exampleEmbed.description = info.data.content
                exampleEmbed.fields = []
            }
            if(!info.data.mode) {
                exampleEmbed.title = '[' + info.data.title + ']'
                exampleEmbed.description = ''
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        result = {
            exampleEmbed: exampleEmbed,
            search: info.data.search,
            mode: info.data.mode
        }

        return result
    },
    loa_challenge: async (interaction, url) => {
        exampleEmbed.title = '도전 가디언 토벌 / 어비스 던전 안내'
        if (interaction.channelId === channelsId){
            const result = await axios.get(url+'/api/inven/challenge?&username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("도전"))
            const param = result.data

            exampleEmbed.description = "▶ 기간 : " + param.date.split("이번 주 도전 가디언 & 어비스 날짜 및 시간 :")[1]
            exampleEmbed.fields = order.challenge(param)
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        console.log(exampleEmbed)
        return exampleEmbed
    },
    loa_totay: async (interaction, url) => {
        exampleEmbed.title = '로스트아크 스케줄 정보'
        if (interaction.channelId === channelsId){
            const result = await axios.get(url+'/api/inven/timer?username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("스케줄"))
            const param = result.data

            exampleEmbed.description = ''
            exampleEmbed.fields = order.today(param)
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        console.log(exampleEmbed)
        return exampleEmbed
    },
    loa_shop: async (interaction, url) => {
        let shop_param = ""
        let items_name = "";

        if(interaction.commandName === "상점") {
            items_name = interaction.options.getString('아이템')
        }

        if(interaction.customId === 'items'){
            items_name = interaction.values[0]
        }

        const result = await axios.get(url+'/api/shop/search?items=' + encodeURI(items_name) +'&username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("상점"))

        if (interaction.channelId === channelsId){
            const param = result.data;
            shop_param = await order.shop(param);
            exampleEmbed.title = '아이템 명 : [' + items_name + ']'
            exampleEmbed.description = '' ;
            exampleEmbed.fields = shop_param.data;
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        final_result = {
            row: shop_param.row ? shop_param.row : false,
            exampleEmbed: exampleEmbed
        }

        console.log(final_result)
        return final_result
    },
    loa_shop_mari: async (interaction, url) => {
        const shop_param = "";
        let items_name = "";

        exampleEmbed.title = '로스트아크 마리샵'
        if (interaction.channelId === channelsId){
            const result = await axios.get(url+'/api/shop/mari?username=' + encodeURI(interaction.member.nickname) + '&command=' + encodeURI("마리샵"));
            const param = result.data;

            exampleEmbed.description = "" ;
            exampleEmbed.fields = await order.shop_mari(param);
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!";
            exampleEmbed.fields = [];
        }

        console.log(exampleEmbed)
        return exampleEmbed
    }
}

module.exports = discord
