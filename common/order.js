const axios = require('axios')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const order = {
    help: function() {
        const data = [];

        data.push(
            { name: '[명령어 모음]', value: '\u200B' },
            { name: '/검색 {캐릭터 닉네임}', value: '기본정보, 전투특성' },
            { name: '/도전', value: '도전 가디언 토벌, 도전 어비스 던전'},
            { name: '/스케줄', value: '로스트아크 스케줄'},
            { name: '/상점 {아이템 명}', value: '로스트아크 거래소'},
        );

        return data
    },
    search: function(result) {
        const data = []
        let battle = "" // 전투 특성
        let card = "" // 카드
        let engrave = "" // 각인
        let jewel = "" // 보석

        for(var a of result.battle){
            battle += '▶ ' + a.name + ' : ' + a.number + "\n"
        }

        for(var a of result.card){
            card += '▶ ' + a.name + ' : ' + a.stone_count + "\n"
        }

        for (var a of result.engrave) {
            engrave += '▶ ' + a.name + ' : ' + a.level + "\n"
        }

        for (var a of result.jewel) {
            jewel += '▶ ' + a.level + ' ' + a.type + "의 보석 > " + a.name + "의 " + a.effect + "\n"
        }

        data.push(
            {
                name: '[기본 정보]',
                value: '▶ 서버 : ' + result.server + '\n▶ 직업 : ' + result.job
                + '\n▶ 원정대 레벨 : Lv.' + result.expedition + '\n▶ 레벨 : ' + result.level + '\n▶ 아이템 레벨 : ' + result.itemLevel,
                inline: true
            },
            {
                name: '[기본 특성]',
                value: '▶ 공격력 : ' + result.basic.attack + '\n▶ 최대 생명력 : ' + result.basic.hp,
                inline: true
            },
            {
                name: '[전투 특성]',
                value:  battle,
                inline: true
            },
            {
                name: '[카드]',
                value:  card.length == 0 ? "카드가 없습니다." : card,
                inline: true
            },
            {
                name: '[각인]',
                value:  engrave.length == 0 ? "각인이 없습니다." : engrave,
                inline: true
            },
            {
                name: '[보석]',
                value: jewel.length == 0 ? "보석이 없습니다." : jewel
            }
        )

        console.log('ddd')
        console.log(data)

        return data
    },
    barak: function(result){
        const data = [];
        let baraks = "";

        for(var a of result.expand){
            baraks += '▶ ' + a.server + " / " + a.job + " / " + a.itemLevel + " / " + a.nickname + "\n"
        }

        data.push(
            {
                name:  '▶ 서버 / 직업 / 아이템레벨 / 닉네임',
                value: baraks,
                inline: true
            }
        )

        return data
    },
    life: function (result) {
        const data = [];
        let collection = "";
        let life = "";

        for(let a of result.life){
            life += '▶ ' + a.name + " > " + a.level + "\n"
        }

        for(var a of result.collection){
            collection += '▶ ' + a.name + " > " + a.count + "개 \n"
        }

        // 생활 스킬
        data.push(
            {
                name: '[생활 스킬]',
                value: life,
                inline: true
            },
            {
                name: '[내실]',
                value: collection,
                inline: true
            }
        )

        return data
    },
    challenge: function(param) {
        const data = []

        let raid = "" // 도전 가디언 토벌
        let abyss = "" // 도전 어비스 던전

        for(var a of param.raid){
            raid += '▶ ' + a.name + "\n"
        }

        for(var a of param.abyss){
            abyss += '▶ ' + a.name + "\n"
        }

        data.push(
            {
                name: '[도전 가디언 토벌]',
                value: raid,
                inline: true
            },
            {
                name: '[도전 어비스 던전]',
                value: abyss,
                inline: true
            }
        )

        return data
    },
    today: function(result) {
        const data = []
        let today = ""
        var count = 1

        for(let a of result){
            if(count <= 30) {
                today += "▶ " + count + ". " + a.name + " / " + a.time + "\n"
            }
            count = count + 1;
        }

        data.push(
            {
                name: '오늘의 스케줄',
                value: today,
                inline: true
            }
        )

        return data
    },
    shop1: async (param) => {
        let result = param.items

        let data = [];
        let row_data = [];

        var count = 1

        let shop_result = '';

        if(Array.isArray(result)){
            if(param.mode === "Success"){
                for(z of result){
                    row_data.push({label: z, description: '', value: z})
                }
                data.push({ name: "아래 항목을 클릭하여 선택하세요.", value: "아래 항목을 클릭하여 선택을 하시면 자동으로 검색이 됩니다.", inline: true})
            }

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('items')
                        .setPlaceholder('아이템을 선택하세요.')
                        .addOptions(row_data),
                )

            data.push({ name: '\u200B', value: "\u200B" })
            data.push({ name: '출처', value: "개발자 : 모코코더" })
            
            init = {
                row: row,
                data: data
            }
        } else {
            if(param.mode === "Success") {
                shop_result = await axios.get("http://152.70.248.4:5000/trade/" + result.replace(/[^0-9]/g, ""))
                if(shop_result.data.Result === "Success") {
                    let count = 1;
                    for(i of shop_result.data.Pricechart) {
                        data.push({ name: "No. " + count++, value: "개수 > " + i.Amount + "\n골드 > " + i.Price})
                    }
                }
                init = {
                    item_name: shop_result.data.Name,
                    data: data
                }
            }
            if(param.mode === "Failed") {
                data.push({ name: 'error', value: result })
            }

            data.push({ name: '\u200B', value: "\u200B" })
            data.push({ name: '출처', value: "개발자 : 모코코더" })
            
            init = {
                data: data
            }
        }

        return init
    },
    shop_mari: function(param) {
        const data = []
        let item = ""

        for(let a of param) {
            if(a.mode)
                item = "";
                for(let b of a.mari_list) {
                    item += "▶ " + ((b.popularity == "인기") ? "[" + b.popularity + "] " : "") + b.item + " / 크리스탈 " + b.amount + "개 \n"
                }
                data.push(
                    {
                        name: a.type,
                        value: item
                    }
                )
            }

        return data
    }
}

module.exports = {
    order
}