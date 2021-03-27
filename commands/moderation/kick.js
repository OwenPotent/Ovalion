const { MessageEmbed } = require('discord.js')

module.exports = {

    guildOnly: true,

    name: 'kick',
    commands: ['kick'],
    aliases: [''],
    description: "Kicks a member from the discord serve",

    requiredPermissions: ['KICK_MEMBERS'],
    cooldown: "5s",
    category: "Moderation",

    expectedArgs: "<Target user's @>",

    minArgs: 1,
    maxArgs: 1,

    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { guild, channel, mentions } = message
        const user = message.member.user

        try {

            const target = mentions.members.first()
            if (!target) {
              const no = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`❎ ${user.username}, please specify someone to kick`)
                .setColor(`#ff3d3d`)
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                .setTimestamp()
                message.channel.send(no)
              return
            }

            const member = guild.members.cache.get(target.id)
            if (member.kickable) {
              member.kick()
              const YAS = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`✅ ${user.username}, ${member.user.tag} has been kicked from the server!`)
                .setColor(`#3cf05a`)
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                .setTimestamp()
                message.channel.send(YAS)
            } else {
              const NOOO = new MessageEmbed()
              .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
              .setDescription(`❎ ${user.username}, I can't kick that user!`)
              .setFooter('Please check if I have the "KICK_MEMBERS" permission')
              .setColor(`#ff3d3d`)
              .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
              .setTimestamp()
              message.channel.send(NOOO)
            }

        } catch (err) {
            console.log('An error occured: ' + err)
            message.channel.send('An error occured: ' + err)
        }

    }

}