const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'API latency for the bot!',
    category: 'Utility',
    cooldown: '5s',
    guildOnly: true,
    callback: ({ message, client }) => {
        const ping = `Pong! API latency is ${(Math.round(client.ws.ping))}ms`

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle
    }
}