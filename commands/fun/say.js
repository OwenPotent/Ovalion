module.exports = {
    name: 'say',
    aliases: 's',
    category: 'Fun',
    minArgs: 1,
    maxArgs: -1,
    guildOnly: true,
    syntaxError: "Please state a message you wish to ask the bot to send!",
    callback: ({ message }) => {
    
        if (message.author.bot) return;
        
        message.channel.send(message)
    }
}