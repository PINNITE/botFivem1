exports.run = (client, message, args) => {
    const Discord = require("discord.js")
    var crypto = require("crypto");
    var fs = require('fs');
    var mongodb = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    let rola = message.guild.roles.cache.find(role => role.name === "owner").id
    if(message.member.roles.cache.has(rola)) {
      if(!args[0]) {
        message.channel.send("❌ | Musisz podać ip serwera")
        return
      }
      if(!args[1]) {
        message.channel.send("❌ | musisz podać date ważności klucza (trial|month|lifetime)")
        return
      }
             var id = crypto.randomBytes(12).toString('hex');
mongodb.connect(url, function(err, db) {
  if (err) {
    console.error('Wystąpił błąd z bazą: ' + err.stack);
    message.channel.send("❌ | Wystąpił błąd z połączeniem MySQL")
    return;
  }
  var dbo = db.db("keys")
  var dt = new Date()
  if(args[1].toLowerCase() === "trial") {
    dt.setDate( dt.getDate() + 2)
  }
  if(args[1].toLowerCase() === "month") {
    dt.setDate( dt.getDate() + 30)
  }
  if(args[1].toLowerCase() === "lifetime") {
    dt = "lifetime"
  }
  dbo.collection("keys").createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
  var myobj = { klucz: `${id}`, ip: `${args[0]}`, "expireAt": dt};
  dbo.collection("keys").insertOne(myobj, function(err, res) {
    if (err) throw err;
    db.close();
  });
});

        let embed = new Discord.MessageEmbed()
        .setTitle("Klucze.")
        .setDescription(`Klucz: **${id}**`)
        .setTimestamp()
        .setColor("#22ff00")
        .setFooter("✅ | Utworzono klucz")
        message.channel.send(embed)
    } else {
        message.channel.send("❌ | Brak permisji").catch(console.error);
 
    }
}