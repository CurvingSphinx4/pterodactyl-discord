const {
    RichEmbed
} = require('discord.js')
module.exports = {
    help: {
        name: 'sendcommand',
        aliases: ['command']
    },
    run: async (bot, message, args) => {
        let token = bot.db.tables.tokens.get(message.author.id)
        if (!token || token === '') {
            message.channel.send({
                embed: {
                    description: `Please login with ${bot.prefix}login.`,
                    color: 0xff0000
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
        let command = args.slice(1).join(" ")
        if (!id || !command) {
            message.channel.send({
                embed: {
                    description: `Usage: ${bot.prefix}sendcommand <serverid> <command>`,
                    color: 0xff0000
                }
            })
            return
        }
        let msg = await message.channel.send({
            embed: {
                description: `Sending the command!`,
                color: bot.color
            }
        })
        bot.nodeClient.sendCommand(id, command).then((response) => {
            msg.edit({
                embed: {
                    description: response,
                    color: bot.color
                }})
        }).catch((error) => {
            let err = error.response.status
            if (err === 500) {
                msg.edit({
                    embed: {
                        description: `Server with that id is not found!`,
                        color: 0xff0000
                    }
                })
            } else if (err === 412) {
                msg.edit({
                    embed: {
                        description: `Your server is offline!\nTo turn it on use ${bot.prefix}start <id>`,
                        color: 0xff0000
                    }
                })
            }
        });
    }
}