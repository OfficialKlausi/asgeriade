const fs = require('fs');
const discord = require('discord.js');
require('discord-inline-reply')
const colors = require('colors')
const randomPuppy = require('random-puppy')





const client = new discord.Client({disableEveryone: true});
require('discord-buttons')(client)

client.config = require('./config/bot');
client.commands = new discord.Collection();


fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
         client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

client.on("ready", () =>{

    client.user.setActivity(`Asgeria.de | ${client.users.cache.size} Member` , {type:"PLAYING"});
  });

client.on("message", function(message) {
  if(message.content.startsWith('https://discord.gg/')) {
    message.delete()
    message.channel.send(`<@${message.author.id}>, Bitte sende keine Server Einladungen!`)
  }
})

client.on("guildMemberAdd", function(member) {
  let channel = member.guild.channels.cache.find(ch => ch.name === "welcomes-and-leaves");
  const welcome = new Discord.MessageEmbed()
  .setTitle("Willkommen!")
  .setDescription(`<@${member.id}> ist dem Server beigetreten! `)
  .setFooter("Herzlich Willkommen!")
  .setTimestamp()
  channel.send(welcome)

  const hello = new Discord.MessageEmbed()
  .setTitle("Herzlich willkommen bei Asgeria.de!")
  .setDescription("Herzlich Willkommen bei Asgeria.de! Um zugriff auf unsere Öffentlichen Sprach- und Textkanälen zu bekommen, bitten wir dich, unsere <#628165241481461760> durchzulesen! ")
  .setFooter("Mein Prefix ist -> a!")
  member.send(hello)
})

client.login(client.config.discord.token);
