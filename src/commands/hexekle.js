const { SlashCommandBuilder, messageLink, PermissionFlagsBits, User } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { isNull } = require('lodash');
const { QuickDB } = require("quick.db");
const config = require("../config.js");
const HexModel = require('../models/hex.js');
const KayıtlıHex = require('../models/kayıtlıhexschema.js');

const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("hexekle")
    .setDMPermission(false)
    .setDescription("Database'e Belirtiğiniz Kişinin Hexini Eklersiniz.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Hex Eklemek İstediğiniz Kişi")
    .setRequired(true)
    ) 
    .addStringOption(option =>
        option
        .setName("steamhex")
        .setDescription("Steam Hex'ini Atınız.")
        .setMaxLength(21)
        .setMinLength(15)
        .setRequired(true)
        

    ),
    
    run: async (client, interaction) => {
        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk

        await interaction.deferReply()

        const user = interaction.options.getUser("üye");
        const member = await interaction.guild.members.fetch(user.id);
        let steamhex = interaction.options.getString("steamhex");
        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
        
        if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });

        if(steamhex.length != 15 && steamhex.length != 21 ) {
          return interaction.editReply({content: `> **Lütfen Hex Verisini Bu Formatla Girmeye Özen Gösterin \`❗\` \`steam:1100001000056ba\` / \`1100001000056ba\`**`, ephemeral: true})
        }

        try {
            const yasaklihex = await HexModel.findOne({ hex: steamhex });
      
            if (yasaklihex) {
              return interaction.editReply(`> **Belirttiğiniz __${steamhex}__ Verisi Daha Önce Yasaklanmış. Kaldırmak İçin /yasaklıhexkaldır Komutunu Kullan.**`);
            }
      
            const existingDocument = await KayıtlıHex.findOne({ discordId: member.id });

            let desc = ""

            if (existingDocument) {
                await KayıtlıHex.findOneAndReplace({ discordId: member.id }, { discordId: member.id, kayıtlıhex: steamhex });
                desc += `> **${user} Kayıtlı Hex Verisi:\`${existingDocument.kayıtlıhex}\`**\n\n> **Yeni Hex Verisini \`${steamhex}\` Olarak Ayarladım. \`✅\`**`
            } else {
                await KayıtlıHex.create({ discordId: member.id, kayıtlıhex: steamhex });
                desc += `> **${user} Adlı Kullanıcının Hex Verisini \`${steamhex}\` Olarak Ayarladım! \`✅\`**`
            }

            const basarili = new EmbedBuilder()
            .setDescription(desc)

            interaction.editReply({ embeds: [basarili]})
          } catch (err) {
            console.error('Hata:', err);
            interaction.editReply('Hex Değeri Kaydedilirken Bir Hata Oluştu.');
          }


          
        
        

    
    }









}