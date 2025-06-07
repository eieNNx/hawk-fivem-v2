const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const config = require("../config.js");

const mongoose = require('mongoose');
mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    data: new SlashCommandBuilder()
    .setName("top")
    .setDMPermission(false)
    .setDescription("Sunucuda ki En Yüksek Ticket & Kayıt Yapan Yetkilileri Gösterir."),



        run: async (client, interaction) => {

          const yetkinyok = new EmbedBuilder()
          .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
          .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
          .setThumbnail(config.sunucuiconurl)
          .setTimestamp()
          .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
          .setColor(config.renk);
  
          if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


          let yetkiliekibi = `${config.yetkiliekibi}`

  async function getUserCoins(user) {
    const userID = user.id;
  
    // Veritabanından kullanıcının coin sayısını alın
    const coinRecord = await Coin.findOne({ userID });
    const coins = coinRecord ? coinRecord.coins : 0;
  
    return coins;
  }

  const guild = interaction.guild;

  const Coin = require('../models/coin');
  
  const userCoins = {};
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

      const embed = new EmbedBuilder()
      .setColor("BLACK")
      .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
      .setTitle('Ticket Puan Sıralaması')
      .setImage(`${config.sunucubanner}`)
      .setDescription(
        sortedUserCoins
          .map(([userID, coins], index) => `> **${index + 1}. <@${userID}> =>** __${coins} Puan__`)
          .join('\n\n')
      )
      .setTimestamp();


      const row = new ActionRowBuilder()
      .addComponents(
          new StringSelectMenuBuilder()
              .setCustomId('kayitpuan')
              .setPlaceholder(`Stat Kategorisini Seçiniz.`)
              .addOptions([
                  {
                      label: 'Kayıt Puanı',
                      description: 'Kayıt Puanın Sıralamasını Gösterir.',
                      value: 'kayitpuan',
                      emoji: "💾"
                  },
                  {
                    label: 'Seçenek Sıfırla',
                    description: 'Seçenekleri Sıfırlamanıza Yarar.',
                    value: 'sıfırlaa2',
                    emoji: `${config.emoji}`,
                  },

                ]),
      )

    interaction.reply({ embeds: [embed], components: [row], ephemeral: true});
  })



  


           
        }
      }