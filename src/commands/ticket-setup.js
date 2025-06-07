const { SlashCommandBuilder,StringSelectMenuBuilder, EmbedBuilder,ButtonBuilder, ButtonStyle, PermissionFlagsBits, PermissionsBitField, args, slice, ActionRowBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticketkur")
        .setDMPermission(false)
        .setDescription("Ticket'ı Kurar."),

        run: async (client, interaction, args, message) => {

            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
    
            if(!interaction.member.roles.cache.get(config.banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
    
            let sunucuiconurl = config.sunucuiconurl
            let renk = config.renk
        
            let emoji = config.emoji

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Ticket Açmak İçin Kategori Seçiniz.')
                        .addOptions([
                            {
                                label: 'Destek, Bug & Teknik Sorunlar',
                                description: 'Destek, Bug veya Teknik Sorun Almak İstiyorsanız.',
                                value: 'general',
                                emoji: `${emoji}`
                            },
                            {
                                label: 'Oyun içi Sorunlar & Rol Hataları',
                                description: 'Oyun içi Sorunlar & Rol Hataları',
                                value: 'staff',
                                emoji: `${emoji}`
                            },
                            {
                                label: 'Diğer Kategoriler',
                                description: 'Sebebiniz Eğer Burada Yoksa, Bu Kategoride Ticket Açın.',
                                value: 'other',
                                emoji: `${emoji}`
                            },
                            {
                                label: 'Donate & Satın Alımlar',
                                description: 'Donate Satın Almak veya Bilgi Almak İçin, Bu Kategoride Ticket Açın.',
                                value: 'donate',
                                emoji: `${emoji}`
                            },
                            {
                                label: 'Seçenek Sıfırla',
                                description: 'Seçenekleri Sıfırlamanıza Yarar.',
                                value: 'Sıfırla',
                                emoji: `${emoji}`
                            },
                            
                        ]),
                );
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('denemeticket')
                        .setLabel('Özel Sorun Belirterek Aç!')
                        .setStyle(ButtonStyle.Secondary),
                )
                
                const ticket = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
                .setDescription('**Ticket Açmak İçin Aşağıdan Kategori Seçiniz.**\n\`\`\`Şikayetleriniz,\nÖneri/İstekleriniz,\nYaşadığınız sorunlar hakkında buradan yardım alabilirsin!\`\`\`\n> __Gereksiz Yere Ticket Açanlara İşlem Uygulanacaktır.__')
                .setThumbnail(`${sunucuiconurl}`)


            interaction.channel.send({
                embeds: [ticket],
                content: `||@everyone|| **/** ||@here||`,
                components: [row, row2]
            })

            
            

    }
}