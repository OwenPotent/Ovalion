const { MessageEmbed } = require('discord.js');

module.exports = {

    guildOnly: true,

    name: 'clear',
    commands: ['clear'],
    aliases: ['delete', 'del', 'purge', 'c'],
    description: 'Deletes messages in a channel',

    requiredPermissions: ['MANAGE_MESSAGES'],
    cooldown: '5s',
    category: 'Moderation',

    expectedArgs: "<Number from 1-100>",

    minArgs: 1,
    maxArgs: 1,
    
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { guild, member, channel, mentions } = message
        const user = message.member.user
        const target = mentions.members.first()
        const number = args.join(' ')

        try {

            if(!number) {
                const naw = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`❎ ${user.username}, you did not specify the amount of number you wish to clear!`)
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                .setTimestamp()
                .setColor(`#ff3d3d`)
                message.channel.send(naw)
            } else {
            if(isNaN(number)) {
                    const notanumber = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`❎ ${user.username}, that is not a number, please try again!`)
                    .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                    .setColor(`#ff3d3d`)
                    .setTimestamp()
                    message.channel.send(notanumber)
            } else {
                if(number > 100) {
                    const loldont = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`❎ ${user.username}, that is a high amount of numbers, please reduce it to below 100 messages!`)
                    .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                    .setColor(`#ff3d3d`)
                    .setTimestamp()
                    message.channel.send(loldont)
                } else {
                    if(number < 1) {
                        const megobruhnow = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`❎ ${user.username}, you must clear atleast 1 message!`)
                    .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                    .setColor(`#ff3d3d`)
                    .setTimestamp()
                    message.channel.send(megobruhnow)
                    } else {
                    const awaits = await message.channel.bulkDelete(number)
                    const done = new MessageEmbed()
                    .setTitle('Success!')
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`✅ ${user.username}, I have deleted ${awaits.size} messages`)
                    .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                    .setColor(`#3cf05a`)
                    .setTimestamp()
                    message.channel.send(done).then(sent => sent.delete({ timeout: 5000 }))
                    }
                }
            }
            }
        } catch (err) {
            console.log('An error occured: ' + err)
            message.channel.send('An error occured: ' + err)
        }
    }
}