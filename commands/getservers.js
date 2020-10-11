const {
    RichEmbed
} = require('discord.js')
module.exports = {
    help: {
        name: 'getservers',
        aliases: ['servers']
    },
    run: async (bot, message, args) => {
        let token = bot.db.tables.tokens.get(message.author.id)
        if (!token || token === '') {
            message.channel.send({
                embed: {
                    description: `Please login with ${bot.prefix}login.`,
                    color: bot.color
                }
            })
            return
        }
        bot.nodeClient.login(bot.HOST, token, (loggedIn, err) => {
            if (loggedIn) {} else {
                return message.channel.send(`There was an error with your token!\nPlease login again!`)
            }
        })
        let msg = await message.channel.send({
            embed: {
                description: `Getting your servers!`,
                color: bot.color
            }
        })
        let ServersEmbed = new RichEmbed()
        ServersEmbed.setColor(bot.color)
        let servers = await bot.nodeClient.getAllServers()
        for (let server of servers) {
            ServersEmbed.addField(`${server.attributes.name}`, `**Info**:\nDescription: ${server.attributes.description || 'No description'}\nID: ${server.attributes.identifier}\nIsOwner: ${server.attributes.server_owner}\n\n**Limits**:\nRam: ${server.attributes.limits.memory}mb\nDisk: ${server.attributes.limits.disk}mb`)
        }
        msg.edit(ServersEmbed)
    }
}