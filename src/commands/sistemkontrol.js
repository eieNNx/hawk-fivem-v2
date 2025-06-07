const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, PermissionsBitField, ActionRowBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const { yetkiliekibi } = require("../config.js");
const config = require("../config.js");
const Log = require("../models/Log.js")

const db = new QuickDB();
module.exports = {
    data: new SlashCommandBuilder()
    .setName("sistemkontrol")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Hangi Sistemlerin Açık Olduğunu Kontrol Edersiniz."),


    run: async (client, interaction) => {
            
        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin Yönetici Olman Gerek!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
  



        await interaction.deferReply({ ephemeral: true})

        const reklamkontrol = await db.get("reklam+");
        const botkontrol = await db.get("anti-bot+");
        const günlükverikontrol = await db.get("günlükveri+");
        const günlükrolkaydetme = await db.get("günlükrolkaydetme+");

        const tür = interaction.options.getString('sistemtürü');

        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setColor(`${config.renk}`)
        .setTimestamp()
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})

        let embed55 = ""
        let ticketkanali = ""
        let kayitkanali = ""
        let whitelistkanali = ""
        let rolkanali = ""
        let bankanali = ""
        let unbankanali = ""
        let seskanali = ""
        let ekipkanali = ""
        let mesajkanali = ""
        let giriskanali = ""
        let kanalkanali = ""
        let basvurukanali = ""
        let reklamkanali = ""
        let uyarıkanali = ""
        let yetkilibildirimkanali = ""
        let ticketkategorikanali = ""
        let botsesgiriskanali = ""


        const kayitLogs = await Log.find({});
          if (kayitLogs.length === 0) {
               return interaction.editReply({content: `> **Sunucuda Hiçbir Ayarlı Log Kanalı Bulamadım!** \`❌\``, ephemeral: true})
          }

          const kayitkanalid = kayitLogs.map(log => log.kayitLog).join(', ')
          const kayitkanal = interaction.guild.channels.cache.get(kayitkanalid)
          if(!kayitkanal) kayitkanali+= `- **\`kayit-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else kayitkanali += `- **${kayitkanal} İsimli Kanal \`kayit-log\` Olarak Aktif Durumda!** \`✅\``

          const ticketkanalid = kayitLogs.map(log => log.ticketLog).join(', ')
          const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
          if(!ticketkanal) ticketkanali+= `- **\`ticket-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else ticketkanali += `- **${ticketkanal} İsimli Kanal \`ticket-log\` Olarak Aktif Durumda!** \`✅\``

          const whitelistkanalid = kayitLogs.map(log => log.whitelistCikisLog).join(', ')
          const whitelistkanal = interaction.guild.channels.cache.get(whitelistkanalid)
          if(!whitelistkanal) whitelistkanali+= `- **\`whitelistçıkış-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else whitelistkanali += `- **${whitelistkanal} İsimli Kanal \`whitelistçıkış-log\` Olarak Aktif Durumda!** \`✅\``

          const rolkanalid = kayitLogs.map(log => log.rolLog).join(', ')
          const rolkanal = interaction.guild.channels.cache.get(rolkanalid)
          if(!rolkanal) rolkanali+= `- **\`rol-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else rolkanali += `- **${rolkanal} İsimli Kanal \`rol-log\` Olarak Aktif Durumda!** \`✅\``

          const unbankanalid = kayitLogs.map(log => log.unbanLog).join(', ')
          const unbankanal = interaction.guild.channels.cache.get(unbankanalid)
          if(!unbankanal) unbankanali+= `- **\`unban-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else unbankanali += `- **${unbankanal} İsimli Kanal \`unban-log\` Olarak Aktif Durumda!** \`✅\``

          const bankanalid = kayitLogs.map(log => log.banLog).join(', ')
          const bankanal = interaction.guild.channels.cache.get(bankanalid)
          if(!bankanal) bankanali+= `- **\`ban-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else bankanali += `- **${bankanal} İsimli Kanal \`ban-log\` Olarak Aktif Durumda!** \`✅\``

          const seskanalid = kayitLogs.map(log => log.sesLog).join(', ')
          const seskanal = interaction.guild.channels.cache.get(seskanalid)
          if(!seskanal) seskanali+= `- **\`ses-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else seskanali += `- **${seskanal} İsimli Kanal \`ses-log\` Olarak Aktif Durumda!** \`✅\``

          const ekipkanalid = kayitLogs.map(log => log.ekipLog).join(', ')
          const ekipkanal = interaction.guild.channels.cache.get(ekipkanalid)
          if(!ekipkanal) ekipkanali+= `- **\`ekip-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else ekipkanali += `- **${ekipkanal} İsimli Kanal \`ekip-log\` Olarak Aktif Durumda!** \`✅\``

          const mesajkanalid = kayitLogs.map(log => log.mesajLog).join(', ')
          const mesajkanal = interaction.guild.channels.cache.get(mesajkanalid)
          if(!mesajkanal) mesajkanali+= `- **\`mesaj-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else mesajkanali += `- **${mesajkanal} İsimli Kanal \`mesaj-log\` Olarak Aktif Durumda!** \`✅\``

          const giriskanalid = kayitLogs.map(log => log.girisLog).join(', ')
          const giriskanal = interaction.guild.channels.cache.get(giriskanalid)
          if(!giriskanal) giriskanali+= `- **\`giris-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else giriskanali += `- **${giriskanal} İsimli Kanal \`giris-log\` Olarak Aktif Durumda!** \`✅\``

          const kanalkanalid = kayitLogs.map(log => log.kanalLog).join(', ')
          const kanalkanal = interaction.guild.channels.cache.get(kanalkanalid)
          if(!kanalkanal) kanalkanali+= `- **\`kanal-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else kanalkanali += `- **${kanalkanal} İsimli Kanal \`kanal-log\` Olarak Aktif Durumda!** \`✅\``

          const basvurukanalid = kayitLogs.map(log => log.basvuruLog).join(', ')
          const basvurukanal = interaction.guild.channels.cache.get(basvurukanalid)
          if(!basvurukanal) basvurukanali+= `- **\`basvuru-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else basvurukanali += `- **${basvurukanal} İsimli Kanal \`basvuru-log\` Olarak Aktif Durumda!** \`✅\``

          const reklamkanalid = kayitLogs.map(log => log.reklamLog).join(', ')
          const reklamkanal = interaction.guild.channels.cache.get(reklamkanalid)
          if(!reklamkanal) reklamkanali+= `- **\`reklam-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else reklamkanali += `- **${reklamkanal} İsimli Kanal \`reklam-log\` Olarak Aktif Durumda!** \`✅\``

          const uyarıkanalid = kayitLogs.map(log => log.uyarıLog).join(', ')
          const uyarıkanal = interaction.guild.channels.cache.get(uyarıkanalid)
          if(!uyarıkanal) uyarıkanali+= `- **\`uyarı-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else uyarıkanali += `- **${uyarıkanal} İsimli Kanal \`uyarı-log\` Olarak Aktif Durumda!** \`✅\``

          const yetkilibildirimkanalid = kayitLogs.map(log => log.yetkilibildirimlog).join(', ')
          const yetkilibildirimkanal = interaction.guild.channels.cache.get(yetkilibildirimkanalid)
          if(!yetkilibildirimkanal) yetkilibildirimkanali+= `- **\`bildirim-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else yetkilibildirimkanali += `- **${yetkilibildirimkanal} İsimli Kanal \`bildirim-log\` Olarak Aktif Durumda!** \`✅\``

          const ticketkategorikanalid = kayitLogs.map(log => log.ticketKategori).join(', ')
          const ticketkategorikanal = interaction.guild.channels.cache.get(ticketkategorikanalid)
          if(!ticketkategorikanal) ticketkategorikanali+= `- **\`Ticket Kategori\` İsimli Kategori Kanalı Sunucuda Mevcut Değil!** \`❌\``
          else ticketkategorikanali += `- **\`${ticketkategorikanal.name}\` İsimli Kategori \`Ticket Kategori\` Olarak Aktif Durumda!** \`✅\``

          const botsesgiriskanalid = kayitLogs.map(log => log.botsesgiris).join(', ')
          const botsesgiriskanal = interaction.guild.channels.cache.get(botsesgiriskanalid)
          if(!botsesgiriskanal) botsesgiriskanali+= `- **\`Bot Sesli Kanal\` İsimli Kanal Sunucuda Mevcut Değil!** \`❌\``
          else botsesgiriskanali += `- **${botsesgiriskanal} İsimli Kanal \`Bot Sesli Kanal\` Olarak Aktif Durumda!** \`✅\``


            if(botkontrol !== 'Açık2') 
            {
                embed55 += `- **\`Anti-Bot Engelleme\` Sistemi Kapalı \`❌\`**\n`

            }
            else {
                embed55 += `- **\`Anti-Bot Engelleme\` Sistemi Açık \`✅\`**\n`
            }
        
            if(reklamkontrol !== 'Açık') 
            {
                embed55 += `- **\`Reklam Engelleme\` Sistemi Kapalı \`❌\`**\n`

            }
            else {
                embed55 += `- **\`Reklam Engelleme\` Sistemi Açık \`✅\`**\n`
            }
            if(günlükverikontrol !== 'Açık3') 
            {
                embed55 += `- **\`Günlük Yetkili Puan\` Sistemi Kapalı \`❌\`**\n`

            }
            else {
                embed55 += `- **\`Günlük Yetkili Puan\` Sistemi Açık \`✅\`**\n`
            }
            if(günlükrolkaydetme !== 'Açık4') 
            {
                embed55 += `- **\`Günlük Rol Kaydetme\` Sistemi Kapalı \`❌\`**\n`

            }
            else {
                embed55 += `- **\`Günlük Rol Kaydetme\` Sistemi Açık \`✅\`**\n`
            }




        embed.setDescription(`> **Aktif Koruma Sistemleri \`❗\`**\n${embed55}\n> **Aktif Kanal Sistemleri \`❗\`**\n${ticketkanali}\n${kayitkanali}\n${whitelistkanali}\n${rolkanali}\n${bankanali}\n${unbankanali}\n${seskanali}\n${ekipkanali}\n${mesajkanali}\n${giriskanali}\n${kanalkanali}\n${basvurukanali}\n${reklamkanali}\n${uyarıkanali}\n${yetkilibildirimkanali}\n${ticketkategorikanali}\n${botsesgiriskanali}`)

        await interaction.editReply({embeds: [embed], ephemeral: true})

    

        }
    }
