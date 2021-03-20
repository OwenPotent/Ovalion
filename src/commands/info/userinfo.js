const { MessageEmbed } = require('discord.js');
const moment = require("moment")

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {

    guildOnly: true,

    name: 'userinfo',
    commands: ['userinfo', 'ui', 'uinfo'],
    aliases: ['ui', 'uinfo'],
    description: "Checks a user's info in the server",

    // requiredPermissions: [''],
    cooldown: "5s",
    category: "Info",

    expectedArgs: "<Target user's @>",

    minArgs: 0,
    maxArgs: 1,

    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { guild, member, channel, mentions } = message
        const user = message.member.user
        const target = mentions.members.first()
        
        try {
        
            const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
            const roles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);
            const userFlags = member.user.flags.toArray();
            const embed = new MessageEmbed()
                .setTitle(`**${member.user.username}**'s information`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(member.displayHexColor || '#5c5c5c')
                .addFields(
                    {
                        name: `**Username:**`,
                        value: `${member.user.username}`,
                        inline: true
                    },
                    {
                        name: `**Discriminator:**`,
                        value: `#${member.user.discriminator}`,
                        inline: true
                    },
                    {
                        name: `ID:`,
                        value: `${member.id}`,
                        inline: true
                    },
                    {
                        name: `HypeSquad:`,
                        value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                        inline: true
                    },
                    {
                        name: `Status:`,
                        value: `${member.user.presence.status}`,
                        inline: true
                    },
                    {
                        name: `Game activity:`,
                        value: ` ${member.user.presence.game || 'Not playing a game.'}`,
                        inline: true
                    },
                    {
                        name: `Account created:`,
                        value: `${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')}, ${moment(member.user.createdTimestamp).fromNow()}`,
                        inline: true
                    },
                    {
                        name: '\u200b',
                        value: '**Server information**',
                        inline: false,
                    },
                )
                .addFields(
                    {
                        name: `Server join date:`,
                        value: `${moment(member.joinedAt).format('LL LTS')}`,
                    },
                    {
                        name: `Highest Role:`,
                        value: `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                        inline: true
                    },
                    {
                        name: `Roles [${roles.length}]:`,
                        value: `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
                        inline: true
                    }
                )
                .setFooter(`Requested by: ${message.author.username}`, user.displayAvatarURL())
                .setTimestamp()

            const sendEmbed = await message.channel.send(embed);

        } catch (err) {
            console.log('uwu I have a fucky err: ' + err)
            message.channel.send('uwu I have a fucky err: ' + err)
        }
  },
};