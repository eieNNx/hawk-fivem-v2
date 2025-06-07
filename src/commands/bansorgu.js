const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const Log = require("../models/Log.js")
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bansorgu")
        .setDMPermission(false)
        .setDescription("ID'sini Yazdığınız Kişinin Banını Sorgular.")
        .addStringOption(option =>
            option.setName("üyeid")
                .setDescription("Yazdığınız ID'ye Sahip Kişinin Banını Sorgular.")
                .setRequired(true)
                .setMinLength(18)
                .setMaxLength(18)
        ),

        run: async (client, interaction) => {
        const { channel, options } = interaction;
        let sunucuiconurl = config.sunucuiconurl
        let sunucubanner = config.sunucubanner
        let banhammer = config.banhammer
        let renk = config.renk

        const userId = options.getString("üyeid");

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);

        if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
       

        await interaction.deferReply()

        const embed = new EmbedBuilder()

        await client.users.fetch(userId).then(res => { if(!res){ 
    
            return interaction.editReply({ content: "> **Lütfen Geçerli Bir Discord ID Gir. \`❌\`**" }) 
              }
              else {
                  interaction.guild.bans.fetch().then(async(bans) => {
                      let ban = await bans.find(a => a.user.id === res.id)
                      if(!ban){
                        
                        return interaction.editReply({ content: `**\`${res.username}\` Sunucudan Daha Önce Yasaklanmamış \`❗\`**` })
                         
                      }
                      else {
                          let text = `${res.username} / \`${res.id}\` Adlı Kullanıcının Ban Sorgusu \`❗\`\n\n> **Ban Sebebi:** \`${ban.reason || "Belirtilmemiş."}\`\n`
                          interaction.guild.fetchAuditLogs({type: 22, limit: 100}).then(audit => {
                              let user = audit.entries.find(a => a.target.id === res.id)
                              if(user){
                                
                                embed.setDescription(`${text}\n> ${user.executor} / \`${user.executor.id}\` Tarafından <t:${parseInt(user.createdAt / 1000)}:R> Yasaklanmış \`🚫\``);
                               return interaction.editReply({ embeds: [embed]})
                              }
                          }
                          )
                      }
                    })
                }
            })

        
    }
}