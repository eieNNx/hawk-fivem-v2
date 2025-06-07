const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, PermissionsBitField, ActionRowBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const { yetkiliekibi } = require("../config.js");
const config = require("../config.js");
const resimSchema = require("../models/resimSchema.js")

const db = new QuickDB();
module.exports = {
    data: new SlashCommandBuilder()
    .setName("resimseç")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Sunucu Aktif,Bakım,Restart Resimlerini Ayarlamanızı Sağlar.")
    .addStringOption(option =>
        option
        .setName("aktifresim")
        .setDescription("Lütfen Resim URL'si Giriniz.")
        .setRequired(false)
    )
    .addStringOption(option =>
        option
        .setName("bakımresim")
        .setDescription("Lütfen Resim URL'si Giriniz.")
        .setRequired(false)
    )
    .addStringOption(option =>
        option
        .setName("restartresim")
        .setDescription("Lütfen Resim URL'si Giriniz.")
        .setRequired(false)
    ),

    run: async (client, interaction) => {
            
        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin Yönetici Olman Gerek!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        await interaction.deferReply()

        const aktifresim = interaction.options.getString("aktifresim");
        const bakımresim = interaction.options.getString("bakımresim");
        const restartresim = interaction.options.getString("restartresim");


        const resimLogs = await resimSchema.find({});
        let sıfırresim = "> **Daha Önce Kaydedilen Resimlerin URL Listesi \`❗\`**\n\n"
        const aktif = resimLogs.map(resimLogs => resimLogs.aktif).join(', ')
        const bakım = resimLogs.map(resimLogs => resimLogs.bakım).join(', ')
        const restart = resimLogs.map(resimLogs => resimLogs.restart).join(', ')

        
sıfırresim += `**Eski Aktif:** ${aktif ? aktif: `Daha Önce Aktif URL Eklenmemiş   \`❌\``}\n`
sıfırresim += `**Eski Bakım:** ${bakım ? bakım: `Daha Önce Bakım URL Eklenmemiş \`❌\``}\n`
sıfırresim += `**Eski Restart:** ${restart ? restart: `Daha Önce Restart URL Eklenmemiş \`❌\``}\n`


        let desc = "> **Eklemiş Olduğunuz Seçenekler Listesi \`❗\`**\n\n"

        if(aktifresim) {
            if (!/^(http[s]?:\/\/.*\.(?:png|jpg|gif|jpeg))/i.test(aktifresim)) {
                return interaction.editReply({ content: "Belirttiğiniz Aktif Resim URL'si Geçersiz. \`❌\`" })
            }     
        await resimSchema.findOneAndUpdate({}, {  aktif: aktifresim }, { upsert: true, new: true });
        desc += `**> Aktif Resim Başarıyla Eklendi. \`✅\`**\n Eklenen Aktif URL: ${aktifresim}\n`    
    }
        if(bakımresim)  {
            if (!/^(http[s]?:\/\/.*\.(?:png|jpg|gif|jpeg))/i.test(bakımresim)) {
                return interaction.editReply({ content: "Belirttiğiniz Bakım Resim URL'si Geçersiz. \`❌\`" })
            }        
            await resimSchema.findOneAndUpdate({}, { bakım: bakımresim }, { upsert: true, new: true });
            desc += `**> Bakım Resim Başarıyla Eklendi. \`✅\`**\n Eklenen Bakım URL: ${bakımresim}\n`
        }
        if(restartresim) {
            if (!/^(http[s]?:\/\/.*\.(?:png|jpg|gif|jpeg))/i.test(restartresim)) {
                return interaction.editReply({ content: "Belirttiğiniz Restart Resim URL'si Geçersiz. \`❌\`" })
            }
            await resimSchema.findOneAndUpdate({}, { restart: restartresim }, { upsert: true, new: true });
            desc += `**> Restart Resim Başarıyla Eklendi. \`✅\`**\n Eklenen Restart URL: ${restartresim}\n`
        }

        const embed31 = new EmbedBuilder()
        .setDescription(`${sıfırresim}\n${desc}`)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setTimestamp()

        await interaction.editReply({embeds: [embed31]})


        }
    }
