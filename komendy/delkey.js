exports.run = (client, message, args) => {
    const Discord = require("discord.js")
    var crypto = require("crypto");
    var fs = require('fs');
    var mongodb = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    let rola = message.guild.roles.cache.find(role => role.name === "owner").id
    if(message.member.roles.cache.has(rola)) {
mongodb.connect(url, function(err, db) {
  if (err) {
    console.error('Wystąpił błąd z bazą: ' + err.stack);
    message.channel.send("❌ | Wystąpił błąd z połączeniem bazy danych")
    return;
  }
  var dbo = db.db("keys")
  var key = { klucz: `${args[0]}` }
  dbo.collection("keys").deleteOne(key, function(err, obj) {
    if (err) throw err;
    db.close();
  });
  });

        let embed = new Discord.MessageEmbed()
        .setTitle("Klucze.")
        .setDescription(`Usunięto klucz: **${args[0]}**`)
        .setTimestamp()
        .setColor("#fc2a00")
        .setFooter("✅ | Usunięto klucz")
        message.channel.send(embed)
    } else {
        message.channel.send("❌ | Brak permisji").catch(console.error);
 
    }
}