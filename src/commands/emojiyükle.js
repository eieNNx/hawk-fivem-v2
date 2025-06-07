const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const Log = require("../models/Log.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("emojiyükle")
        .setDMPermission(false)
        .setDescription("Sunucuya Emoji Yüklemenizi Sağlar.")
        .addAttachmentOption(option => option.setName(`emoji`).setDescription(`Yükleyeceğiniz Emojiyi Seçiniz.`).setRequired(true))
        .addStringOption(option => option.setName(`isim`).setDescription(`Yükleyeceğiniz Emojinin İsmi`).setRequired(true)),

        run: async (client, interaction) => {

            await interaction.deferReply()

            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
            
            if(!interaction.member.roles.cache.get(config.banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok] });

            const emoji = interaction.options.getAttachment(`emoji`)
            const isim = interaction.options.getString(`isim`)

            const embed5 = new EmbedBuilder()


            const yüklenenemoji = await interaction.guild.emojis.create({attachment: `${emoji.attachment}`, name: `${isim}`}).catch(err => {
                setTimeout(() => {
                    embed5.setDescription(`Yüklenme Hatası: **${err.rawError.message}**`)
                    embed5.setTitle(`Emoji Yüklemesi Başarısız \`❌\``)
                    return interaction.editReply({embeds: [embed5]})
                }, 2000)
            })

            embed5.setDescription(`Eklenen Emoji: ${yüklenenemoji} / \`${yüklenenemoji}\``)
            embed5.setTitle(`Emoji Başarıyla Yüklendi \`✅\``)            


            interaction.editReply({embeds: [embed5] })

          

    }
}