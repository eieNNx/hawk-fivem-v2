const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("herkeserolver")
        .setDMPermission(false)
        .setDescription("Kanalın Kilidinin Açar.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption(option =>
            option
            .setName("rol")
            .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
            .setRequired(true)
        ),

    run: async (client, interaction) => {

        const sunucuiconurl = config.sunucuiconurl;
        const banhammer = config.banhammer;
        const renk = config.renk;

        const yetkinyok = new EmbedBuilder()
      .setDescription(`> **Bu Komutu Kullanabilmek İçin Yönetici Olman Gerek!** \`❌\``)
      .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
      .setThumbnail(config.sunucuiconurl)
      .setTimestamp()
      .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
      .setColor(config.renk);

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        const rol = interaction.options.getRole("rol");


        const botkardesim = interaction.guild.members.cache.get(interaction.client.user.id); // Botun üye bilgisini almak için

        if(botkardesim.roles.highest.comparePositionTo(rol) < 0 )
        {
            return interaction.reply({content: `> **${rol} Rolü, Benim Kendi Rolümün Üst Sırasında Yer Aldığı İçin Veremem! \`❌\`**`, ephemeral: true})
        }

        const membersWithoutRole = interaction.guild.members.cache.filter(member => !member.user.bot && !member.roles.cache.has(rol.id));
        const toplammembers904 = membersWithoutRole.size;
        let members904 = 0;

        if(toplammembers904 === 0) {
            return interaction.reply(`> **${rol} Rolü, Sunucuda Ki Herkesin Üzerinde Mevcut \`❗\` (Botlar Hariç)**`)
        }

        const embed904 = new EmbedBuilder()
            .addFields(
                { name: "> İlerleme Durumu:", value: `**- Verilen Rol** **\`\`\`${rol.name} / ${rol.id}\`\`\`**\n**- Rol Olmayan Üye Sayısı** **\`\`\`${toplammembers904}\`\`\`**\n**- Verilen Üye Sayısı** **\`\`\`${members904}/${toplammembers904}\`\`\`**` }
            )            
            .setColor(renk);

        const mesaj904 = await interaction.reply({ embeds: [embed904], fetchReply: true });

        membersWithoutRole.forEach(async member => {
            try {
                await member.roles.add(rol);
                members904++;
                // Her üye verildiğinde embed'in verilen üye sayısını güncelle
                embed904.spliceFields(0, 1, { name: "> İlerleme Durumu:", value: `**- Verilen Rol** **\`\`\`${rol.name} / ${rol.id}\`\`\`**\n**- Rol Olmayan Üye Sayısı** **\`\`\`${toplammembers904}\`\`\`**\n**- Verilen Üye Sayısı** **\`\`\`${members904}/${toplammembers904}\`\`\`**` });
                await mesaj904.edit({ embeds: [embed904] });
            } catch (error) {
                console.error(`Herkese Rol Verme İşlemi Sırasında Bir Hata Oluştu: ${error}`);
            }
        });

        // Döngü bittikten sonra tekrar embed'i güncelle ve işlem biten üye sayısını göster
        embed904.setTitle("**Tüm Üyelere Başarıyla Rol Verildi \`❗\`**");
        embed904.setThumbnail(interaction.guild.iconURL());
        embed904.setTimestamp();
        embed904.spliceFields(0, 1, { name: "> İlerleme Durumu:", value: `**- Verilen Rol** **\`\`\`${rol.name} / ${rol.id}\`\`\`**\n**- Rolde Olmayan Üye Sayısı** **\`\`\`${toplammembers904}\`\`\`**\n**- Verilen Üye Sayısı** **\`\`\`${members904}/${toplammembers904}\`\`\`**` });
        await mesaj904.edit({ embeds: [embed904] });
    }
};
