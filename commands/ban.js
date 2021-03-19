const Discord = require('discord.js')

module.exports = {
    category: "Moderation",
    expectedArgs: "<userID/Mention>",
    callback: async ({ client, message, args }) => {
        message.reply("Nothing to see yet!")
    }
}