const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const Log = require("../models/Log.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDMPermission(false)
        .setDescription("Kişiyi Sunucudan Banlar..")
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Sunucudan Banlamak İstediğiniz Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Sunucudan Banlama Sebebini Yazınız.")
                .setRequired(true)
        ),

        run: async (client, interaction) => {


            let sunucuiconurl = config.sunucuiconurl
            let sunucubanner = config.sunucubanner
            let banhammer = config.banhammer
            let renk = config.renk
 

        const { channel, options } = interaction;

        const user = options.getUser("üye");
        const reason = options.getString("sebep") || "Sebep Belirtilmedi!";

        await interaction.deferReply()

        try {
        const member = await interaction.guild.members.fetch(user.id);




            const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
    
            if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });


            const errEmbed = new EmbedBuilder()
            .setDescription(`**Merhaba \`❗\` ${interaction.member} Belirttiğiniz ${member} İsimli Üyeyi Banlamaya Yetkiniz Yetmiyor. \`❌\`**`)
    
            const errEmbed2 = new EmbedBuilder()
            .setDescription(`**Merhaba \`❗\` ${interaction.member} Maalesef Banlamak İçin Yeterli Yetkim Yok. \`❌\`**`)

            const bot = interaction.guild.members.cache.get(client.user.id);
            const botrole = bot.roles.highest;
            const komutkullanankisi = interaction.member.roles.highest;
    
            if (botrole.position <= member.roles.highest.position) 
            return interaction.editReply({ embeds: [errEmbed2], ephemeral: true });
    
            if (komutkullanankisi.position <= member.roles.highest.position) 
            return interaction.editReply({ embeds: [errEmbed], ephemeral: true });


            const banLogs = await Log.find({}, 'banLog');
            if (banLogs.length === 0) {
                return interaction.editReply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
            }
            const bankanalid = banLogs.map(log => log.banLog)
      
            const bankanalımız = bankanalid.join(', ')
            
            const kanal = interaction.guild.channels.cache.get(bankanalımız)
            if(!kanal) return interaction.editReply({content: `> **\`ban-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``, ephemeral: true})
    

        await member.ban({ reason });

        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setTitle(`Banlama İşlemi Başarılı \`✅\``)
        .setDescription(`**Sunucudan Banlandı \`❗\`** ${user}\n\`\`\`${user.id}\`\`\`\n **Banlayan Yetkili:** ${interaction.member}\n\`\`\`${interaction.member.id}\`\`\`\n**Sebep:** \`${reason}\``)
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setColor(renk)
            .setImage(`https://media.discordapp.net/attachments/1044346249182191639/1054379960418185348/thor-ban.gif?width=574&height=239`)
            .setTimestamp()
            .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})

        await interaction.editReply({
            embeds: [embed]
        })
        const banla = new EmbedBuilder()
        .setColor(renk)
        .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
        .setDescription(`**Sunucudan Banlandı \`❗\`** ${user}\n\`\`\`${user.id}\`\`\`\n **Banlayan Yetkili:** ${interaction.member}\n\`\`\`${interaction.member.id}\`\`\`\n**Sebep:** \`${reason}\``)
        .setImage(`${sunucubanner}`)
        .setTimestamp()

        await kanal.send(
           { embeds: [banla] }
           )
        
        
        }catch (err) {
            const errEmbed2 = new EmbedBuilder()
            .setDescription(`**Belirttiğiniz Kişiyi Sunucuda Bulamadım \`❌\`**`)
            interaction.editReply({ embeds: [errEmbed2] })

        }

        


    }
}