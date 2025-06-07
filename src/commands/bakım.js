const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const config = require("../config.js");
const resimSchema = require("../models/resimSchema.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bakım")
    .setDMPermission(false)
    .setDescription("Fivem Bakım Mesajı Gönderir!"),

    run: async (client, interaction) => {
      let sunucuiconurl = config.sunucuiconurl
      let sunucubanner = config.sunucubanner
      let banhammer = config.banhammer
      let renk = config.renk
      let emoji = config.emoji
      let fivemlink = config.fivemlink
      let sunucuip = config.sunucuip


      const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

      if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

      const resimLogs = await resimSchema.find({});
      const bakım = resimLogs.map(resimLogs => resimLogs.bakım).join(', ')


      const embed = new EmbedBuilder()
.setColor(renk)
.setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTitle("> Sunucu Bakımdadır. Anlayışınız İçin Teşekkür Ederiz \`❗\`")
.setFooter({text: `Komut ${interaction.member.displayName} Tarafından Kullanıldı.`})
.setTimestamp()

if(bakım) embed.setImage(bakım)
else {
  return interaction.reply({content: `> **Bakım Resim Linki Eklenmemiş \`❗\` Eklemek İçin => \`/resimseç\` Komutunu Kullan.**`})
}

const embed3 = new EmbedBuilder()
.setColor(renk)
.setDescription("> **Başarıyla Bakım Mesajını Gönderdim!**")
.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTimestamp()

interaction.reply({embeds: [embed3], ephemeral: true})
interaction.channel.send({ content: "**||@everyone|| & ||@here||**",
embeds: [embed]
});

    }
 };
