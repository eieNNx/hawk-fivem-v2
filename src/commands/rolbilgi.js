const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, PermissionsBitField, ActionRowBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const { yetkiliekibi } = require("../config.js");
const config = require("../config.js");
const KayıtlıHex = require("../models/kayıtlıhexschema");

const db = new QuickDB();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rolbilgi")
        .setDMPermission(false)
        .setDescription("Roldeki Üyelerin Bilgilerini Listeler.")
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
  
        if(!interaction.member.roles.cache.get(`${config.yetkiliekibi}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
  

        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
        let emoji = config.emoji

        const role = interaction.options.getRole("rol")

        const membersWithRole = role.members;
        const hexData = [];
        await interaction.deferReply();

        for (const member of membersWithRole.values()) {
            const hex = await KayıtlıHex.findOne({ discordId: member.id });
            if (hex !== null) {
                hexData.push({ member: `<@${hex.discordId}>`, hex: `${hex.kayıtlıhex} ✅` });
            }
            else {
                hexData.push({ member: member.user, hex: `Bulunamadı ❌` }); 
            }
        }

        const pageSize = 20; 
        const totalPages = Math.ceil(hexData.length / pageSize);
        let roleDate = moment(role.createdAt)

        let date = `__${roleDate.format(`DD`)} ${roleDate.format(`MM`).replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${roleDate.format(`YYYY`)} Saat ${roleDate.format(`HH:mm`)}__`
        let bedrp = `**${role} Rolüne Sahip Kullanıcıların Bilgileri:** \n **\`Roldeki Kişi Sayısı:\`** ${role.members.size}\n **\`Rol ID:\`** ${role.id}\n **\`Rol Oluşturulma Tarihi:\`** ${date}\n\n`;

        const embeds = [];
        for (let page = 0; page < totalPages; page++) {
            const startIndex = page * pageSize;
            const endIndex = Math.min(startIndex + pageSize, hexData.length);
      
            
            const embed = new EmbedBuilder()
                .setColor(renk)
                .setDescription(`${bedrp} ${hexData.slice(startIndex, endIndex).map((data, index) => `**• ${data.member} - ** \`${data.hex}\` (Hex)`).join('\n')}`)
                .setFooter({text: `Sayfa ${page + 1} / ${totalPages}`})
            embeds.push(embed);
        }

        let currentPage = 0;

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('prev')
                .setLabel('Önceki Sayfa')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true), 
            new ButtonBuilder()
                .setCustomId('next')
                .setLabel('Sonraki Sayfa')
                .setEmoji('➡️')
                .setStyle(ButtonStyle.Secondary), 
        );


        const reply = await interaction.editReply({ embeds: [embeds[currentPage]], components: [row] });

        const filter = i => ['prev', 'next'].includes(i.customId) && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'prev') {
                currentPage--;
                if (currentPage < 0) currentPage = embeds.length - 1;
            } else if (i.customId === 'next') {
                currentPage++;
                if (currentPage >= embeds.length) currentPage = 0;
            }

            const prevButtonDisabled = currentPage === 0;
            const nextButtonDisabled = currentPage === embeds.length - 1;

            row.components[0].setDisabled(prevButtonDisabled);
            row.components[1].setDisabled(nextButtonDisabled);

            await i.update({ embeds: [embeds[currentPage]], components: [row] });     
       });

        collector.on('end', collected => {
            const rowWithDisabledButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prev')
                        .setLabel('Önceki Sayfa')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Sonraki Sayfa')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                );
        
            reply.edit({ components: [rowWithDisabledButtons] }).catch(console.error);
        });
    }
};
