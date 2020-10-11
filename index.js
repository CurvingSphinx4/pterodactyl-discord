const nodeactyl = require('nodeactyl')
const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const quickdb = require('quick.db')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
bot.prefix = config.prefix
bot.color = config.color
bot.nodeApplication = nodeactyl.Application
bot.nodeClient = nodeactyl.Client
bot.db = require('./extra/db-helper.js')
fs.readdir('./commands', (err, files) => {
    if (err) console.error(err)
    let jsfiles = files.filter(file => file.split(".").pop() === 'js')
    if (!jsfiles || jsfiles.legnth <= 0) console.log(`No commands found!`)
    jsfiles.forEach((file, i) => {
        let props = require(`./commands/${file}`)
        if (props.run && props.help.name) {
            bot.commands.set(props.help.name, props)
            if (props.help.aliases && Array.isArray(props.help.aliases)) {
                props.help.aliases.forEach(alias => {
                    bot.aliases.set(alias, props.help.name)
                    console.log(`Loaded alias '${alias}' for command ${props.help.name}`)
                })
            }
            console.log(`${i+1}: Loaded command '${props.help.name}'`)
        } else {
            console.log(`Something is missing for file '${file}'!`)
        }
    })
})
fs.readdir("./events/", (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let required = require(`./events/${file}`)
        let eventFunc = required.run;
        let eventName = required.name;
        bot.on(eventName, (...args) => eventFunc(bot, ...args));
    });
});

bot.login(config.token)