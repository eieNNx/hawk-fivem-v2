const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, PermissionsBitField, ActionRowBuilder, ButtonStyle, time } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const { yetkiliekibi } = require("../config.js");
const KayıtlıHex = require('../models/kayıtlıhexschema.js');
const config = require("../config.js");
const { Timestamp } = require("mongodb");
const Log = require(`../models/Log.js`)

const db = new QuickDB();
module.exports = {
    data: new SlashCommandBuilder()
    .setName("uyarıver")
    .setDMPermission(false)
    .setDescription("Kişiye Uyarı Verir.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Rol Vericeğiniz Kişiyi Seçiniz.")
    .setRequired(true)
    )
    .addRoleOption(option =>
         option
         .setName("rol")
         .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
         .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName(`sebep`)
        .setDescription(`Sebebini Giriniz.`)
        .setRequired(true)),


    run: async (client, interaction) => {

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

        if(!interaction.member.roles.cache.get(`${config.yetkiliekibi}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });



        const uyarıLogs = await Log.find({}, 'uyarıLog');
        if (uyarıLogs.length === 0) {
            return interaction.reply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
        }
        const uyarıkanalid = uyarıLogs.map(log => log.uyarıLog)
  
        const uyarıkanalımız = uyarıkanalid.join(', ')
        
        const kanal = interaction.guild.channels.cache.get(uyarıkanalımız)
        if(!kanal) return interaction.reply({content: `> **\`uyarı-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``, ephemeral: true})


        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
        let emoji = config.emoji

        const role = interaction.options.getRole("rol")
        const sebep = interaction.options.getString("sebep")
        const user = interaction.options.getUser("üye");
        const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

        const hex2 = await KayıtlıHex.findOne({ discordId: member.id });

        let hex = ""
        if(!hex2) {
            hex = `Bulunumadı ❌`
        }
        else
        {
            hex = `${hex2.kayıtlıhex} ✅`
        }


        await member.roles.add(role)

        const rolsayısı = parseInt(role.name.match(/\d+/));


        const tarih = new Date(); // Şu anki tarih ve zamanı alır
        const tarih2 = new Date(); // Şu anki tarih ve zamanı alır

        const şuantarih = tarih2.toLocaleDateString('tr-TR'); // Türkçe tarih formatına dönüştürmek için


        const eklenmisTarih = new Date(tarih.setDate(tarih.getDate() + rolsayısı)); // Örneğin 3 gün eklemek için

        const formatliTarih = eklenmisTarih.toLocaleDateString('tr-TR'); // Türkçe tarih formatına dönüştürmek için

    


        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
        .setDescription(`> **Yetkili:** ${interaction.member} - __${interaction.member.id}__\n> **Oyuncu:** ${member} - ${member.id}\n\`\`\`${hex}\`\`\``)
        .addFields(
            { name: '**Verilen Tarih:**', value: `${şuantarih}`,inline: true },
            { name: '**Ceza:**', value: `${role}`,inline: true },
            { name: '**Alınacak Tarih:**', value: `${formatliTarih}`, inline: true },
            { name: '**Sebep:**', value: `${sebep}`, inline: true },
        )
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
        .setTimestamp()

        

        
                interaction.reply({content: `**Başarıyla Uyarıyı Verdim!**`, ephemeral: true})

                kanal.send({embeds: [embed]})
            
        
    }
}
