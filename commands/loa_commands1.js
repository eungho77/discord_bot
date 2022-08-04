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
        let info = await axios.get(url+'/api/info/' + encodeURI(interaction.member.nickname) + '/' + encodeURI(nickname))

        if (interaction.channelId === channelsId){
            if(info.data.search) {
                exampleEmbed.title = '정보 / 기본, 전투 특성'
                exampleEmbed.description = '[' + nickname + ']님이 가지고 있는 기본 정보입니다.'
                exampleEmbed.fields = order.search(info.data)
                exampleEmbed.image = {
                    url: info.data.image
                }
            } else {
                exampleEmbed.title = '[' + nickname + ']님은 존재하지 않습니다.'
                exampleEmbed.description = info.data.content
                exampleEmbed.fields = []
                exampleEmbed['image'].remove()
            }
            if(!info.data.mode) {
                exampleEmbed.title = '[' + info.data.title + ']'
                exampleEmbed.description = ''
                exampleEmbed['image'].remove()
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
        let info = await axios.get(url+'/api/info/' + encodeURI(interaction.member.nickname) + '/' + encodeURI(nickname))

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
        let info = await axios.get(url+'/api/internal_stability/' + encodeURI(interaction.member.nickname) + '/' + encodeURI(nickname))

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
            const result = await axios.get(url+'/api/inven/challenge/' + encodeURI(interaction.member.nickname))
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
            const result = await axios.get(url+'/api/inven/timer/' + encodeURI(interaction.member.nickname))
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
        let result = "";
        let shop = {}
        if(interaction.commandName === "상점") {
            items_name = interaction.options.getString('아이템')
        }
        if(interaction.customId === 'items'){
            items_name = interaction.values[0]
        }

        const param = await axios.get(url+'/api/shop/search/' + encodeURI(interaction.member.nickname) + '/' + encodeURI(items_name))
        const data = param.data

        console.log(data)

        if (interaction.channelId === channelsId){
            if(data.mode){
                result = await order.shop(data)
                title = result.item_name != false ? result.item_name : items_name

                exampleEmbed.title = "아이템 명 > " + title
                exampleEmbed.description = ''
                exampleEmbed.fields = result.data
            } else {
                exampleEmbed.title = "아이템 명 > " + items_name
                exampleEmbed.description = data.items
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        shop = {
            row: !result.row ? false : result.row,
            exampleEmbed: exampleEmbed
        }

        console.log(shop)

        return shop
    },
    loa_shop_mari: async (interaction, url) => {
        const result = await axios.get(url+'/api/shop/mari/' + encodeURI(interaction.member.nickname));
        const param = result.data

        if (interaction.channelId === channelsId){

            if(param.mode) {
                const data = await order.shop_mari(param)
                exampleEmbed.title = '로스트아크 마리샵'
                exampleEmbed.description = ""
                exampleEmbed.fields = data
            } else {
                exampleEmbed.title = '[' + param.title + ']'
                exampleEmbed.description = ''
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.fields = []
        }

        console.log(exampleEmbed)
        return exampleEmbed
    },
    dictionary: async (interaction, url, item) => {
        let result = {}
        let data_row = '';

        if(interaction.commandName === "사전") {
            items_name = interaction.options.getString('아이템')
        }

        if(interaction.customId === 'dictionary_item'){
            items_name = interaction.values[0]
        }

        const param = await axios.get(url+'/api/loa/dictionary/' + encodeURI(interaction.member.nickname) + '/' + encodeURI(items_name));
        const data = param.data
        console.log(param.data)
        if (interaction.channelId === channelsId) {
            if (data.search && data.result.count == 1 && data.mode) {
                const result = await order.dictionary(data.result)
                exampleEmbed.title = data.result.name
                exampleEmbed.description = ''
                exampleEmbed.fields = result.data
            }

            if (data.search && data.result.count > 1 && data.mode) {
                data_row = await order.dictionary(data.result)
                exampleEmbed.title = '검색 건 수가 ' + data.result.name.split(", ").length + '개 있습니다.'
                exampleEmbed.description = '검색 결과 : [' + items_name + '] \n아래 선택 사항을 이용해주세요.'
                exampleEmbed.fields = []
            }

            if (data.search && data.result.count == 0 && data.mode) {
                exampleEmbed.title = '검색 결과 : [' + items_name + ']'
                exampleEmbed.description = data.result.content
                exampleEmbed.fields = []
            }

            if (!data.mode) {
                exampleEmbed.title = '[' + data.title + ']'
                exampleEmbed.description = ''
                exampleEmbed.fields = []
            }
        } else {
            exampleEmbed.title = "전투정보실 채널에서 조회하세요!"
            exampleEmbed.description = ''
            exampleEmbed.fields = []
        }

        result.exampleEmbed = exampleEmbed
        result.search = data.search
        result.mode = data.mode
        result.row = (data_row != '') ? data_row.row : ''

        console.log(result)
        return result
    }
}

module.exports = discord
