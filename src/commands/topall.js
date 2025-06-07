const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const config = require("../config.js");
const mongoose = require('mongoose');
mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("topall")
    .setDMPermission(false)
    .setDescription("Sunucuda ki En Yüksek Ticket & Kayıt Yapan Yetkilileri Gösterir."),



        run: async (client, interaction) => {
          let yetkiliekibi = config.yetkiliekibi
          let sunucubanner = config.sunucubanner
          let renk = config.renk
          let emoji = config.emoji


          const yetkinyok = new EmbedBuilder()
          .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
          .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
          .setThumbnail(config.sunucuiconurl)
          .setTimestamp()
          .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
          .setColor(config.renk);
  
          if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


          async function getUserKayits(user) {
            const userID = user.id;
            
            // Veritabanından kullanıcının kayıt sayısını alın
            const kayitRecord = await Kayit.findOne({ userID });
            const kayits = kayitRecord ? kayitRecord.kayits : 0;
            
            return kayits;
          }

  async function getUserCoins(user) {
    const userID = user.id;
  
    // Veritabanından kullanıcının coin sayısını alın
    const coinRecord = await Coin.findOne({ userID });
    const coins = coinRecord ? coinRecord.coins : 0;
  
    return coins;
  }

  const guild = interaction.guild;

  const Coin = require('../models/coin');
  const Kayit = require('../models/kayit.js');

  const userCoins = {};
  const userKayits = {};
  const usersWithModeratorRole = guild.members.cache.filter(member => member.roles.cache.has(yetkiliekibi)).map(member => member.user.id);

  Coin.find({ userID: { $in: usersWithModeratorRole } }).then(coins => {
    coins.forEach(coin => {
      if (!userCoins[coin.userID]) {
        userCoins[coin.userID] = coin.coins;
      } else {
        userCoins[coin.userID] += coin.coins;
      }
    });

    const sortedUserCoins = Object.entries(userCoins)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15);
  
      if (sortedUserCoins.length === 0) {
        return interaction.reply({content: '**Kimsenin Ticket Puanı Yok Listeliyemem.**', ephemeral: true});
      }

      Kayit.find({ userID: { $in: usersWithModeratorRole } }).then(kayits => {
        kayits.forEach(kayit => {
          if (!userKayits[kayit.userID]) {
            userKayits[kayit.userID] = kayit.kayits;
          } else {
            userKayits[kayit.userID] += kayit.kayits;
          }
        });
      
        const sortedUserKayits = Object.entries(userKayits)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 15);
      
        if (sortedUserKayits.length === 0) {
          return interaction.reply({content: '**Kimsenin Kayıt Puanı Yok Listeliyemem.**', ephemeral: true});
        }
      
        // ...
      
        const embed = new EmbedBuilder()
          .setColor(renk)
          .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
          .setTitle('Kayıt ve Ticket Puan Sıralaması')
          .setImage(`${sunucubanner}`)
          .setDescription(
            sortedUserKayits
              .map(([userID, kayits], index) => `> **${index + 1}. <@${userID}>**Kayıt Puanı: __${kayits}__ **/** Ticket Puanı: __${userCoins[userID]}__`)
              .join('\n\n')
          )
          .setTimestamp();
      
        interaction.reply({ embeds: [embed]});
      });


  })




           
        }
      }