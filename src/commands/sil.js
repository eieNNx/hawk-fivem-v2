const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder, PermissionsBitField} = require('discord.js');
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sil")
    .setDMPermission(false)
    .setDescription("Kullandığınız Kanalda Belirttiğiniz Sayı Kadar Mesaj Siler.")
    .addIntegerOption(option =>
        option.setName('sayı')
        .setDescription('Seçtiğin Sayı Kadar Siler.')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('kişi')
        .setDescription('Seçtiğiniz Kişinin Belirttiğiniz Sayı Kadar Mesajını Siler.')
        .setRequired(false)
        ),
        botPermissions: [PermissionFlagsBits.ManageMessages],

        run: async (client, interaction) => {

            let banhammer = config.banhammer
            let renk = config.renk
        

            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
            .setThumbnail(config.sunucuiconurl)
            .setTimestamp()
            .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor(config.renk);
            if(!interaction.member.roles.cache.get(`${config.banhammer}`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
      
      
        const {channel, options} = interaction;

        let amount = options.getInteger('sayı');
        const target = options.getUser("kişi");
        const multiMsg = amount === 1 ? "Mesaj": "Mesajları"


        try {
            await interaction.deferReply({ephemeral: true})
            const channelMessages = await channel.messages.fetch()

            if(channelMessages.size === 0) {
                return await interaction.editReply({content: `**Bu Kanalda Herhangi Bir Mesaj Bulunumadı.**`})
            }

            if(amount > channelMessages.size) amount = channelMessages.size

            const clearembed = new EmbedBuilder().setColor(config.renk)
            let desc = ""
            let messagesToDelete = [];
            if(target) {
                let i = 0;
                channelMessages.forEach((m) => {
                    if(m.author.id === target.id && messagesToDelete.length < amount){
                        messagesToDelete.push(m);
                        i++;
                    }
                })
                desc+= `\`✅\` Başarıyla ${channel} Kanalında ${target} Adlı Kişinin \`${messagesToDelete.length}\` Adet ${multiMsg} Silindi!`
            } else
                {
                    messagesToDelete = channelMessages.first(amount)
                    desc+= `\`✅\` Başarıyla ${channel} Kanalında \`${messagesToDelete.length}\` Adet ${multiMsg} Silindi!`
                }
                if(messagesToDelete.length > 0) {
                    await channel.bulkDelete(messagesToDelete, true)
                }
                clearembed.setDescription(desc)
                await interaction.editReply({embeds: [clearembed]})

        } catch (error) {
            return console.log(error);

        }

    }
}