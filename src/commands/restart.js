const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const config = require("../config.js");
const resimSchema = require("../models/resimSchema.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("restart")
    .setDMPermission(false)
    .setDescription("Fivem Restart Mesajı Gönderir!")
    .addStringOption(option =>
        option.setName("saat")
            .setDescription("20:30 Formatında Yazınız.")
            .setRequired(true)
    ),

    run: async (client, interaction) => {

        let sunucuiconurl = config.sunucuiconurl
        let sunucubanner = config.sunucubanner
        let banhammer = config.banhammer
        let renk = config.renk
        let emoji = config.emoji
        let fivemlink = config.fivemlink
        let sunucuip = config.sunucuip


        var serverIcon = interaction.guild.iconURL({dynamic: true});
        const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
  
        if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
        let saat = interaction.options.getString("saat");

        if (!/^[0-9:.]+$/.test(saat)) {
            return interaction.reply({content: `> **${interaction.member} Sadece Sayıları ve Özel Harfleri Kullanabilirsin.**\n\n**__Örnek Kullanım:__ 23:00**`, ephemeral: true})
        }

        const resimLogs = await resimSchema.find({});
        const restart = resimLogs.map(resimLogs => resimLogs.restart).join(', ')

  
      const embed = new EmbedBuilder()
.setColor(renk)
.setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTitle(`> Restart Saati: __${saat}__ \`❗\``)
.setDescription(`\`\`\`Server IP : ${sunucuip}\`\`\``)
.setFooter({text: `Komut ${interaction.member.displayName} Tarafından Kullanıldı.`})
.setTimestamp()

if(restart) embed.setImage(restart)
else {
  return interaction.reply({content: `> **Restart Resim Linki Eklenmemiş \`❗\` Eklemek İçin => \`/resimseç\` Komutunu Kullan.**`})
}

interaction.reply({content: "**Başarıyla Restart Mesajını Gönderdim!**", ephemeral: true})
interaction.channel.send({ content: "**||@everyone|| & ||@here||**",
embeds: [embed]
});

    }
 };
