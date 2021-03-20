const Discord = require('discord.js')

module.exports = {
    category: "Moderation",
    expectedArgs: "<userID/Mention> [reason]",
    syntaxError: "Error occured, please try again!",
    requiredPermissions: ["BAN_MEMBERS"],
    callback: async ({ client, message, args }) => {
        message.reply("Nothing to see yet!")
    }
}