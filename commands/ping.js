module.exports = {
    aliases: ['p'],
    description: 'API latency for the bot!',
    category: 'Utility',
    cooldown: '5s',
    callback: ({ message, client }) => {
        message.reply(`Pong! API latency is ${(Math.round(client.ws.ping))}`)
    }
}