const {
    RichEmbed
} = require('discord.js')
module.exports = {
    help: {
        name: 'serverinfo',
        aliases: ['info']
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
        let id = args[0]
        if (!id) {
            message.channel.send({
                embed: {
                    description: `Usage: ${bot.prefix}serverinfo <serverid>`,
                    color: bot.color
                }
            })
            return
        }
        let msg = await message.channel.send({
            embed: {
                description: `Getting server info!`,
                color: bot.color
            }
        })
        let InfoEmbed = new RichEmbed()
        let status
        try {
            status = await bot.nodeClient.getServerStatus(id)
        } catch (error) {
            let err = error.response.status
            if (err === 500) {
                msg.edit({
                    embed: {
                        description: `Server with that id is not found!`,
                        color: bot.color
                    }
                })
                return
            }
        }
        let info = await bot.nodeClient.getServerInfo(id)
        let isOwner = await bot.nodeClient.isOwner(id)
        let ramUsage = await bot.nodeClient.getRAMUsage(id)
        let cpuUsage = await bot.nodeClient.getCPUUsage(id)
        let diskUsage = await bot.nodeClient.getDiskUsage(id)
        InfoEmbed.setColor(bot.color)
        InfoEmbed.setTitle(`${info.attributes.name} | ${info.attributes.identifier}`)
        InfoEmbed.addField('Description', `${info.attributes.description || 'No description'}`)
        InfoEmbed.addField('Status', status)
        InfoEmbed.addField('Usage', `**Ram**:${ramUsage.current}/${ramUsage.limit}mb\n**CPU**: ${cpuUsage.current}%\n**Disk**: ${diskUsage.current}/${diskUsage.limit}mb`)
        InfoEmbed.addField('Feature Limits', `**Databases**: ${info.attributes.feature_limits.databases}\n**Allocations**: ${info.attributes.feature_limits.allocations}`)
        InfoEmbed.setTimestamp()
        msg.edit(InfoEmbed)
    }
}