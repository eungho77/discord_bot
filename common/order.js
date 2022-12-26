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

        if(result.hasOwnProperty('battle')) {
            for(var a of result.battle){
                battle += '▶ ' + a.name + ' : ' + a.number + "\n"
            }
        }

        if(result.hasOwnProperty('card')) {
            for (var a of result.card) {
                card += '▶ ' + a.name + ' : ' + a.stone_count + "\n"
            }
        }

        if(result.hasOwnProperty('engrave')) {
            for (var a of result.engrave) {
                engrave += '▶ ' + a.name + ' : ' + a.level + "\n"
            }
        }

        if(result.hasOwnProperty('jewel')) {
            for (var a of result.jewel) {
                jewel += '▶ ' + a.level + ' ' + a.type + "의 보석 > " + a.name + "의 " + a.effect + "\n"
            }
        }

        data.push(
            {
                name: '[영지]',
                value: '▶ 영지 이름 : ' + result.townName + '\n▶ 영지 레벨 : ' + result.townLevel,
                inline: true
            },
            {
                name: '[기본 정보]',
                value: '▶ 서버 : ' + result.server + '\n▶ 직업 : ' + result.job + '\n▶ 길드 : ' + result.guild
                + '\n▶ 원정대 레벨 : Lv.' + result.expedition + '\n▶ 레벨 : ' + result.level + '\n▶ 장착 아이템 (평균) : ' + result.avg_item_level + '\n▶ 장착 아이템 (최대) : ' + result.max_item_level,
                inline: true
            },
            {
                name: '[기본 특성]',
                value: (result.hasOwnProperty('basic')) ? '▶ 공격력 : ' + result.basic.attack + '\n▶ 최대 생명력 : ' + result.basic.hp : '기본 특성이 없습니다.',
                inline: true
            },
            {
                name: '[전투 특성]',
                value:  (battle.length == 0) ? '전투 특성이 없습니다.' : battle,
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

        console.log(data)

        return data
    },
    equipment: function(result){
        const data = []
        let equipment = "" // 장비구
        let accessories = "" // 장신구
        let avatar = "" // 아바타
        let sail = "" // 항해
        let count = 0

        if(result.hasOwnProperty('equipment')) {
            while (true) {
                equipment += '▶ ' + result.equipment[count].name + '\n'
                if (count == result.equipment.length - 10) {
                    count++
                    break
                }
                count++
            }
            while (true) {
                accessories += '▶ ' + result.equipment[count].name + '\n'
                if (count == result.equipment.length - 3) {
                    count++
                    break
                }
                count++
            }
            while (true) {
                sail += '▶ ' + result.equipment[count].name + '\n'
                if (count == result.equipment.length - 1) {
                    break
                }
                count++
            }
        }
        if(result.hasOwnProperty('avatars')) {
            for (let avatars of result.avatars) {
                avatar += '▶ ' + avatars.name + '\n'
            }
        }

        data.push(
            {
                name:  '[장비구 목록]',
                value: (equipment.length == 0) ? '보유하신 장비가 없습니다.' : equipment,
                inline: false
            },
            {
                name:  '[아바타 목록]',
                value: (avatar.length == 0) ? '보유하신 아바타가 없습니다.' : avatar,
                inline: false
            },
            {
                name:  '[장신구 목록]',
                value: (accessories.length == 0) ? '보유하신 장신구가 없습니다.' : accessories,
                inline: false
            },
            {
                name:  '[항해물 목록]',
                value: (sail.length == 0) ? '보유하신 항해물이 없습니다.' : sail,
                inline: false
            },
        )

        return data
    },
    skill: function(result){
        const data = []
        let skill = ""
        let skill_detail = ""
        let count = 1

        if(result.hasOwnProperty('skills')) {
            for (let skills of result.skills) {
                skill += count++ + '. [' + skills.name + '] > '

                for (let detail of skills.detail) {
                    skill_detail += detail.slot + "-"
                }

                skill += skill_detail.slice(0, -1) + '\n'
                skill_detail = ""
            }
        }

        data.push(
            {
                name:  '▶ [스킬 이름] > {스킬 트리}',
                value: (skill.length == 0) ? '스킬 정보가 없습니다.' : skill,
                inline: true
            }
        )

        return data
    },
    barak: function(result){
        const data = []
        let baraks = ""

        if(result.hasOwnProperty('expand')) {
            for (var a of result.expand) {
                baraks += '▶ ' + a.server + " / " + a.job + " / " + a.avg_item_level + " / " + a.nickname + "\n"
            }
        }

        data.push(
            {
                name:  '▶ 서버 / 직업 / 아이템레벨 / 닉네임',
                value: (baraks.length == 0) ? '보유하신 캐릭터가 없습니다.' : baraks,
                inline: true
            }
        )

        return data
    },
    life: function (result) {
        const data = []
        let collection = ""
        // let life = "";
        //
        // for(let a of result.life){
        //     life += '▶ ' + a.name + " > " + a.level + "\n"
        // }
        if (result.hasOwnProperty('collectibles')){
            for(var a of result.collectibles){
                collection += '▶ ' + a.name + " > " + a.count + "개 \n"
            }
        }

        // 생활 스킬
        data.push(
            // {
            //     name: '[생활 스킬]',
            //     value: life,
            //     inline: true
            // },
            {
                name: '[수집품]',
                value: (collection.length == 0) ? '보유하신 수집품이 없습니다.' : collection,
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
    shop: async (param) => {
        let data = []

        let row = ""
        let row_data = []
        let item_name = ""

        let shop = {}

        if(param.total > 1) {
            for(let a of param.items) {
                row_data.push({label: a, description: '', value: a})
            }
            data.push({ name: "[아래 선택 사항을 선택하세요.]", value: "▶ 그럼 자동으로 검색이 됩니다.", inline: true})

            row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('items')
                    .setPlaceholder('아이템을 선택하세요.')
                    .addOptions(row_data),
            )
        }
        if(param.total == 1) {
            let arr = param.items[0].split(" : ")
            let items = ""
            const item = await axios.get("https://lostarkapi.ga/trade/" + encodeURI(parseInt(arr[1])))
            const result = item.data

            if(result.Result == "Success") {
                for(let i of result.Pricechart) {
                    items += '▶ ' + i.Amount + '개 / ' + i.Price + '골드 \n'
                }
                data.push({ name: "[거래소]", value: items})
            }
            
            item_name = arr[0]
        }

        data.push({ name: '[출처]', value: "▶ 개발자 : 모코코더" })

        shop = {
            item_name: item_name != "" ? item_name : "",
            row: row != "" ? row : false,
            data: data
        }

        return shop
    },
    shop_mari: function(param) {
        const data = []
        let item = ""

        for(let a of param.result) {
            if (a.mode) {
                item = "";
                for (let b of a.mari_list) {
                    item += "▶ " + ((b.popularity == "인기") ? "[" + b.popularity + "] " : "") + b.item + " / 크리스탈 " + b.amount + "개 \n"
                }
                data.push(
                    {
                        name: a.type,
                        value: item
                    }
                )
            }
        }
        return data
    },
    dictionary: async (param) => {
        let dictionary_content = "";
        const data = [];
        let row_data = [];
        let result = {};

        if(param.count == 1) {
            for(let a of param.content) {
                dictionary_content += '▶ ' + a + '\n'
            }

            data.push(
                {
                    name: '[각인 설명서]',
                    value: dictionary_content
                }
            )

            result = {
                data: data
            }
        }
        if(param.count > 1) {
            for(let a of param.name.split(", ")) {
                row_data.push({label: a, description: '', value: a})
            }

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('dictionary_item')
                        .setPlaceholder('아이템을 선택하세요.')
                        .addOptions(row_data)
                )

            result = {
                row: row
            }
        }

        return result
    }
}

module.exports = {
    order
}