const { SlashCommandBuilder, messageLink, PermissionFlagsBits, GuildMember } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const Log = require("../models/Log.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rolal")
    .setDMPermission(false)
    .setDescription("Kişiden Seçtiğiniz Rolü Alır.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Rolü Alıcağınız Kişiyi Seçiniz.")
    .setRequired(true)
    )
    .addRoleOption(option =>
         option
         .setName("rol")
         .setDescription("Almak İstediğiniz Rolü Seçiniz.")
         .setRequired(true)
    ),
    run: async (client, interaction) => {

      const yetkinyok = new EmbedBuilder()
      .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
      .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
      .setThumbnail(config.sunucuiconurl)
      .setTimestamp()
      .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
      .setColor(config.renk);


      await interaction.deferReply()

      if(!interaction.member.roles.cache.get(`${config.yetkiliekibi}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok] });


        let sunucubanner = config.sunucubanner
        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk


        const user = interaction.options.getUser("üye");
        const rol = interaction.options.getRole("rol")
        const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);


        const rolvar = new EmbedBuilder()
        .setDescription(`**${user} Kişisinde Zaten ${rol} İsimli Rol Yok \`❗\`**`)

        if(!member.roles.cache.has(rol.id)) return interaction.editReply({embeds: [rolvar]})

        const errEmbed = new EmbedBuilder()
        .setDescription(`**Merhaba \`❗\` ${interaction.member} Belirttiğiniz ${rol} İsimli Rolü Almaya Yetkin Yetmiyor. \`❌\`**`)

        const errEmbed2 = new EmbedBuilder()
        .setDescription(`**Merhaba \`❗\` ${interaction.member} Maalesef Bu Rolü Almak İçin Yetkim Yok. \`❌\`**`)


        const bot = interaction.guild.members.cache.get(client.user.id);
        const botrole = bot.roles.highest;
        const komutkullanankisi = interaction.member.roles.highest;

        if (komutkullanankisi.position <= rol.position) 
        return interaction.editReply({ embeds: [errEmbed] });


        if (botrole.position <= rol.position) 
        return interaction.editReply({ embeds: [errEmbed2] });

  

        const rolLogs = await Log.find({}, 'rolLog');
        if (rolLogs.length === 0) {
            return interaction.editReply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``})
        }
        const rolkanalid = rolLogs.map(log => log.rolLog)
  
        const rolkanalımız = rolkanalid.join(', ')
        
        const kanal = interaction.guild.channels.cache.get(rolkanalımız)
        if(!kanal) return interaction.editReply({content: `> **\`rol-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``})


        member.roles.remove(rol.id)

        const verdim2 = new EmbedBuilder()
        .setDescription(`> **Başarıyla ${user} Kişisinden ${rol} Rolünü Aldım \`✅\`**`)
        .setFooter({text: `Rol Alan Yetkili: ${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setTimestamp()
        .setColor(renk);
        await interaction.editReply({
            embeds: [verdim2]
         });

         const banla = new EmbedBuilder()
         .setColor(renk)
         .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
         .setTitle(`\`/rolal\` Komutuyla Rol Alındı! \`❗\` `)
         .setDescription(`> **Rol Alınan Kullanıcı Bilgileri:** ${user}\n\`\`\`${user.id}\`\`\`\n> **Alınan Rol ve ID:** ${rol} / \`${rol.id}\` \n\n> **Rol Alan Yetkili:** ${interaction.member}\n\`\`\`${interaction.member.id}\`\`\``)
         .setImage(`${sunucubanner}`)
         .setTimestamp()

         await kanal.send(
            { embeds: [banla] }
            )
     },
};