const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, PermissionsBitField, ActionRowBuilder, ChannelType, Flags, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const { renk } = require("../config.js");
const db = new QuickDB();
const config = require("../config.js");
const Log = require('../models/Log.js');
const setupSchema = require('../models/setupschema.js');
const sistemdb = require("../models/sistemdb.js")
const { Database } = require("ark.db");
const db2 = new Database("../emoji.json");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("loglarıkur")
        .setDMPermission(false)
        .setDescription("904'e Özel Komuttur. Kullanamazsınız."),

        run: async (client, interaction, args, message) => {


            await interaction.deferReply({ephemeral: true})


            if(interaction.member.id !== "836953972861698138") return interaction.editReply({content: `> **Bu Komut __904__ Bot Sahibine Özeldir.**`, ephemeral: true})
     

            const category2 = await interaction.guild.channels.create({
                type: ChannelType.GuildCategory,
                name: `TICKETLAR`,
                permissionOverwrites: [
          
                     {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]

                     },

                {
                    id: interaction.client.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                },
            
                 {
                        id: config.yetkiliekibi,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                        deny: [PermissionsBitField.Flags.SendMessages]
                 }
                ]
            })

            const category = await interaction.guild.channels.create({
                type: ChannelType.GuildCategory,
                name: `904 LOGS`,
                permissionOverwrites: [
          
                     {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]

                     },

                {
                    id: interaction.client.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                },
            
                 {
                        id: config.yetkiliekibi,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                        deny: [PermissionsBitField.Flags.SendMessages]
                 }
                ]
            })

            const ticketlog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'ticket-log',
                parent: category,
            });
            
            const whitelistCikisLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'whitelistçıkış-log',
                parent: category,
            });
            
            const rolLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'rol-log',
                parent: category,
            });
            
            const kayitLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'kayıt-log',
                parent: category,
            });
            
            const banLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'ban-log',
                parent: category,
            });
            
            const unbanLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'unban-log',
                parent: category,
            });
            
            const sesLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'ses-log',
                parent: category,
            });
            
            const ekipLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'ekip-log',
                parent: category,
            });
            
            const mesajLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'mesaj-log',
                parent: category,
            });
            
            const girisLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'giriş-log',
                parent: category,
            });
            
            const kanalLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'kanal-log',
                parent: category,
            });
            
            const basvuruLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'başvuru-log',
                parent: category,
            });
            
            const reklamLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'reklam-log',
                parent: category,
            });

            const uyarıLog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'uyarı-log',
                parent: category,
            });

            const yetkilibildirimlog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'yetkilibildirim-log',
                parent: category,
            });

            const guardlog = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'guard-log',
                parent: category,
            });

              const isimistekkanal = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'isim-istek',
                parent: category,
            });

              const permistekkanal = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: 'perm-istek',
                parent: category,
            });

             const ayarlanacakKanallar = await interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: '904-yardım',
                parent: category,
            });

            const botsesgiris = await interaction.guild.channels.create({
                type: ChannelType.GuildVoice,
                name: `${interaction.guild.name}`,
                permissionOverwrites: [         
                    {
                       id: interaction.guild.id,
                       allow: [PermissionsBitField.Flags.ViewChannel],
                       deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Connect]

                    },

               {
                   id: interaction.client.user.id,
                   allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect]
               }, ]            
            });

            await Log.findOneAndUpdate({}, { ticketLog: ticketlog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { whitelistCikisLog: whitelistCikisLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { rolLog: rolLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { kayitLog: kayitLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { banLog: banLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { unbanLog: unbanLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { sesLog: sesLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { ekipLog: ekipLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { mesajLog: mesajLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { girisLog: girisLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { kanalLog: kanalLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { basvuruLog: basvuruLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { reklamLog: reklamLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { uyarıLog: uyarıLog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { yetkilibildirimlog: yetkilibildirimlog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { guardlog: guardlog.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { ticketKategori: category2.id }, { upsert: true, new: true });
            await Log.findOneAndUpdate({}, { botsesgiris: botsesgiris.id }, { upsert: true, new: true });
            await sistemdb.findOneAndUpdate({}, { antibot: false }, { upsert: true, new: true });
            await sistemdb.findOneAndUpdate({}, { antireklam: false }, { upsert: true, new: true });
            await sistemdb.findOneAndUpdate({}, { günlükyetkiliverileri: false }, { upsert: true, new: true });
            await sistemdb.findOneAndUpdate({}, { günlükrolkaydetme: false }, { upsert: true, new: true });
            


            const emojis = [
                { name: "icibosorta", url: "https://cdn.discordapp.com/emojis/1206408359721308180.webp?size=96&quality=lossless" },
                { name: "icibossag", url: "https://cdn.discordapp.com/emojis/1206408361835495435.webp?size=96&quality=lossless" },
                { name: "icibossol", url: "https://cdn.discordapp.com/emojis/1206408363806822461.webp?size=96&quality=lossless" },
                { name: "icidoluorta", url: "https://cdn.discordapp.com/emojis/1206408364771512341.webp?size=96&quality=lossless" },
                { name: "icidolusol", url: "https://cdn.discordapp.com/emojis/1206408370299342878.webp?size=96&quality=lossless" },
                { name: "icidolusag", url: "https://cdn.discordapp.com/emojis/1206408369032658965.webp?size=96&quality=lossless" },
                { name: "904", url: "https://cdn.discordapp.com/emojis/1379047535703756862.webp?size=96"},
            ]

            emojis.forEach(async (x) => {
                if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db2.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
                const emoji = await interaction.guild.emojis.create({attachment: `${x.url}`, name: `${x.name}`});
                await db2.set(x.name, emoji.toString()); 
                console.log(`Emoji kurulumu başarıyla tamamlanmıştır.`)
  
              })
            
            await db.set(`kategoriid_`, `${category.id}`)




            await setupSchema.findOneAndUpdate({}, { staffodasi: ayarlanacakKanallar.id }, { upsert: true, new: true });
            await setupSchema.findOneAndUpdate({}, { isimistekkanal: isimistekkanal.id }, { upsert: true, new: true });
            await setupSchema.findOneAndUpdate({}, { permistekkanal: permistekkanal.id }, { upsert: true, new: true });
            await setupSchema.findOneAndUpdate({}, { mülakatseskanal: ayarlanacakKanallar.id }, { upsert: true, new: true });

            ayarlanacakKanallar.send(`> ** ${interaction.member} /sunucuayarla Komutundan, Lütfen Sunucunun Ayarlanmasına Devam Ediniz.**`)


            interaction.editReply({ components: [row1,row2,row3,row4,row5] });


    }
}