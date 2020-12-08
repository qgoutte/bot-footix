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
            let userID = "<@" + message.author.id + ">"
            
            if (args[1].toLowerCase() === "fm21" || args[1].toLowerCase() === "fm20" || args[1].toLowerCase() === "online" ){
                server.channels.create(`${args[0]}-${message.author.username}`).then(channel =>{
                    switch (args[1].toLowerCase()){
                        case "fm21":
                            category = server.channels.cache.find(c => c.name == "FOOTBALL MANAGER 2021 - CARRIERE" && c.type =="category");
                            if (!category) throw new Error("La catégorie n'existe pas");
                            channel.setParent(category.id);
                            message.reply(`Le channel pour ta carrière avec ${args[0]} a bien été crée dans la catégorie ${args[1]}`);
                            channel.send(`${userID} voici ton channel pour ta carrière, bonne chance !`);
                            break;
                        case "fm20":
                            category = server.channels.cache.find(c => c.name == "Football Manager 2020 - Carrières" && c.type =="category");
                            if (!category) throw new Error("La catégorie n'existe pas");
                            channel.setParent(category.id);
                            message.reply(`Le channel pour ta carrière avec ${args[0]} a bien été crée dans la catégorie ${args[1]}`);
                            channel.send(`${userID} voici ton channel pour ta carrière, bonne chance !`);
                            break;
                        case "online":
                            category = server.channels.cache.find(c => c.name == "Carrières en ligne" && c.type =="category");
                            if (!category) throw new Error("La catégorie n'existe pas");
                            channel.setParent(category.id);
                            message.reply(`Le channel pour ta carrière avec ${args[0]} a bien été crée dans la catégorie ${args[1]}`);
                            channel.send(`${userID} voici ton channel pour ta carrière, bonne chance !`);
                            break;
                    } 
                }).catch(console.error);
            }
            else {
                message.reply(`M'enfin, la catégorie que tu veux n'existe pas !!! Il faut que tu choisisse entre FM21, FM20 et ONLINE`);
            }
            
            
        }
    }

    if (command === "dsalon"){
        
        if (args[0] === undefined ){
            message.reply(`Merci de saisir la commande au format suivant : !dsalon as-monaco`);
        }
        else {
            var server = message.guild;
            let channel
            let channelName = args[0] + "-" + message.author.username.toLowerCase(); 

            channel = server.channels.cache.find(c => c.name == channelName)
            if (channel === undefined){
                message.reply(`Tu n'as pas de carrière avec ce club tu ne peux donc pas la supprimer !`);
            }
            else {
                channel.delete()
                message.reply(`Ta carrière ${channelName} a été supprimée`);
            }
            
        }
        
    }

    if (command === "esalon"){
        
        if (args[0] === undefined ){
            message.reply(`Merci de saisir la commande au format suivant : !esalon as-monaco paris-sg`);
        }
        else {
            var server = message.guild;
            let channel
            let channelName = args[0] + "-" + message.author.username.toLowerCase(); 
            let newChannelName = args[1] + "-" + message.author.username.toLowerCase(); 

            channel = server.channels.cache.find(c => c.name == channelName)
            if (channel === undefined){
                message.reply(`Tu n'as pas de carrière avec ce club, tu ne peux donc pas l'éditer !`);
            }
            else {
                channel.edit({name : newChannelName});
                message.reply(`Ta carrière ${channelName} a été modifiée en ${newChannelName}`);
            }
            
        }
        
    }

    if (command === "help"){
        message.reply('Alors ? On se sent perdu petit footballer du dimanche? \n Moi, Footix, je vais t\'aider. Voici ce que je te propose : \n\n' + 
        '- **!csalon <club> <canal>** : Je te crée un salon pour ta nouvelle carrière de coach ! Attention, le nom du club ne doit pas comporter d\'espace mais doit être sous la forme sc-bastia \n\n'+
        '- **!dsalon <club>** : Je supprime le salon de la carrière que tu m\'as désigné. Evidemment tu ne peux supprimer que les tiens ;) Attention, le nom du club ne doit pas comporter d\'espace mais doit être sous la forme sc-bastia \n\n'+
        '- **!esalon <club> <nouveau-club>** : J\'édite le nom du salon de la carrière que tu m\'as désigné. Evidemment tu ne peux éditer que les tiens ;) Attention, le nom du club ne doit pas comporter d\'espace mais doit être sous la forme sc-bastia \n\n'+
        '- **!help** : C\'est ce que tu viens de faire en faite ;). Je te donne la liste de mes fonctions \n\n'+
        '- **!ping** : PONG ! Pardon reflexe, ca te permet de voir le délai entre ta commande et mon retour');
    }

    

})

client.login(config.BOT_TOKEN);