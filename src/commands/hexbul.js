const { SlashCommandBuilder, messageLink, PermissionFlagsBits, User } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { QuickDB } = require("quick.db");
const config = require("../config.js");
const KayıtlıHex = require('../models/kayıtlıhexschema.js');

const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("hexbul")
    .setDMPermission(false)
    .setDescription("Kişinin Hexine Bakar.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Hexine Bakmak İstediğiniz Kişi.")
    .setRequired(true)
    ),
    
    run: async (client, interaction) => {

        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
        let sunucuiconurl = config.sunucuiconurl

     
        await interaction.deferReply()

        const user = interaction.options.getUser("üye");
        const member = await interaction.guild.members.fetch(user.id);

        const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);

        if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });

        const hex2 = await KayıtlıHex.findOne({ discordId: member.id });

        let hex = ""
        if(!hex2) {
            hex = `**Hex:** \`Bulunumadı\` \`❌\``
        }
        else
        {
            hex = `**Hex:** \`${hex2.kayıtlıhex}\` \`✅\``
        }

        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setDescription(`> ${member} / ${member.id} ${hex}`)
        .setTimestamp()
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})

        await interaction.editReply({ embeds: [embed]})
        
    
    }









}