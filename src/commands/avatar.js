const {ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName("avatar")
    .setDMPermission(false)
    .setType(ApplicationCommandType.User),

        run: async (client, interaction, guild) => {
            
            const target = await interaction.guild.members.fetch(interaction.targetId)
            const embed = new EmbedBuilder()
            .setImage(target.user.displayAvatarURL({dynamic: true, size: 2048}))
        
        await interaction.reply({embeds: [embed], ephemeral: true})
        
        }
    }
