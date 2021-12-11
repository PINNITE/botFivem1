exports.run = (client, message, args) => {
    const Discord = require("discord.js")
    var crypto = require("crypto");
    var fs = require('fs');
    var mongodb = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    let rola = message.guild.roles.cache.find(role => role.name === "owner").id
    if(message.member.roles.cache.has(rola)) {
             var id = crypto.randomBytes(12).toString('hex');
mongodb.connect(url, function(err, db) {
  if (err) {
    console.error('Wystąpił błąd z bazą: ' + err.stack);
    message.channel.send("❌ | Wystąpił błąd z połączeniem MySQL")
    return;
  }
  var dbo = db.db("keys")
  dbo.collection("keys").find().toArray().then(klucze => {
      let keys = ""
      let ips = ""
      let data = ""
      klucze.forEach(klucz => {
          keys += `${klucz.klucz.toString()}\n`
          ips += `${klucz.ip.toString()}\n`
          if(klucz.expireAt === "lifetime"){
              data += "lifetime\n"
              return
          } else {
          data +=`${klucz.expireAt.getDate()}/${klucz.expireAt.getMonth() + 1}/${klucz.expireAt.getFullYear()} ${klucz.expireAt.getHours()}:${klucz.expireAt.getMinutes()}\n`
          }
  })
  let embed = new Discord.MessageEmbed()
  .setTitle("Klucze.")
  .addField("Klucz", `${keys}`, true)
  .addField("IP serwera", `${ips}`, true)
  .addField("Data wygaśnięcia", `${data}`, true)
  .setTimestamp()
  .setColor("#00a1f7")
  message.channel.send(embed)
})
  
    })
 } else {
        message.channel.send("❌ | Brak permisji").catch(console.error);
 
    }
}