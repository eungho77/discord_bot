const {SlashCommandBuilder} = require("@discordjs/builders")
const {REST} = require ('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')

const commands = [
    new SlashCommandBuilder().setName('help').setDescription('명령어 모음'),
    SlashCommandBuilder().setName('?').setDescription('명령어 모음'),
].map(command => command.toJSON());

const registerCommands = function(token, clientId, guildId) {
    const rest = new REST({version: '9'}).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

module.exports = registerCommands