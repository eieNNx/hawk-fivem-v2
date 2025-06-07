const {ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, PermissionsBitField} = require('discord.js');
const config = require("../config.js");
const KayıtlıHex = require('../models/kayıtlıhexschema.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName("üyeinfo")
    .setDMPermission(false)
    .setType(ApplicationCommandType.User),

        run: async (client, interaction) => {

            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
    
            if(!interaction.member.roles.cache.get(`${config.yetkiliekibi}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
  

            const target = await interaction.guild.members.fetch(interaction.targetId)

            const hex2 = await KayıtlıHex.findOne({ discordId: target.id });

            let hex = ""
            if(!hex2) {
                hex = `**Hex:** \`Bulunumadı\` \`❌\``
            }
            else
            {
                hex = `**Hex:** \`${hex2.kayıtlıhex}\` \`✅\``
            }

            const embed = new EmbedBuilder()
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription(`**ID:** ${target.user.id} \n\n **Rolleri:** ${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "Rolleri Yok."} \n\n **Sunucuya Giriş Tarihi:** <t:${parseInt(target.joinedTimestamp / 1000)}:R> \n\n**Hex Bilgisi:** ${hex} \n\n **Hesap Oluşturma Tarihi:** <t:${parseInt(target.user.createdTimestamp / 1000)}:R>  `)
            .setAuthor({name: `Hawk Development`, iconURL: `${target.guild.iconURL()}`})
            .setFooter({text: `Hawk Development`, iconURL: `${target.guild.iconURL()}`})
            .setTimestamp()
            .setColor('NotQuiteBlack')
        
        await interaction.reply({embeds: [embed], ephemeral: true})
        
        }
    }
