const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, args, slice,PermissionsBitField } = require("discord.js");
const { QuickDB } = require("quick.db");
const { renk } = require("../config.js");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("metin")
        .setDMPermission(false)
        .setDescription("Yazdığınız Mesajı Bot Yazar!")
        .addStringOption(option =>
            option.setName("metin")
                .setDescription("Yazılması İstenen Mesajı Yazınız.")
                .setRequired(true)
        ),





        run: async (client, interaction, args, message) => {
          let renk = config.renk
          let banhammer = config.banhammer

          const yetkinyok = new EmbedBuilder()
          .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
          .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
          .setThumbnail(config.sunucuiconurl)
          .setTimestamp()
          .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
          .setColor(config.renk);
          if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


            let metin = interaction.options.getString("metin");
            if (metin.length < 1) return interaction.reply({ content: "Mesaj Bu Kadar Kısa Olamaz!", ephemeral: true });
            const gonderildi = new EmbedBuilder()
                .setDescription(`**Başarıyla Mesajını Yazdım!**`)
                .setColor(renk);


                interaction.reply({ embeds: [gonderildi], ephemeral: true });
                interaction.channel.send(metin);

            
            

    }
}