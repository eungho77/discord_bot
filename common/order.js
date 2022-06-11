const order = {
    help: function() {
        const data = [];

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
    }
}

module.exports = {
    order
}