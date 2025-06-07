const { SlashCommandBuilder, messageLink, PermissionFlagsBits, User } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { isNull } = require('lodash');
const { QuickDB } = require("quick.db");
const config = require("../config.js");
const HexModel = require('../models/hex.js');

const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("hexyasakla")
    .setDMPermission(false)
    .setDescription("Database'e Belirtiğiniz Kişinin Hexini Yasaklarsınız.")
    .addStringOption(option =>
        option
        .setName("steamhex")
        .setDescription("Steam Hex'ini Atınız.")
        .setRequired(true)
        

    ),
    
    run: async (client, interaction) => {
        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
      


        await interaction.deferReply()

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
              return interaction.editReply(`> **Belirttiğiniz __${steamHex}__ Verisi Daha Önce Yasaklanmış. Kaldırmak İçin /yasaklıhexkaldır Komutunu Kullan.**`);
            }
      
            await HexModel.create({ hex: steamHex });
            interaction.editReply(`> **Başarıyla ${steamHex} Yasaklı Hex Listesine Eklendi.**`);
          } catch (err) {
            console.error('Hata:', err);
            interaction.editReply(`> **Hex Yasaklarken Bir Sorun Oluştu, __904__ İle Görüşün.**`);
          }
        
    
        
    
    }









}