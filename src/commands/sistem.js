const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, PermissionsBitField, ActionRowBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const { yetkiliekibi } = require("../config.js");
const config = require("../config.js");

const db = new QuickDB();
module.exports = {
    data: new SlashCommandBuilder()
    .setName("sistem")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Sunucu Sistemlerini Açıp Kapatmanızı Sağlar.")
    .addStringOption(option =>
        option.setName('sistemtürü')
          .setDescription('Tür\'ü Seçin!')
          .setRequired(true)
          .addChoices(
            {name: "Anti Bot", value: "antibot"},
            {name: "Anti Reklam", value: "antireklam"},
            {name: "Günlük Yetkili Puanları", value: "günlükyetkiliverileri"},
            {name: "Günlük Rol Kaydetme", value: "günlükrolkaydetme"},

      )
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


        await interaction.deferReply({ephemeral: true})

        if (tür === "antibot") 
        {
        

            if(botkontrol !== 'Açık2') 
            {
                await db.set("anti-bot+",  "Açık2" );
                embed.setDescription(`> **904 Anti-Bot Engelleme Sistemi Başarıyla Açıldı!** \`✅\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/837692675511287840/1191530657764098188/904botengelack.png?ex=65a5c666&is=65935166&hm=35771db4f704989d22c6d7072929028dcb27052215e01455658378e1445146cc&=&format=webp&quality=lossless`)
    
                return await interaction.editReply({embeds: [embed]});
            }
            else {
                await db.set("anti-bot+",  "Kapalı2" );
                embed.setDescription(`> **904 Anti-Bot Engelleme Sistemi Başarıyla Kapandı!** \`❌\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/837692675511287840/1191530658686849144/904botengelkapal.png?ex=65a5c666&is=65935166&hm=366673e25138ca757cf9f93c82765590f15e22cf01e06007bae7f9a2bde840d4&=&format=webp&quality=lossless`)
                return await interaction.editReply({embeds: [embed]});
            }
        }
        
        if (tür === "antireklam")
        {

            if(reklamkontrol !== 'Açık') 
            {
                await db.set("reklam+",  "Açık" );
                embed.setDescription(`> **Reklam Engelleme Sistemi Başarıyla Açıldı!** \`✅\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/1115219436501225513/1162511892368068608/904adAck.png?ex=653c3491&is=6529bf91&hm=b0b85faf7cb08c9d4e2b1c1953d1cae209b943873b07e7ef877214e4748d5b1b&=`)
    
                return await interaction.editReply({embeds: [embed]});
            }
            else {
                await db.set("reklam+",  "Kapalı" );
                embed.setDescription(`> **Reklam Engelleme Sistemi Başarıyla Kapandı!** \`❌\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/1115219436501225513/1162511892628111420/904adkapal.png?ex=653c3491&is=6529bf91&hm=209829a4b78bf153354b69c930f2b9dcf62a43893a85460c6f8e639447d54660&=`)
                return await interaction.editReply({embeds: [embed]});
            }
        }


        if (tür === "günlükyetkiliverileri")
        {

            if(günlükverikontrol !== 'Açık3') 
            {
                await db.set("günlükveri+",  "Açık3" );
                embed.setDescription(`> **Günlük Yetkili Puan Sistemi Başarıyla Açıldı!** \`✅\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/1115219436501225513/1162511892368068608/904adAck.png?ex=653c3491&is=6529bf91&hm=b0b85faf7cb08c9d4e2b1c1953d1cae209b943873b07e7ef877214e4748d5b1b&=`)
                return await interaction.editReply({embeds: [embed]});
            }
            else {
                await db.set("günlükveri+",  "Kapalı3" );
                embed.setDescription(`> **Günlük Yetkili Puan Sistemi Başarıyla Kapandı!** \`❌\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/1115219436501225513/1162511892628111420/904adkapal.png?ex=653c3491&is=6529bf91&hm=209829a4b78bf153354b69c930f2b9dcf62a43893a85460c6f8e639447d54660&=`)
                return await interaction.editReply({embeds: [embed]});
            }
        }

        if (tür === "günlükrolkaydetme")
        {

            if(günlükrolkaydetme !== 'Açık4') 
            {
                await db.set("günlükrolkaydetme+",  "Açık4" );
                embed.setDescription(`> **Günlük Rol Kaydetme Sistemi Başarıyla Açıldı!** \`✅\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/1115219436501225513/1162511892368068608/904adAck.png?ex=653c3491&is=6529bf91&hm=b0b85faf7cb08c9d4e2b1c1953d1cae209b943873b07e7ef877214e4748d5b1b&=`)
                return await interaction.editReply({embeds: [embed]});
            }
            else {
                await db.set("günlükrolkaydetme+",  "Kapalı4" );
                embed.setDescription(`> **Günlük Rol Kaydetme Sistemi Başarıyla Kapandı!** \`❌\``)
                embed.setThumbnail(`https://media.discordapp.net/attachments/1115219436501225513/1162511892628111420/904adkapal.png?ex=653c3491&is=6529bf91&hm=209829a4b78bf153354b69c930f2b9dcf62a43893a85460c6f8e639447d54660&=`)
                return await interaction.editReply({embeds: [embed]});
            }
        }


        }
    }
