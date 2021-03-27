// Import modules
const Discord = require('discord.js')
const WOKcommands = require('wokcommands')

// Import enviromental and configuration files
const { botOwner, defaultPrefix, defaultColor, testServer, guildID } = require('./configurations/config.json')
require('dotenv').config();

// API feature for slash commands to get all commands from the current guild ID
// Guild ID can be found in the "config.json" file
const getApp = (guildID) => {
  const app = client.api.applications(client.user.id)

  if (guildID) {
      app.guilds(guildID)
  }

  return app
}

// Create new client from discord.js
const client = new Discord.Client()

// Disable default wokcommands

// Default commands are help, prefix, requiredrole, command, language

const disabledDefaultCommands = [
    'requiredrole',
  ]

// Client on ready event
client.on('ready', async () => {
    new WOKcommands (client, {
        commandsDir: 'commands',
        testServers: [testServer],
        showWarns: false,
        disabledDefaultCommands
    })
    // sets MongoDB path ("MONGO_URI" can be found in the ".env" file)
    .setMongoPath(process.env.MONGO_URI)

    // sets Bot's owner ("botOwner" can be found in "config.json" file)
    .setBotOwner(botOwner)

    // sets the default prefix for the bot("defaultPrefix" is set to "!" by default)
    // You can change the prefix in the "config.json" file
    .setDefaultPrefix(defaultPrefix)

    // sets embed color (can be color hex or names such as "RED, ORANGE, BLACK")
    // color hex examples can be found in "config.json" file
    .setColor(defaultColor)



    // This is a slight more advanced thing, its to set your emoji and name for each category
    // All command files in the "commands" folder and subfolders must contain a category for the built-in help command by WOKcommands

    // Example:
    //  module.exports = {
    //      name: "command name",
    //      description: "command description",
    //   => category: "command category(Example: "Moderation", "Utility", etc.)"
    // Other modules and commands go here..}

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
        {
          name: 'Info',
          emoji: '📔'
        },
    ])

    /** 
     * Get all slash commands from the bot
    */

    // const commands = await getApp(guildID).commands.get()
    // console.log(commands)

    /**
     * Deletes any slash command with the ID
     */

    // await getApp(guildID).commands('').delete()


    console.log(`${client.user.tag} is ready!`)
})

// Login to the client
client.login(process.env.TOKEN)



