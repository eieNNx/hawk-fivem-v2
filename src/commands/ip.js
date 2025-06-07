const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const Discord = require("discord.js"); 
const fetch = require('node-fetch'); // Emoji'yi indirmek için fetch kütüphanesini kullanın
const {MessageActionRow, MessageButton} = require("discord.js")
const config = require("../config.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("ip")
    .setDMPermission(false)
    .setDescription("Sunucu İp Bilgilerini Gösterir."),

    run: async (client, interaction) => {

      await interaction.deferReply({ephemeral: true})

      let sunucuiconurl = config.sunucuiconurl
      let sunucubanner = config.sunucubanner
      let renk = config.renk
      let emoji = config.emoji
      let fivemlink = config.fivemlink
      let sunucuip = config.sunucuip

      const embed = new EmbedBuilder()
.setColor(renk)
.setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTitle(`> ${interaction.guild.name} Server IP Bilgi:`)
.setDescription(`\`\`\`Server IP : ${sunucuip}\`\`\``)
.setImage(`${sunucubanner}`)
.setTimestamp()
const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setLabel('Sunucuya Bağlan')
.setURL(fivemlink)
.setEmoji(emoji)
.setStyle(ButtonStyle.Link)
.setDisabled(false),

);
await interaction.editReply({
embeds: [embed], components: [row], ephemeral: true
});

    }
 };
