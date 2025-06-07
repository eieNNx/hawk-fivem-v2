const { SlashCommandBuilder, ButtonBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { isNull } = require('lodash');
const { QuickDB } = require("quick.db");
const config = require("../config.js");
const Hex = require('../models/hex.js');

const itemsPerPage = 20;

const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("yasaklıhexliste")
    .setDMPermission(false)
    .setDescription("Yasaklı Hex Listesini Görüntülersiniz."),

    run: async (client, interaction) => {


        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

        if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


        let page = 1;

        try {
            const totalHexCount = await Hex.countDocuments();
            const totalPages = Math.ceil(totalHexCount / itemsPerPage);

            const hexList = await Hex.find({})
                .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage);

            const embed = new EmbedBuilder()
                .setTitle(`Yasaklı Hex Listesi - Sayfa ${page}/${totalPages}`)
                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
                .setThumbnail(config.sunucuiconurl)
                .setTimestamp()
                .setColor(`${config.renk}`)
                .setDescription(hexList.map((hex, index) => `- ${hex.hex}`).join('\n'));

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prevv')
                        .setLabel('Önceki Sayfa')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('nextt')
                        .setLabel('Sonraki Sayfa')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Secondary)
                );
                 

             await interaction.reply({ embeds: [embed], components: [row] });


       
            const filter = i => ['prevv', 'nextt'].includes(i.customId) && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
            
            
            collector.on('collect', async i => {
                if (i.customId === 'prevv') {
                    page = Math.max(page - 1, 1);
                } else if (i.customId === 'nextt') {
                    page = Math.min(page + 1, totalPages);
                }
            
                const currentPageHexList = await Hex.find({})
                    .skip((page - 1) * itemsPerPage)
                    .limit(itemsPerPage);
            
                embed.setDescription(currentPageHexList.map((hex, index) => `- ${hex.hex}`).join('\n'));
                embed.setTitle(`Yasaklı Hex Listesi - Sayfa ${page}/${totalPages}`);
            
                row.components[0].setDisabled(page === 1);
                row.components[1].setDisabled(page === totalPages);
            
                await i.update({ embeds: [embed], components: [row] })
            
            });

            collector.on('end', () => {
                row.components.forEach((component) => {
                    component.setDisabled(true);
                });
                interaction.editReply({ components: [row] });
            });
        } catch (err) {
            console.error(err);
            interaction.reply('> **Yasaklı Hex Listesi Getirilirken Bir Hata Oluştu. __904__ İle İletişime Geçiniz.**');
        }
    },
};