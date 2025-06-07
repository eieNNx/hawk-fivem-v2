const { SlashCommandBuilder, messageLink, PermissionFlagsBits, GuildMember } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const mongoose = require('mongoose');
mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });
const Role5 = require('../models/roleschema.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dbrolkaydet")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Database'e Rolü Kaydeder.")
    .addRoleOption(option =>
         option
         .setName("rol")
         .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
         .setRequired(true)
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
  

        const rol = interaction.options.getRole("rol")

        const embed5555 = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setColor(config.renk)
        .setFooter({text: `Komut Kullanıcısı: ${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
  
        await interaction.deferReply()
        
try {
    const users = rol.members.map(member => member.id);

    if(users == 0) {
        embed5555.setDescription(`> **Belirttiğiniz ${rol} İsimli Rolde Kimse Yok, Kayıt Edemem. \`❌\`**`)
        return interaction.editReply({embeds: [embed5555]})
    } 

    // MongoDB veritabanına kaydedin
    await Role5.findOneAndUpdate(
      { roleID: rol.id },
      { $set: { userID: users } },
      { upsert: true }
    );
    await wait(4_000);
    embed5555.setDescription('> **Roldeki Tüm Kullanıcıların \`ID Verileri\` Veritabanına Kaydedildi! \`✅\`**');
    interaction.editReply({embeds: [embed5555]})

} catch (error) {
    console.log(`Rolkaydet Komutunda Sorun Oluştu. ${error}`)
    return interaction.editReply(`Bir Sorun Oluştu Hawk Development'a Ulaş \`💥\``)
}


    }
}

