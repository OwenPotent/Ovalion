const { MessageEmbed } = require('discord.js')

module.exports = {

    guildOnly: true,

    name: 'ban',
    commands: ['ban'],
    aliases: [''],
    description: "Bans a member from the server",

    requiredPermissions: ['BAN_MEMBERS'],
    cooldown: "5s",
    category: "Moderation",

    expectedArgs: "<Target user's @>",

    minArgs: 1,
    maxArgs: 2,

    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { guild, channel, mentions } = message
        const user = message.member.user

        const reason = args[2]

        try {

            const target = mentions.members.first()
            if (!target) {
              const no = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`❎ ${user.username}, you didn't ban anyone..`)
                .setColor(`#ff3d3d`)
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                .setTimestamp()
                message.channel.send(no)
              return
            }

            const member = guild.members.cache.get(target.id)
            if (member.bannable) {
              member.ban(reason)
              const YAS = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`✅ ${user.username}, ${member.user.tag} has been banned from the server!`)
                .setColor(`#3cf05a`)
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                .setTimestamp()
                message.channel.send(YAS)
            } else {
              const NOOO = new MessageEmbed()
              .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
              .setDescription(`❎ ${user.username}, I cant ban that user`)
              .setFooter('Please check if I have the "BAN_MEMBERS" permission')
              .setColor(`#ff3d3d`)
              .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
              .setTimestamp()
              message.channel.send(NOOO)
            }

        } catch (err) {
            console.log('I received an error on the bot: ' + err)
            message.channel.send('It seems like something went wrong..: ' + err)
        }

    }

}