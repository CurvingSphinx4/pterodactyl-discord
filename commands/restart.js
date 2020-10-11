const {
    RichEmbed
} = require('discord.js')
module.exports = {
    help: {
        name: 'restart',
        aliases: ['restartserver']
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
                    description: `Usage: ${bot.prefix}restart <serverid>`,
                    color: bot.color
                }
            })
            return
        }
        let msg = await message.channel.send({
            embed: {
                description: `Restarting the server!`,
                color: bot.color
            }
        })
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
        if(status==='stopping' || status==='off') {
            msg.edit({
                embed: {
                    description: `Server is not on!`,
                    color: bot.color
                }
            })
            return
        }
        bot.nodeClient.restartServer(id).then((response) => {
            msg.edit({
                embed: {
                    description: response,
                    color: bot.color
                }
            })
         }).catch((error) => {
             console.log(error);
         });
    }
}