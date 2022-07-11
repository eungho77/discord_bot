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
    }
}

module.exports = discord
