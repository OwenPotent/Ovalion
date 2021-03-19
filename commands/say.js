module.exports = {
    aliases: 's',
    category: 'Fun',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "Please state a message you wish to ask the bot to send!",
    callback: ({ message }) => {
        message.channel.send(message)
    }
}