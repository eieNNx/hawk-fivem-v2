const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("yetkilibasvuru")
        .setDMPermission(false)
        .setDescription("Yetkili Başvuru Formu")
       ,

        run: async (client, interaction, Guild) => {


            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
    
            if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
  

            let sunucuiconurl = config.sunucuiconurl
            let sunucubanner = config.sunucubanner
            let renk = config.renk
          
            const menu = new EmbedBuilder()
            .setColor(renk)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
            .setImage(`${sunucubanner}`)
            .setDescription("**```Yetkili Başvurusu İçin Aşağıdaki Butona Basınız.```**")
    
            const row = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setCustomId('bot-başvuru')
            .setLabel('Staff Başvurusu Göndermek İçin Butona Tıkla!')
            .setEmoji("📗")
            .setStyle(ButtonStyle.Success),
            
            );
            interaction.channel.send({
                content: "||@everyone|| **/** ||@here||",embeds: [menu], components: [row]
            });
    
    
    },
    
}