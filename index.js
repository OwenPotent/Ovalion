const Discord = require('discord.js')
const WOKcommands = require('wokcommands')


const { botOwner, defaultPrefix, defaultColor, testServer } = require('./configurations/config.json')
require('dotenv').config();

const client = new Discord.Client()

const disabledDefaultCommands = [
    'prefix',
    'requiredrole'
  ]

client.on('ready', () => {
    new WOKcommands (client, {
        commandsDir: 'commands',
        testServers: `${testServer}`,
        showWarns: false,
        disabledDefaultCommands
    })

    .setBotOwner(botOwner)
    .setDefaultPrefix(defaultPrefix)
    .setColor(defaultColor)

    .setCategorySettings([
        {
          name: 'Fun',
          emoji: '🎮'
        },
        {
          name: 'Moderation',
          emoji: '⚒️'
        },
        {
          name: 'Utility',
          emoji: '🔧'
        },
        {
          name: 'Configuration',
          emoji: '🚧',
          hidden: true
        },
    ])

    console.log(`${client.user.tag} is ready!`)
})

client.login(process.env.TOKEN)
