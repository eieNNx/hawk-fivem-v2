const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resim")
        .setDMPermission(false)
        .setDescription("Yazdığınız Resimi Bot Yazar!")
        .addStringOption(option =>
            option.setName("resim")
                .setDescription("Yazılması İstenen Resimi Yazınız.")
                .setRequired(true)
        ),





        run: async (client, interaction, args, message) => {    
       
            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
    
            if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
    
          let renk = config.renk       
            let resim = interaction.options.getString("resim");
            const gonderildi = new EmbedBuilder()
                .setDescription(`**Başarıyla Resimini Yolladım!**`)
                .setColor(renk);


            const anamesaj = new EmbedBuilder()
            .setColor(renk)
            .setImage(`${resim}`);

                interaction.reply({ embeds: [gonderildi], ephemeral: true });
                interaction.channel.send({embeds: [anamesaj]});

            
            

    }
}