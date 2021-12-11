const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let embeda = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .addField(`${message.member.displayName}`, `Odmowa dostępu`)
    .setFooter(`NewStyleRP`)
    .setTimestamp()
    if (!message.member.roles.find("name", "Owner")) return message.channel.send(embeda);
        let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);


}

module.exports.help = {
    name: "say"
}