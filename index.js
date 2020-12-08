const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";


client.on("message", function(message){
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;
    
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    
    if (command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Ce message a une latence de ${timeTaken}ms.`);
    }

    if (command === "csalon"){
        if (args[0] === undefined || args[1] === undefined){
            message.reply(`Merci de saisir la commande au format suivant : !csalon as-monaco FM21`);
        }
        else {
            var server = message.guild;
            let category;
            server.channels.create(`${args[0]}-${message.author.username}`).then(channel =>{
                switch (args[1].toLowerCase()){
                    case "fm21":
                        category = server.channels.cache.find(c => c.name == "FOOTBALL MANAGER 2021 - CARRIERE" && c.type =="category");
                        if (!category) throw new Error("La catégorie n'existe pas");
                        channel.setParent(category.id);
                        message.reply(`Le channel pour ta carrière avec ${args[0]} a bien été crée dans la catégorie ${args[1]}`);
                        break;
                    case "fm20":
                        category = server.channels.cache.find(c => c.name == "Football Manager 2020 - Carrières" && c.type =="category");
                        if (!category) throw new Error("La catégorie n'existe pas");
                        channel.setParent(category.id);
                        message.reply(`Le channel pour ta carrière avec ${args[0]} a bien été crée dans la catégorie ${args[1]}`);
                        break;
                    case "online":
                        category = server.channels.cache.find(c => c.name == "Carrières en ligne" && c.type =="category");
                        if (!category) throw new Error("La catégorie n'existe pas");
                        channel.setParent(category.id);
                        message.reply(`Le channel pour ta carrière avec ${args[0]} a bien été crée dans la catégorie ${args[1]}`);
                        break;
                    default :
                    message.reply(`M'enfin, la catégorie que tu veux n'existe pas. Il faut que tu choisisse entre FM21, FM20 et ONLINE`);

                }
                
            }).catch(console.error);
        }
    }

})

client.login(config.BOT_TOKEN);