const Discord = require('discord.js')

module.exports = {
    category: "Moderation",
    expectedArgs: "<userID/Mention> [reason]",
    
    callback: async ({ client, message, args }) => {
        message.reply("Nothing to see yet!")
    }
}