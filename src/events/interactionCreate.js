const { EmbedBuilder, InteractionType, ChannelType, ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../config.js");

let sunucuismi = config.sunucuismi
let sunucuiconurl = config.sunucuiconurl

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
  let client = interaction.client;
   if (interaction.type == InteractionType.ApplicationCommand) {
   if(interaction.user.bot) return;

if(!interaction) return interaction.reply(`**904'e Söyle Bir Sorun Oluştu!**`)

   if (interaction.channel.type === 1) {

    return interaction.reply({
      embeds: [new Discord.EmbedBuilder()
        .setAuthor({name: `${sunucuismi}`, iconURL: `${sunucuiconurl}` })
        .setColor("#080707")
        .setDescription(`> **Slash Komutlarımı DM Üzerinden Kullanamazsın :)**`)
        .setTimestamp()
        .setFooter({text: `${sunucuismi}`, iconURL: `${sunucuiconurl}` })

      ],
      ephemeral: true
    })
  }


	readdirSync('./src/commands').forEach(file => {
        const command = require(`../../src/commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
}
  }}
