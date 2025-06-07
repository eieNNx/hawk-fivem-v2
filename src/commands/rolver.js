const { SlashCommandBuilder, messageLink, PermissionFlagsBits, GuildMember } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const Log = require("../models/Log.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rolver")
    .setDMPermission(false)
    .setDescription("Kişiye Seçtiğiniz Rolü Verir.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Rol Vericeğiniz Kişiyi Seçiniz.")
    .setRequired(true)
    )
    .addRoleOption(option =>
         option
         .setName("rol")
         .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
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
        .setDescription(`**${user} Kişisinde Zaten ${rol} İsimli Rol Mevcut \`❗\`**`)

        if(member.roles.cache.has(rol.id)) return interaction.editReply({embeds: [rolvar]})

        const errEmbed = new EmbedBuilder()
        .setDescription(`**Merhaba \`❗\` ${interaction.member} Belirttiğiniz ${rol} İsimli Rolü Vermeye Yetkin Yetmiyor. \`❌\`**`)

        const errEmbed2 = new EmbedBuilder()
        .setDescription(`**Merhaba \`❗\` ${interaction.member} Maalesef Bu Rolü Vermek İçin Yetkim Yok. \`❌\`**`)

        const bot = interaction.guild.members.cache.get(client.user.id);
        const botrole = bot.roles.highest;
        const komutkullanankisi = interaction.member.roles.highest;

        if (botrole.position <= rol.position) 
        return interaction.editReply({ embeds: [errEmbed2] });

        if (komutkullanankisi.position <= rol.position) 
        return interaction.editReply({ embeds: [errEmbed] });

        const rolLogs = await Log.find({}, 'rolLog');
        if (rolLogs.length === 0) {
            return interaction.editReply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``})
        }
        const rolkanalid = rolLogs.map(log => log.rolLog)
  
        const rolkanalımız = rolkanalid.join(', ')
        
        const kanal = interaction.guild.channels.cache.get(rolkanalımız)
        if(!kanal) return interaction.editReply({content: `> **\`rol-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``})


        const verdim2 = new EmbedBuilder()
        .setDescription(`> **Başarıyla ${user} Kişisine ${rol} Rolünü Verdim \`✅\`**`)
        .setFooter({text: `Rol Veren Yetkili: ${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setTimestamp()
        .setColor(renk);

        member.roles.add(rol.id)


        await interaction.editReply({
            embeds: [verdim2]
         });

         const banla = new EmbedBuilder()
         .setColor(renk)
         .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
         .setTitle(`\`/rolver\` Komutuyla Rol Verildi! \`❗\` `)
         .setDescription(`> **Rol Verilen Kullanıcı Bilgileri:** ${user}\n\`\`\`${user.id}\`\`\`\n> **Verilen Rol ve ID:** ${rol} / \`${rol.id}\` \n\n> **Rol Veren Yetkili:** ${interaction.member}\n\`\`\`${interaction.member.id}\`\`\``)
         .setImage(`${sunucubanner}`)
         .setTimestamp()

         await kanal.send(
            { embeds: [banla] }
            )
     },
};
