const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits,PermissionsBitField,ChannelType, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDMPermission(false)
        .setDescription("Yazdığınız Mesajı Bot Embed Şeklinde Yazar!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("mesaj")
                .setDescription("Yazılması İstenen Mesajı Yazınız.")
                .setRequired(true)
        ).addStringOption(option =>
            option
            .setName("başlık")
            .setDescription("Embed Başlığı")
            .setRequired(false)
        )
        .addStringOption(option =>
            option
            .setName("resimlink")
            .setDescription("Resim linki")
            .setRequired(false)
        ).addStringOption(option =>
            option
            .setName("küçükresimlink")
            .setDescription("Küçük Resim linki")
            .setRequired(false)
        ).addStringOption(option =>
            option
            .setName("altbilgi")
            .setDescription("Resim linki")
            .setRequired(false)
        ).addStringOption(option =>
            option
            .setName("renk")
            .setDescription("Resim linki")
            .setRequired(false)
        ),


        run: async (client, interaction, args, message) => {

        const channel = interaction.channel;
        if (interaction.channel.type != 0) return interaction.reply({ content: "Embed Mesajını Göndermem İçin Komutu **Metin Kanalında** Kullanman Gerekiyor. \`❌\`", ephemeral: true });

        const yetkinyok = new EmbedBuilder()
        .setDescription(`> **Bu Komutu Kullanabilmek İçin <@&${config.banhammer}> Rolüne Sahip Değilsin!** \`❌\``)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
        .setThumbnail(config.sunucuiconurl)
        .setTimestamp()
        .setFooter({text: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        .setColor(config.renk);
        
        if(!interaction.member.roles.cache.get(config.banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
  


        let mesaj = interaction.options.getString("mesaj");
        let başlık = interaction.options.getString("başlık");
        let resimlink = interaction.options.getString("resimlink");
        let küçükresimlink = interaction.options.getString("küçükresimlink");
        let altbilgi = interaction.options.getString("altbilgi");
        let renk = interaction.options.getString("renk");

        const embed = new EmbedBuilder()

        const gönderilenembedler = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
        .setTimestamp()
        let gönderme = ""

try {
    if(resimlink) {
        if (/^(http[s]?:\/\/.*\.(?:png|jpg|gif|jpeg))/i.test(resimlink)) {
            gönderme += `> **Resim Seçeneği Başarıyla Eklendi.** \`✅\`\n`
            embed.setImage(resimlink);
        } 
        else return interaction.reply({ content: "Belirttiğiniz Resim URL'si Geçersiz. \`❌\`", ephemeral: true })
    }
                 
    if(renk) {
        if (/^#[0-9A-F]{6}$/i.test(renk)) {
            gönderme += `> **Renk Seçeneği Başarıyla Eklendi.** \`✅\`\n`
            embed.setColor(renk);
        }
            else return interaction.reply({ content: "Belirttiğiniz Renk Hex Kodu Geçersiz. \`❌\` **Örnek Kullanım:** \`#ffffff\`", ephemeral: true });
    }
    if(küçükresimlink){
                if (/^(http[s]?:\/\/.*\.(?:png|jpg|gif|jpeg))/i.test(küçükresimlink)) {
                    gönderme += `> **Küçük Resim Seçeneği Başarıyla Eklendi.** \`✅\`\n`
                    embed.setThumbnail(küçükresimlink);
                }
                else return interaction.reply({ content: "Belirttiğiniz Küçük Resim Link URL'si Geçersiz. \`❌\`", ephemeral: true });
    }
    if(altbilgi){
        if(altbilgi.length < 50) {
            gönderme += `> **Alt Bilgi Seçeneği Başarıyla Eklendi.** \`✅\`\n`
            embed.setFooter({text: `${altbilgi}`})
        }
        else return interaction.reply({ content: "Belirttiğiniz Alt Bilgi Kelimesi Çok Uzun. Maksimum 50 Karakter. \`❌\`", ephemeral: true });
    }
    if(başlık){
        if(başlık.length < 40) {
            gönderme += `> **Başlık Seçeneği Başarıyla Eklendi.** \`✅\`\n`
            embed.setTitle(başlık)
        }
        else return interaction.reply({ content: "Belirttiğiniz Başlık Kelimesi Çok Uzun. Maksimum 30 Karakter. \`❌\`", ephemeral: true });
    }
                
                 
    embed.setDescription(mesaj)
    gönderilenembedler.setDescription(gönderme)

                channel.send({ embeds: [ embed ] });
            interaction.reply({ embeds: [gönderilenembedler], ephemeral: true });

} catch (error) {
    return interaction.reply(`Üzgünüm Bir Sorun Oluştu 904'e Söyle. \`💥\``) 

}


    
    
    }
}





