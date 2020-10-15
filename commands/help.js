let {RichEmbed} = require('discord.js')
module.exports = {
    help: {
        name: 'help',
        aliases: ['?']
    },
    run: async (bot, message, args) => {
        let botAuthor = await bot.fetchUser('511511769034784768')
        let HelpEmbed = new RichEmbed()
        .setTitle('Help')
        .setColor(bot.color)
        .addField(`Commands`, `${bot.prefix}help - Shows this embed
        ${bot.prefix}login - Sets your api token and host
        ${bot.prefix}unlogin - Removes your token and host from the database
        ${bot.prefix}start <serverid>- Starts the server
        ${bot.prefix}stop <serverid> - Stops the server
        ${bot.prefix}restart <serverid> - Restarts the server
        ${bot.prefix}kill <serverid> - Kills the server
        ${bot.prefix}sendcommand <serverid> <command> - Sends a command to the server
        ${bot.prefix}servers - Shows your servers
        ${bot.prefix}serverinfo <serverid> - Shows info about the server`)
        .setFooter(`Bot made by ${botAuthor.tag}`)
        .setTimestamp()
        message.channel.send(HelpEmbed)
    }
}
