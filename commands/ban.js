module.exports = {
    category: "Moderation",
    expectedArgs: "<userID/Mention>",
    callback: async ({ message, args }) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`You are unable to ban members!`)
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        try {
            await member.ban();
            await message.channel.send(`${member} has been banned!`)
        } catch (e) {
            return message.channel.send(`My apologies, it seems like this user is not in the server..`)
        }
    }
}