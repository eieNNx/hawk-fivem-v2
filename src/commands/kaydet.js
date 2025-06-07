const { SlashCommandBuilder, messageLink, PermissionFlagsBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { rename } = require('fs');
const config = require("../config.js");
const Kayit = require('../models/kayit');
const GunlukKayit = require('../models/gunlukkayit.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const HexModel = require('../models/hex.js');
const KayıtlıHex = require('../models/kayıtlıhexschema.js')
const Log = require('../models/Log.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("kaydet")
    .setDMPermission(false)
    .setDescription("Kişiyi Sunucuya Kaydeder.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Sunucuya Kaydetmek İstediğiniz Üye")
    .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("steamhex")
        .setDescription("Steam Hex'ini Atınız.")
        .setRequired(true)
        
    ),
    run: async (client, interaction) => {

        let sunucuiconurl = config.sunucuiconurl
        let yetkiliekibi = config.yetkiliekibi
        let kayıtsızrol = config.kayıtsızüyepermi
        let renk = config.renk
  
        const user = interaction.options.getUser("üye");
        let steamhex = interaction.options.getString("steamhex");
        const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);


        await interaction.deferReply()

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.yetkiliekibi}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
        if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });

        const errEmbed = new EmbedBuilder()
        .setDescription(`**Merhaba \`❗\` ${interaction.member} Belirttiğiniz ${member} İsimli Kullanıcıyı Kayıt Edemezsiniz. \`❌\`**`)

        const errEmbed2 = new EmbedBuilder()
        .setDescription(`**Merhaba \`❗\` ${interaction.member} Belirttiğiniz ${member} Kullanıcıyı Kaydetmeye Yetkim Yetmiyor. \`❌\`**`)

        const bot = interaction.guild.members.cache.get(client.user.id);
        const botrole = bot.roles.highest;
        const komutkullanankisi = interaction.member.roles.highest;

        if (botrole.position <= member.roles.highest.position) 
        return interaction.editReply({ embeds: [errEmbed2], ephemeral: true });

        if (komutkullanankisi.position <= member.roles.highest.position) 
        return interaction.editReply({ embeds: [errEmbed], ephemeral: true });


          if(steamhex.length != 15 && steamhex.length != 21 ) {
            return interaction.editReply({content: `> **Lütfen Hex Verisini Bu Formatla Girmeye Özen Gösterin \`❗\` \`steam:1100001000056ba\` / \`1100001000056ba\`**`, ephemeral: true})
          }


          const kayitliHex = await HexModel.findOne({ hex: steamhex });
      
          if (kayitliHex) {
            return interaction.editReply(`> ** ${member} İçin Belirttiğiniz __${steamHex}__ Verisi Daha Önce Yasaklanmış. Kaldırmak İçin /yasaklıhexkaldır Komutunu Kullan.**`);
          }

          const kayitLogs = await Log.find({}, 'kayitLog');
          if (kayitLogs.length === 0) {
              return interaction.editReply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
          }
          const kayitkanalid = kayitLogs.map(log => log.kayitLog)
    
          const kayitkanalımız = kayitkanalid.join(', ')
          
          const kanal = interaction.guild.channels.cache.get(kayitkanalımız)
          if(!kanal) return interaction.editReply({content: `> **\`kayit-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``, ephemeral: true})
  

        let userID = interaction.member.id
        const puan = 1;

        let kayit = await Kayit.findOne({ userID });
  
        if (!kayit) {
          kayit = new Kayit({ userID, kayits: puan });
        } else {
          kayit.kayits += puan;
        }
  
        await kayit.save();
     
        let gunlukkayit = await GunlukKayit.findOne({ userID });
  
        if (!gunlukkayit) {
          gunlukkayit = new GunlukKayit({ userID, gunlukkayits: puan });
        } else {
          gunlukkayit.gunlukkayits += puan;
        }
  
        await gunlukkayit.save();

        const existingDocument = await KayıtlıHex.findOne({ discordId: member.id });

        let desc = ""

        if (existingDocument) {
            await KayıtlıHex.findOneAndReplace({ discordId: member.id }, { discordId: member.id, kayıtlıhex: steamhex });
            desc += `> **Sunucuya Daha Önce \`${existingDocument.kayıtlıhex} ✅\` Hex Verisi İle Kayıt Olmuş!**`

        } else {
            await KayıtlıHex.create({ discordId: member.id, kayıtlıhex: steamhex });
            desc += `> **Sunucuya Daha Önce Kayıt Olmamış! \`❌\`**`
        }

        const KAYITLI2 = new EmbedBuilder()
        .setColor(renk)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setDescription(`> **\`✅\` Başarıyla ${user} Adlı Kişiyi Sunucuya Kaydettim.**\n\n> **Kaydedilen Hex:** \`${steamhex}\`\n\n> **Kayıt Puanın:** \`${kayit.kayits}\`\n\n${desc}`)
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setTimestamp()

        const KAYITLI = new EmbedBuilder()
        .setColor(renk)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setTimestamp()

        await member.setNickname("IC ISIM / OOC ISIM")
        await member.roles.add(config.whitelistpermi)
        await member.roles.remove(kayıtsızrol)
        
        KAYITLI.setDescription(`> **\`✅\` Başarıyla ${user} Adlı Kişiyi Sunucuya Kaydettim.**\n\n> **Kayıt Eden Yetkili:** ${interaction.member} **/** ${interaction.member.id}\n\n> **Kaydedilen Hex:** \`${steamhex}\`\n\n> **Kayıt Puanın:** \`${kayit.kayits}\`\n\n${desc}`)

        await interaction.editReply(
            { embeds: [KAYITLI], ephemeral: true }
            )
            await kanal.send(
                { embeds: [KAYITLI2] }
                )
    
    }









}