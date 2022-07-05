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
            result = await character_search(interaction, url, nickname)
        }
        if(num == 2){
            result = await character_info(interaction, url, nickname)
        }
        if(num == 3){
            result = await character_barracks(interaction, url, nickname)
        }
        if(num == 4){
            result = await character_jewel(interaction, url, nickname)
        }
        if(num == 5){
            result = await character_life(interaction, url, nickname)
        }

        return result
    },
    character_search1: async (interaction, url) => {
        exampleEmbed.title = '정보 / 기본, 전투 특성'
        if (interaction.channelId === channelsId){
            let info = await axios.get(url+'/api/info?nickname=' + encodeURI(interaction.options.getString("검색")))
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
    loa_challenge: async (interaction, url) => {
        exampleEmbed.title = '도전 가디언 토벌 / 어비스 던전 안내'
        if (interaction.channelId === channelsId){
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

character_search = async (interaction, url, nickname) => {
    exampleEmbed.title = '정보 / 기본, 전투 특성'
    if (interaction.channelId === channelsId){
        let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname))
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
}
character_info = async (interaction, url, nickname) => {
    exampleEmbed.title = '각인 / 카드 안내'
    if (interaction.channelId === channelsId){
        let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname));
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
}
character_barracks = async (interaction, url, nickname) => {
    exampleEmbed.title = '보유캐릭터 안내'
    if (interaction.channelId === channelsId){
        let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname))
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
}
character_jewel = async (interaction, url, nickname) => {
    exampleEmbed.title = '보석 안내'
    if (interaction.channelId === channelsId){
        let info = await axios.get(url+'/api/info?nickname=' + encodeURI(nickname))
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
}
character_life = async (interaction, url, nickname) => {
    exampleEmbed.title = '생활 수집 / 수집품 안내'
    if (interaction.channelId === channelsId){
        const result = await axios.get(url+'/api/internal_stability?nickname=' + encodeURI(nickname))

        exampleEmbed.description = '[' + nickname + ']님이 가지고 있는 내실 정보입니다.'
        exampleEmbed.fields = order.life(result.data)
    } else {
        exampleEmbed.description = "전투정보실 채널에서 조회하세요!"
        exampleEmbed.fields = []
    }

    return exampleEmbed
}

module.exports = discord
