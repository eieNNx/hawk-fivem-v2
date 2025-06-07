const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const { banhammer } = require("../config.js");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kilitle")
        .setDMPermission(false)
        .setDescription("Kanalı Kilitler."),





        run: async (client, interaction, args, message) => {

          let sunucuiconurl = config.sunucuiconurl
          let banhammer = config.banhammer
          let renk = config.renk
          
          
          const yetkinyok = new EmbedBuilder()
          .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
          .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
          .setThumbnail(config.sunucuiconurl)
          .setTimestamp()
          .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
          .setColor(config.renk);

          await interaction.deferReply()
  
          if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok] });


            if (!interaction.channel.permissionsFor(config.kayıtsızüyepermi).has("SendMessages") && interaction.channel.permissionsFor(client.user.id).has("SendMessages")) {



     
                const ticket2 = new EmbedBuilder()
                .setColor(renk)
                .setTitle(`#${interaction.channel} Kanalı Zaten Kilitli Durumda!`)
                .setDescription(`Kilidi Kaldırmak İçin => \`/kilitaç\` Komudu Kullan!`)
                .setTimestamp()
                .setFooter({text: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})
          

                interaction.editReply({embeds: [ticket2]})

        
              }
        
              interaction.channel.permissionOverwrites.edit(config.kayıtsızüyepermi, {
                SendMessages: false,
              });
        
              interaction.channel.permissionOverwrites.edit(client.user.id, {
                SendMessages: true,
              });
        
              const ticket = new EmbedBuilder()
              .setColor(renk)
              .setTitle(`${interaction.channel} Kanalı Başaryıla Kilitlendi!`)
              .setDescription(`Kilidi Kaldırmak İçin => \`/kilitaç\` Komudu Kullan!`)
              .setTimestamp()
              .setFooter({text: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})
        

              interaction.editReply({embeds: [ticket]})
              
        }
         
    }
