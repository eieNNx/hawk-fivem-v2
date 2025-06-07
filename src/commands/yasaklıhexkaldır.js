const { SlashCommandBuilder, messageLink, PermissionFlagsBits, User } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { isNull } = require('lodash');
const { QuickDB } = require("quick.db");
const config = require("../config.js");
const HexModel = require('../models/hex.js');

const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("yasaklıhexkaldır")
    .setDMPermission(false)
    .setDescription("Database'e Belirtiğiniz Kişinin Hexini Kaldırırsınız.")
    .addStringOption(option =>
        option
        .setName("steamhex")
        .setDescription("Steam Hex'ini Atınız.")
        .setRequired(true)
    ),
    
    run: async (client, interaction) => {
        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
      

        let steamHex = interaction.options.getString("steamhex");

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

        if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


        try {
                 const kayitliHex = await HexModel.findOne({ hex: steamHex });
           
                 if (kayitliHex) {
                    await HexModel.findOneAndDelete({ hex: steamHex });
                   return interaction.reply(`> **Belirttiğiniz __${steamHex}__ Başarıyla Yasaklı Hex Listesinden Silindi!**`);
                 }
           
                 else
                 {
                    interaction.reply(`> **${steamHex} Yasaklı Hex Listesinde Bulunumadı!**`);

                 }
               } catch (err) {
                 console.error('Hata:', err);
                 interaction.reply(`> **Hex Yasaklarken Bir Sorun Oluştu, __904__ İle Görüşün.**`);
                }

    
    }









}