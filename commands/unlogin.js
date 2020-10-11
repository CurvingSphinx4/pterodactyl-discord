module.exports = {
    help: {
        name: 'unlogin',
        aliases: ['unsettoken']
    },
    run: async (bot, message, args) => {
        bot.db.tables.tokens.delete(message.author.id)
        bot.db.tables.hosts.delete(message.author.id)
        message.channel.send({embed:{
            description: `Removed your token and host from the database!`,
            color: bot.color
        }})
    }
}