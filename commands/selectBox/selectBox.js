const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const selectBox = require('./select')

const selectData = {
    character_search: (nickname) => {
        let count = 1;

        for(let a of selectBox) {
            a.value = (count++) + ":" + nickname
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('search')
                    .setPlaceholder('선택하세요.')
                    .addOptions(selectBox)
            )

        return row
    }
}

module.exports = selectData
