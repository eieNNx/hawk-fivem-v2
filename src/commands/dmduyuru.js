const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dmduyuru")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Yetkililere DM Duyuru Mesajı Gönderir!"),
    run: async (client, interaction) => {

        let yetkiliekibi = config.banhammer
        let renk = config.renk
        let sunucuiconurl = config.sunucuiconurl

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin Yönetici Olman Gerek!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);



        await interaction.deferReply({ephemeral: true})

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });

        let lastUsage = await db.get(`dmduyuru_lastUsage_`);
        if (lastUsage && Date.now() - lastUsage < 30 * 60 * 1000) {
          let remainingTime = 30 * 60 * 1000 - (Date.now() - lastUsage);
          let minutes = Math.floor(remainingTime / (60 * 1000));
          let seconds = Math.ceil((remainingTime % (60 * 1000)) / 1000);
          return interaction.editReply({ content: `\`\`\`Bu Komutu Tekrar Kullanabilmek İçin ${minutes} Dakika ${seconds} Saniye Beklemelisiniz ❗\`\`\``, ephemeral: true });
      }

        try {
            interaction.guild.members.cache.filter(member => member.roles.cache.has(yetkiliekibi)).forEach(member => {
                const bedrpembed = new EmbedBuilder()
                .setColor(renk)
                .setTimestamp()
                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
                .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
                .setThumbnail(`${member.displayAvatarURL()}`)
                .setDescription(`> **${interaction.guild.name} Sunucumuzun Yetkili aktifliğini Arttırmak İçin Lütfen Yetkili Odalarına Geçebilirmisin?**`)

                member.send({embeds: [bedrpembed], content: `**Merhaba! ${member}**`});
            });

            await db.set(`dmduyuru_lastUsage_`, Date.now());
        } catch (error) {
            console.error(`DM'i Kapalı ${member}`);
        }

        interaction.editReply({ content: `> **Başarıyla Herkese DM Gönderdim.** \`✅\``, ephemeral: true });
    }
}
