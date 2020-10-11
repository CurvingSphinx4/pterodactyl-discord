module.exports = {
    name: "ready",
    run: (bot) => {
        console.log(`${bot.user.tag} is online in ${bot.guilds.size} servers!`)
        bot.user.setActivity(`${bot.guilds.size} servers`, {type: "WATCHING"})
        setInterval(()=> {
            console.log(`${bot.user.tag} is online in ${bot.guilds.size} servers!`)
            bot.user.setActivity(`${bot.guilds.size} servers`, {type: "WATCHING"})
        },3.6e+6)
    }
}