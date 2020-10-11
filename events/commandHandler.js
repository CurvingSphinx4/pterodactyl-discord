module.exports = {
    name: "message",
    run: (bot, message) => {
        if (message.author.bot || message.channel.type !== 'text') return
        const prefix = bot.prefix
        const messageArray = message.content.split(/ +/)
        const command = messageArray[0].slice(prefix.length)
        const args = messageArray.slice(1)
        if (!message.content.startsWith(prefix)) return
        bot.HOST = bot.db.tables.hosts.get(message.author.id) || ''
        let commandfile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
        if (commandfile) commandfile.run(bot, message, args)
    }
}