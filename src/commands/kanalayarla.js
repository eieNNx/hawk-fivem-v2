const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits,PermissionsBitField,StringSelectMenuBuilder, ActionRowBuilder, ChannelSelectMenuBuilder,ChannelType, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kanalayarla")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Seçtiğiniz Log Kanallarını Başka Bir Kanal İle Değiştirirsiniz."),

    run: async (client, interaction) => {

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
        
        if(!interaction.member.roles.cache.get(config.banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('logkanalları')
                .setPlaceholder('Ayarlamak İstediğiniz Logu Seçiniz.')
                .addOptions([
                    {
                        label: 'Ticket Kategori',
                        description: 'Ticketların Açılacağı Kategoriyi Belirleyin.',
                        value: 'select_ticket-kategori',
                        
                    },
                    {
                        label: 'Ticket Log',
                        description: 'Ticket Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_ticket-log',
                        
                    },
                    {
                        label: 'Kayıt Log',
                        description: 'Kayıt Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_kayıt-log',
                        
                    },
                    {
                        label: 'Whitelist Çıkış Log',
                        description: 'Whitelist Çıkış Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_whitelistçıkış-log',
                        
                    },
                    {
                        label: 'Rol Log',
                        description: 'Rol Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_rol-log',
                        
                    },
                    {
                        label: 'Ban Log',
                        description: 'Ban Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_ban-log',
                        
                    },
                    {
                        label: 'Unban Log',
                        description: 'Unban Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_unban-log',
                        
                    },
                    {
                        label: 'Ses Log',
                        description: 'Ses Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_ses-log',
                        
                    },
                    {
                        label: 'Ekip Log',
                        description: 'Ekip Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_ekip-log',
                        
                    },
                    {
                        label: 'Mesaj Log',
                        description: 'Mesaj Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_mesaj-log',
                        
                    },
                    {
                        label: 'Giriş Log',
                        description: '⁠Giriş Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_⁠giriş-log',
                        
                    },
                    {
                        label: 'Kanal Log',
                        description: 'Kanal Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_kanal-log',
                        
                    },
                    {
                        label: 'Başvuru Log',
                        description: 'Başvuru Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_başvuru-log',
                        
                    },
                    {
                        label: 'Reklam Log',
                        description: 'Reklam Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_reklam-log',
                        
                    },
                    {
                        label: 'Uyarı Log',
                        description: 'Uyarı Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_uyarı-log',
                        
                    },
                    {
                        label: 'Yetkili Bildirim Log',
                        description: 'Yetkili Bildirim Log Olarak Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_yetkilibildirim-log',
                        
                    },
                    {
                        label: 'Bot Ses Kanalı',
                        description: 'Botun Sesli Olarak Gireceği Kanalı Ayarlamak İstediğiniz Kanalı Belirleyin.',
                        value: 'select_bot_ses_giris',
                        
                    }
                                     
                ]),
        );


        const embed = new EmbedBuilder()
        .setTitle(`Kanal Ayarlama Komutuna Hoşgeldin \`❗\``)
        .setDescription(`> **Lütfen Ayarlamak İstediğin Logu Aşağıdan Seç \`✅\`**`)
        .setThumbnail(`${config.sunucuiconurl}`)
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})


            interaction.reply({ components: [row], embeds: [embed]})       
        }
        
    }






