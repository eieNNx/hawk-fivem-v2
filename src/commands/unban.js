const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const Log = require("../models/Log.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDMPermission(false)
        .setDescription("ID'sini Yazdığınız Kişinin Banını Kaldırır.")
        .addStringOption(option =>
            option.setName("üyeid")
                .setDescription("Yazdığınız ID'ye Sahip Kişinin Banını Kaldırır.")
                .setRequired(true)
        ),

        run: async (client, interaction) => {
        const { channel, options } = interaction;
        let sunucuiconurl = config.sunucuiconurl
        let sunucubanner = config.sunucubanner
        let banhammer = config.banhammer
        let renk = config.renk

        const userId = options.getString("üyeid");

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

        if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        const unbanLogs = await Log.find({}, 'unbanLog');
        if (unbanLogs.length === 0) {
            return interaction.reply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
        }
        const unbankanalid = unbanLogs.map(log => log.unbanLog)
  
        const unbankanalımız = unbankanalid.join(', ')
        
        const kanal = interaction.guild.channels.cache.get(unbankanalımız)
        if(!kanal) return interaction.reply({content: `> **\`unban-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``, ephemeral: true})


        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
            .setDescription(`**Başarıyla <@${userId}> Kullanıcısının Banını Kaldırdım!**`)
                .setColor(renk)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            })
            const unban2 = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`**Kişinin Banını Kaldıran:**\n ${interaction.member} Yetkilimiz,\n\n **Banı Kaldırılan Kişi:** <@${userId}> Sunucudan Banı Kaldırıldı! \n\n **Kişinin ID'si:** ${userId}`)
            .setImage(`${sunucubanner}`)
            .setTimestamp()
   
            await kanal.send(
               { embeds: [unban2] }
               ) ;
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`**Bana Lütfen Geçerli Bir Discord ID Gir.**`)
                .setColor(renk);

            interaction.reply({ embeds: [errEmbed], ephemeral: true })

            

        }
    }
}