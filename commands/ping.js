const { MessageEmbed } = require('discord.js')
const colour = require('../configurations/colour.json')

module.exports = {
    aliases: ['p'],
    description: 'API latency for the bot!',
    category: 'Utility',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: `You don't have to add any arguments!`,
    cooldown: '5s',
    callback: ({ message, client }) => {
        
        const ping = `${(Math.round(client.ws.ping))}ms`

        const embed = new MessageEmbed()
            .setColor(`${colour.skyBlue}`)
            .setTitle('Pong!')
            .addField('Bot Latency', `${message.createdTimestamp - message.createdTimestamp}ms`, true)
            .addField('API Latency', ping, true)
    }
}