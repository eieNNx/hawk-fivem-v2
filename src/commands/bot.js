const { EmbedBuilder,ActionRowBuilder, ButtonBuilder, PermissionFlagsBits,ActivityType, PermissionsBitField, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bot")
    .setDMPermission(false)
    .setDescription("Botun, Profil, Durum ve İsmini Değiştirirsiniz.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addAttachmentOption(option =>
      option.setName("profilresim")
          .setDescription("Ekip Log Kanalını Belirtir.")
  )
  .addStringOption(option =>
    option.setName("botisim")
        .setDescription("Ekip Log Kanalını Belirtir.")
)
.addStringOption(option =>
  option.setName("durum")
      .setDescription("Ekip Log Kanalını Belirtir.")
),



    run: async (client, interaction) => {
      
      const attachment = interaction.options.getAttachment('profilresim')
      const botisim = await interaction.options.getString('botisim');
      const durum = await interaction.options.getString('durum');



      let banhammer = config.banhammer
      const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin Yönetici Olman Gerek!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

      if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

      await interaction.deferReply();

      const embed = new EmbedBuilder()
      .setAuthor({name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
      .setTimestamp()




      let mesaj2 = ""

      if(attachment) 
      {
        try {
          const url = attachment.url
          await client.user.setAvatar(url)
          mesaj2+= `> **Yüklediğiniz Avatar Başarıyla Ayarlandı! \`✅\`**\n\n`

        } catch (error) {
          return interaction.editReply(`Avatar değiştirilirken bir hata oluştu. \`❌\``);

        }


      }

      if(botisim) 
      {

        try {
          await client.user.setUsername(botisim);
          mesaj2+= `> **Belirttiğiniz \`${botisim}\` Başarıyla İsim Olarak Ayarlandı!.** \`✅\`\n\n`

        } catch (error) {
          console.log(error)
          return interaction.editReply(`Kullanıcı adı değiştirilirken bir hata oluştu. \`❌\``);

        }

      }

      if(durum) 
      {

        try {
        
          client.user.setActivity(`${durum}`, {
            type: ActivityType.Playing,
          });
          mesaj2+= `> **Belirttiğiniz \`${durum}\` Başarıyla Durum Olarak Ayarlandı!.** \`✅\`\n\n`

            } catch (error) {
          return interaction.editReply("Durum değiştirilirken bir hata oluştu. \`❌\`");
        }

      }
      embed.setDescription(mesaj2)

      await interaction.editReply({embeds: [embed]});


        }         
      }    
  


        


          


