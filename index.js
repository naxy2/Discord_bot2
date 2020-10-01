require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client();
const symbol = process.env.symbol;

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});


var challenges = [];    //{ID_target: ID_sfidante}

bot.on('message', msg => {
    let messaggio = msg.content.split(" ");
    let cmd;        //il comando dato al bot
    let params;     //i parametri del comando
    if (messaggio[0][0] === symbol){
        cmd = messaggio[0].slice(1,messaggio[0].length);
        params = messaggio.slice(1,messaggio.length);
    }else{
        return;
    }

    switch (cmd){
        case "challenge":   //evento per sfidare un giocatore
            target = getUserFromMention(params[0]);
            if (!target){   //errore: se non si tagga alcun avversario
                msg.channel.send(new Discord.MessageEmbed()
                .setColor(0xFF0000)
                .setDescription("You must tag a player!")
                );
                return
            }
            if (target == msg.author){  //errore: se si tagga sé stessi
                msg.channel.send(new Discord.MessageEmbed()
                .setColor(0xFF0000)
                .setDescription("You can't challenge yourself!")
                );
                return
            }
            if (target.bot){    //errore: se si tagga un bot
                msg.channel.send(new Discord.MessageEmbed()
                .setColor(0xFF0000)
                .setDescription("You can't challenge a bot!")
                );
                return
            }

            for (i = 0; i<challenges.length; i++){          //se sfido un avversario, rimuovo tutte le mie altre sfide + tutte quelle di chi lo ha sfidato prima
                if (challenge.challenger == msg.author.id || challenge.target == target.id){
                    challenges.splice(i,i)
                    i--;
                }
            }

            challenges.push({
                "challenger": msg.author.id,
                "target": target.id
            })

            console.log(challenges)
            break;
    }
});



bot.login(process.env.token);



function getUserFromMention(mention) {
    if (!mention) return
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
    const id = matches[1];

	return bot.users.cache.get(id);
}