const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const config = require("../config.js");

module.exports = {
       data: new SlashCommandBuilder()
       .setName("dmdestek")
       .setDMPermission(false)
       .setDescription("Kişiye DM'den Mesaj Atarsınız.")
       .addUserOption((option) =>
       option
       .setName("üye")
       .setDescription("Mesaj Atmak İstediğiniz Kişi")
       .setRequired(true)
       ),

        run: async (client, interaction, Guild) => {

            let sunucuiconurl = config.sunucuiconurl
            let sunucubanner = config.sunucubanner
            let renk = config.renk


            let banhammer = config.yetkiliekibi
            const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
      
            if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
      

            const user = interaction.options.getUser("üye");
        const member = await interaction.guild.members.fetch(user.id);

try {
    member.send(`> **${interaction.guild.name} Sunucusunda Destek Odasına Bekleniyorsunuz \`❗\`**`)
    interaction.reply({
        content: "> **Başarıyla Kişiye Özelden Mesaj Gönderdim.** \`✅\`", ephemeral: true
    })
} catch (error) {
    return interaction.reply({
        content: "> **Mesaj'ı Gönderemedim DM Kapalı.** \`❌\`", ephemeral: true
    }); 
}


    
    },
    
}