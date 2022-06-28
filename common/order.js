const axios = require('axios')

const order = {
    help: function() {
        const data = [];

        data.push(
            { name: '[명령어 모음]', value: '\u200B' },
            { name: '!검색 {캐릭터 닉네임} or !ㄱㅅ {캐릭터 닉네임} or !ㄳ {캐릭터 닉네임}', value: '기본정보, 전투특성' },
            { name: '!인포 {캐릭터 닉네임} or !ㅇㅍ {캐릭터 닉네임}', value: '각인, 카드'},
            { name: '!보석 {캐릭터 닉네임} or !쥬얼 {캐릭터 닉네임} or !ㅈㅇ {캐릭터 닉네임}', value: '전투스킬에 대한 보석'},
            { name: '!배럭 {캐릭터 닉네임} or !ㅂㄹ {캐릭터 닉네임}', value: '배럭캐릭터'},
            { name: '!내실 {캐릭터 닉네임} or !ㄴㅅ {캐릭터 닉네임}', value: '생활스킬, 수집품 정보'},
            { name: '!도전 or !ㄷㅈ', value: '도전 가디언 토벌, 도전 어비스 던전'},
            { name: '!스케줄 or !ㅅㅋㅈ', value: '로스트아크 스케줄'},
            { name: '!상점 {아이템 명} or !ㅅㅈ {아이템 명}', value: '로스트아크 상점가'},

            { name: 'ex) !ㄱㅅ 불주먹성수', value: '\u200B' },
        );

        return data
    },

    info: function(result) {
        const data = [];

        data.push({name: '[각인 정보]', value: '\u200B'})
        for (var i of result.engrave) {
            data.push({name: i.name + "/" + i.level, value: i.text, inline: true})
        }
        data.push(
            {name: '\u200B', value: '\u200B'},
            {name: '[카드 정보]', value: '\u200B'},
        )
        for (var j of result.card) {
            data.push({name: j.card_name, value: j.card_stone_count + "각", inline: true})
        }

        return data
    },

    search: function(result) {
        const data = [];

        if(result.mode) {
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
        } else {
            data.push({ name: result.title, value: '\u200B' })
        }
        return data
    },

    barak: function(result){
        const data = [];

        for(var z of result.expand){
            data.push({ name:  z.nickname +"/"+ " Lv. " + z.itemLevel, value: "서버 : " + z.server + "\n 직업 : " + z.job, inline: true})
        }

        return data
    },

    jewel: function (result) {
        const data = [];

        // 보석 정보
        for (var z of result.jewel) {
            data.push({name: z.jewel_name + "/ " + z.jewel_level, value: z.jewel_effect, inline: true})
        }

        return data;
    },

    life: function (collection) {
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

        return data
    },

    challenge: function(param) {
        const data = []

        var count = 1;

        // 도전 가디언 토벌
        data.push(
            { name: '[도전 가디언 토벌]', value: '\u200B' },
        )
        for(var z of param.raid){
            data.push({ name: '[도전 ' + count + ']' , value: z.name, inline: true})
            count = count + 1
        }
        count = 1
        // 도전 어비스 던전
        data.push(
            { name: '\u200B', value: '\u200B' },
            { name: '[도전 어비스 던전]', value: '\u200B' }
        )
        for(var z of param.abyss){
            data.push({ name: '[도전 ' + count + ']' , value: z.name, inline: true})
            count = count + 1
        }

        return data
    },

    today: function(param) {
        const data = [];
        var count = 1;

        // 도전 가디언 토벌
        for(var z of param){
            data.push({ name: count + ". " + z.name, value: z.time, inline: true})
            count = count + 1;
        }

        return data
    },
    
    shop: async (param) => {
        let result = param.items

        let data = [];
        var count = 1

        let shop_result = '';

        if(Array.isArray(result)){
            if(param.mode === "Success"){
                for(z of result){
                    data.push({ name: "item " + count + "번째" , value: z})
                    count = count + 1
                }
                data.push({ name: "명령어 사용법", value: "위에 있는 아이템 항목들 " + (count-1) + "건 검색이 되었습니다. \n 명령어 사용하기 위해 위에 있는 아이템을 확인하셔서 '!상점 {정확한 아이템 명}'을 입력해주시기 바랍니다. \n ex) !상점 " + result[0]})
            }
        } else {
            if(param.mode === "Success") {
                shop_result = await axios.get("http://152.70.248.4:5000/trade/" + result.replace(/[^0-9]/g, ""))
                if(shop_result.data.Result === "Success") {
                    for(i of shop_result.data.Pricechart) {
                        data.push({ name: shop_result.data.Name, value: "개수 > " + i.Amount + "\n골드 > " + i.Price})
                    }
                }
            }
            if(param.mode === "Failed") {
                data.push({ name: 'error', value: result })
            }
        }

        data.push({ name: '\u200B', value: "\u200B" })
        data.push({ name: '출처', value: "개발자 : 모코코더" })

        console.log(data)

        return data
    }
}

module.exports = {
    order
}