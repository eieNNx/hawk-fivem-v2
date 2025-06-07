const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ChannelType, StringSelectMenuBuilder} = require('discord.js');
const config = require("../config.js");
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("herkesiçek")
    .setDMPermission(false)
    .setDescription("Seste ki Bütün Kullanıcılara Belirttiğiniz Kanala Çekersiniz")
    .addChannelOption(option =>
        option
        .setName("kanal")
        .setDescription("Herkesi Çekmek İstediğiniz Kanal")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName(`kişiler`)
        .setDescription(`Çekilmesi Gereken Kişileri Seçiniz.`)
        .setRequired(true)
        .addChoices({ name: 'Sadece Yetkililer', value: 'yetkili' },{ name: 'Herkes', value: 'herkes' }),

        ),

        run: async (client, interaction) => {

            const kanal = interaction.options.getChannel(`kanal`)
            const category = interaction.options.getString('kişiler');

            const banhammer = config.banhammer;

            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);

        if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


            const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
            .setThumbnail(`https://media.discordapp.net/attachments/837692675511287840/1184801858452197426/904ses.png?ex=658d4bb7&is=657ad6b7&hm=9ffcb6d4c81d2dd6f0f3b1a1d6b750a9925abbfef49e3f549de862cda7428fea&=&format=webp&quality=lossless`)
            .setTimestamp()

            if(category === "yetkili") 
            {

                const kanaldakiler = interaction.guild.members.cache.filter(member => member.voice.channel)
                
                    kanaldakiler.forEach(member => {
                        if(!member.roles.cache.get(`${config.yetkiliekibi}`)) return;
                        member.voice.setChannel(kanal)
                          .catch(console.error);
                      });
                
                      embed.setDescription(`> **Bütün Yetkililer Başarıyla ${kanal} Adlı Sesli Kanala Çekildi!**`)
                interaction.reply({embeds: [embed]})
            }

            if(category === "herkes")
            {

                const kanaldakiler = interaction.guild.members.cache.filter(member => member.voice.channel)
                
                    kanaldakiler.forEach(member => {
                        member.voice.setChannel(kanal)
                          .catch(console.error);
                      });

                      embed.setDescription(`> **Herkes Başarıyla ${kanal} Adlı Sesli Kanala Çekildi!**`)
                      interaction.reply({embeds: [embed]})
            }


      }
    }