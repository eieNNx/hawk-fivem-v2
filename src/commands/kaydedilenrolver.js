const { SlashCommandBuilder, messageLink, PermissionFlagsBits, GuildMember } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const mongoose = require('mongoose');
mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });
const Role5 = require('../models/roleschema.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
  .setName("kaydedilenrolver")
  .setDMPermission(false)
  .setDescription("Kişiye Seçtiğiniz Rolü Verir.")
  .addRoleOption(option =>
       option
       .setName("rol")
       .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
       .setRequired(true)
  ),
  run: async (client, interaction) => {

   banhammer = config.banhammer

   await interaction.deferReply()

   const yetkinyok = new EmbedBuilder()
   .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
   .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
   .setThumbnail(config.sunucuiconurl)
   .setTimestamp()
   .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
   .setColor(config.renk);

    if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({ embeds: [yetkinyok], ephemeral: true });


      const rol = interaction.options.getRole("rol")


      const embed5555 = new EmbedBuilder()
      .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
      .setColor(config.renk)
      .setFooter({text: `Komut Kullanıcısı: ${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})

      
      const roles = await interaction.guild.roles.fetch();
      const roleNames = roles.map(role => role.name);
      
      const newRoleNames = roleNames.filter(name => name.startsWith(`${rol.name}`)); 
      
      const duplicateNewRoles = newRoleNames.filter((name, index) => newRoleNames.indexOf(name) !== index); 
      
      if (duplicateNewRoles.length > 0) {
          const owner = await interaction.guild.fetchOwner();
          const embed5555 = new EmbedBuilder()
              .setDescription(`> **Birden Fazla Aynı İsimli ${rol.name} Var Bu Komutu Kullanamazsın.** \`❌\`\n\n> **Aynı İsimli Rol Adı:** \`${duplicateNewRoles.join(", ")}\``);
          return interaction.editReply({ embeds: [embed5555] });
      }
      

Role5.find({ roleName: rol.name }, function (err, results) {
  if (err) {
    console.error(err);
  } else {
    results.forEach(function(result) {
        result.roleID = rol.id;
        result.save(function(err) {
          if (err) {
            console.error("Hata: ", err);
          } else {
            console.log("Rol ID Başarıyla Güncellendi.");
          }
        });
      
    });
  }
});

await wait(4_000);

try {
   
const rolgerekli = await Role5.findOne(
  { roleID: rol.id },
  { userID: 1 } 
);

if (!rolgerekli) {
  embed5555.setDescription(`> **Belirttiğiniz ${rol} İsimli Rol Daha Önce Kaydedilmemiş \`❌\`**\n\n**Lütfen Kaydedilen Eski Rol İsminin Aynısını Yapmayı Unutma \`❗\`(Tıpatıp Aynısı Olması Gerek.)**\n\n**Eğer Bu Rolü Hiç Kaydetmediysen \`/dbrolkaydet\` Komutunu Kullanabilirsin.**`);
return interaction.editReply({embeds: [embed5555]})
}

const users = rolgerekli.userID;
let foundUsersCount = 0;
let sunucudaolmayankayıtlısayısı = 0;

if(users.length === 0) {
  embed5555.setDescription(`> **Maalesef Bu Role Kayıtlı Kullanıcı Bulunamadı \`❗\`**`);
  return interaction.editReply({embeds: [embed5555]})
}

for (const userId of users) {
  const member = interaction.guild.members.cache.get(userId);

  if (member) {
    // Kullanıcının rol üzerinde olup olmadığını kontrol et
    if (member.roles.cache.has(rol.id)) {
      console.log(`Kullanıcı Zaten Bu Role Sahip: ${userId}`);

    } else {
      foundUsersCount++;
      // Kullanıcıya rolü ekle
      member.roles.add(rol)
        .catch(console.error);
    }
  } else {
    console.error(`Kullanıcı Bulunamadı: ${userId}`);
    sunucudaolmayankayıtlısayısı++;
  }
}

if (foundUsersCount === 0) {
  embed5555.setDescription(`> **Sunucuda Bulunan Hiçbir Kullanıcı Role Eklenemedi.**\n\n**Çünkü Kaydedilen Kullanıcılarda Zaten ${rol} İsimli Rol Mevcut**`)
  interaction.editReply({embeds: [embed5555]});
} else {
  embed5555.setDescription(`> **Kaydedilen Kullancılardan Toplam __${foundUsersCount}__ Adet Sunucuda Bulunan Kullanıcılara Başarıyla ${rol} İsimli Rol Veriliyor.**\n\n** Sunucuda Olmayan Kişi Sayısı __${sunucudaolmayankayıtlısayısı}__**`);
  embed5555.setTitle(`İşlem Zaman Alabilir \`❗\``)
  interaction.editReply({embeds: [embed5555]});
}

} catch (error) {
console.log(`Kaydedilenrolver Komutunda Sorun Oluştu ${error}`)
return interaction.reply(`Üzgünüm Bir Sorun Oluştu Hawk Development ile İletişime Geçin. \`💥\``) 
}

    }

  }