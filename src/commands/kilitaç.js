const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits,PermissionsBitField, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kilitaç")
        .setDMPermission(false)
        .setDescription("Kanalın Kilidinin Açar."),





        run: async (client, interaction, args, message) => {
   
            let sunucuiconurl = config.sunucuiconurl
            let banhammer = config.banhammer
            let renk = config.renk
            
            await interaction.deferReply()


            /*
            if(!interaction.guild.roles.cache.get(whitelistedrol)) return interaction.editReply(`> **Whitelisted Rolünü Sunucuda Bulamadım \`❗\`**`)
            if(!interaction.guild.roles.cache.get(banhammer)) return interaction.editReply(`> **Üst Yetkili Rolünü Sunucuda Bulamadım \`❗\`**`)
            if(!/^#[0-9A-F]{6}$/i.test(renk) || !renk) return interaction.editReply(`> **\`Hex Color\` Renk Seçimi Yapılmamış.\`❗\`**`)
*/
            
            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
    
            if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });

    if (interaction.channel.permissionsFor(config.kayıtsızüyepermi).has("SendMessages")) {

     
        const ticket2 = new EmbedBuilder()
        .setColor(renk)
        .setTitle(`${interaction.channel} Kanalı Zaten Kilitli Değil!`)
        .setDescription(`Kilitlemek için \`/kilit kilitle\` yazabilirsin.`)
        .setTimestamp()
        .setFooter({text: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})
  

        return interaction.editReply({embeds: [ticket2]})


    }

    interaction.channel.permissionOverwrites.edit(config.kayıtsızüyepermi, {
        SendMessages: true,
      });

      const ticket = new EmbedBuilder()
      .setColor(renk)
      .setTitle(`${interaction.channel} Kanalının Kilidi Açıldı!`)
      .setDescription(`Kilitlemek İçin => \`/kilitle\` Komudu Kullan!`)
      .setTimestamp()
      .setFooter({text: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})


    interaction.editReply({embeds: [ticket]})

  
        }
    }