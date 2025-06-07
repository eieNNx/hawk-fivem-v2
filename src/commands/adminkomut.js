const { EmbedBuilder,ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, PermissionsBitField, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("adminkomut")
    .setDMPermission(false)
    .setDescription("Sunucuda Ki Admin Komutlarını Gösterir!"),
    run: async (client, interaction) => {
      const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('itemkodları')
              .setLabel('İtem Komutları')
              .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
              .setCustomId('adminkodları')
              .setLabel('Admin Komutları')
              .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
              .setCustomId('meslekkodları')
              .setLabel('Meslek Kodları')
              .setStyle(ButtonStyle.Secondary),
              )
      

              let banhammer = config.yetkiliekibi
              const yetkinyok = new EmbedBuilder()
              .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
              .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
              .setThumbnail(config.sunucuiconurl)
              .setTimestamp()
              .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
              .setColor(config.renk);
        
              if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

              
  let sunucuiconurl = config.sunucuiconurl

        let adminkodları = new EmbedBuilder()
        .setColor("BLACK")
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setThumbnail(`${sunucuiconurl}`)
        .setTimestamp()
        .setDescription(`> \`\`\`Merhaba, Fivem Komutları Kısmına Hoşgeldin.\`\`\`\n> \n> **Komutları Görmek İçin Aşağıdan Görmek İstediğin Butona Bas!**`)

   


          
      
          await interaction.reply({ components: [row], embeds: [adminkodları], ephemeral: true}) 

         
       

        


        }            
  

          

        }            
  


        


          


