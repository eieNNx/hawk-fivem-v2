const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const config = require("../config.js");
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("toplusesrolver")
    .setDMPermission(false)
    .setDescription("Seste ki Bütün Kullanıcılara Belirttiğiniz Rolü Tek Seferde Verir.")
    .addRoleOption(option =>
        option
        .setName("rol")
        .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
        .setRequired(true)
   ),



        run: async (client, interaction) => {
       

          const yetkinyok = new EmbedBuilder()
          .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
          .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
          .setThumbnail(config.sunucuiconurl)
          .setTimestamp()
          .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
          .setColor(config.renk);
  
          if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

           
            let yetkiliekibi = config.yetkiliekibi

        const muratrole = interaction.options.getRole("rol")
        const member = interaction.guild.members.cache.get(interaction.member.id);


            if (!member || !member.voice.channel) 
              return interaction.reply({ content: `> **Bu Komutu Kullanabilmek İçin Sesli Bir Kanalda Olmanız Gerekiyor.**`, ephemeral: true});          
            


            const voiceChannel = member.voice.channel;
            const embed = new EmbedBuilder();
            
    let usersWithRole = '';
            voiceChannel.members.forEach(async (memberInChannel) => {
              try {
                 const rol = memberInChannel.roles.cache.get(`${yetkiliekibi}`)

                if(rol)
                {
                    console.log(`Toplurol Bu Kullanıcıya Verilmedi. : ${memberInChannel.user.tag}`);
                    return
                }
                else
                 {
                   usersWithRole += `> • ${memberInChannel.user}\n`;
                    await memberInChannel.roles.add(`${muratrole.id}`);
                    console.log(`Rol verildi: ${memberInChannel.user.tag}`);

                }

                if (usersWithRole !== '') {
                  embed.setTitle(`Ses Odasında Ki Herkese Rol Verildi!`)
                  embed.setDescription(`> **Verilen Rol:** ${muratrole}\n\n**Rol Verilen Kullanıcılar:**\n\n${usersWithRole}`);
                } 

                await interaction.reply({embeds: [embed]})
  

              } catch (error) {
              }
            });

           


        }
      }