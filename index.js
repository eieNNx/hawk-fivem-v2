const { Client,Events, Collection,PermissionsBitField,AuditLogEvent, WebhookClient, MessageAttachment ,GuildAuditLogEntryCreate, ChannelSelectMenuBuilder,ChannelType ,GatewayIntentBits, AttachmentBuilder , ButtonBuilder, ButtonStyle, Partials,StringSelectMenuBuilder ,EmbedBuilder, ActionRow, ActionRowBuilder,  ContextMenuCommandBuilder, SystemChannelFlagsBitField, ModalBuilder, TextInputBuilder, bold } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const db2 = require("nrc.db");
const sistemdb = require("./src/models/sistemdb.js")
const webhook = new WebhookClient({
	url: "https://discord.com/api/webhooks/1341828506564431942/7XoZcwGPc2vPio6471R_lDGDcLt-Zs95QitmNgwPnw60lnEp5suEjMowh3aiAIWf2__O",
  });
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const axios = require('axios')
const { inspect } = require("util");
const fs = require('fs');
let request = require(`request`);
const ftp = require('basic-ftp');
const Discord = require('discord.js')
const ms = require("ms")
const discordTranscripts = require('discord-html-transcripts');
const fetch = require('node-fetch'); 
const moment = require("moment");
const mongoose = require('mongoose');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
let token = config.token
let mongourl = config.mongourl
const KayıtlıHex = require('./src/models/kayıtlıhexschema.js');
const Log = require('./src/models/Log.js');
const wait = require('node:timers/promises').setTimeout;

const { createCanvas, loadImage } = require('canvas');

function drawCircle(ctx, x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
}


let sunucuiconurl = config.sunucuiconurl
let sunucubanner = config.sunucubanner
let botid = config.botid
let sunucuismi = config.sunucuismi
let banhammer = config.banhammer
let renk = config.renk
let oyundankareler = config.oyundankareler
let emoji = config.emoji
let botbağlanmases = config.botbağlanmases
let fivemlink = config.fivemlink
let isimistekkanal = config.isimistekkanal
let ts3link = config.ts3link
let sunucuip = config.sunucuip
let ts3ip = config.ts3ip
let yetkiliekibi = config.yetkiliekibi
let mülakatseskanal = config.mülakatseskanal
let kayıtsızüyepermi = config.kayıtsızüyepermi
let whitelistpermi = config.whitelistpermi



client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

const Coin = require('./src/models/coin');
const Kayit = require('./src/models/kayit');
const GunlukCoin = require('./src/models/gunlukcoin.js');
const GunlukKayit = require('./src/models/gunlukkayit.js');

const commands = [];


readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {		
	 		await rest.put(
					Routes.applicationCommands(client.user.id),
					{ body: commands },
				);
            
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} ${commands.length} Komutla Birlikte Aktif Edildi! (904 Development)`);
})

readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})








client.on('interactionCreate', async interaction => {

	if (interaction.isButton()) {
	
		if(interaction.customId === "meslekkodları")
		{
			const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('itemkodları')
              .setLabel('İtem Komutları')
              .setStyle(ButtonStyle.Secondary),
			  new ButtonBuilder()
			  .setCustomId('adminkodları')
			  .setLabel('Admin Komutları')
			  .setStyle(ButtonStyle.Secondary),
			  )

			  let meslek = new EmbedBuilder()
			  .setColor("0a0a0a")
			  .setDescription(`**---------- GENEL MESLEK KODLARI ----------
		
				-Doktor................................./meslekver İD ambulance 1-4
				-Galerici.............................../meslekver İD cardealer 1-4
				-Mekanik................................/meslekver İD mechanic 1-4
				-Emlakçı................................/meslekver İD realestate 0-4
				-Polis................................../meslekver İD police 1-10
				-Sherif................................./meslekver İD sheriff 1-7
				-Blackmarket............................/meslekver İD blackmarket 0-1
				-Tekila................................./meslekver İD tequila 0-1
				-Unicorn................................/meslekver İD unicorn 0-1
				-Esrar Satış............................/meslekver İD esrarci 0-1
				-Meth Satış............................./meslekver İD meth 0-1
				-İşsiz................................../meslekver İD unemployed 0-1
				-Taxi.................................../meslekver İD taxi 0-4
				-Smg,pistol ve rifle mermi satış......../meslekver İD pistolmermici 0-1
				-iskele cafe permi: cafeshop 0/1
				-bean machine permi : beanmachine 0/1
				-Bahama................................./meslekver İD bahamamas 0-1**`)

				await interaction.update({embeds: [meslek], components: [row] });

		}

		if(interaction.customId === "adminkodları")
		{

			const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('itemkodları')
              .setLabel('İtem Komutları')
              .setStyle(ButtonStyle.Secondary),
			  new ButtonBuilder()
			  .setCustomId('meslekkodları')
			  .setLabel('Meslek Kodları')
			  .setStyle(ButtonStyle.Secondary),
      )
     
	  let adminkodları = new EmbedBuilder()
        .setColor("0a0a0a")
          .setDescription(`**---------- GENEL ADMİN KOMUTLARI ----------

          -/canlandir SAYI
          -/cardel SAYI
          -/kamubitir İD
          -/yargı İD (Hile olmadığı sürece kullanımı tavsiye edilmez)
          -/ban İD
          -/kickle İD
          -/crash İD (crash attırır kullanımı tavsiye edilmez, hile kullananlar için yapılır)
          -/reportr İD mesaj
          -/rev İD (Can barını doldurur)
          -/slay İD (Can barınısı sıfırlar)
          -/a mesaj (admin chat)
          -/bring İD (Kişiyi yanına çeker)
          -/bringback İD (yanına çektiğin kişiyi çektiğin yere geri gönderir)
          -/paraver İD cash/bank miktar
          -/itemver - İD - item kodu - Miktar (./itemver 10 phone 1 şeklinde)
          -/araba [araba kodu]
          -/aracmenu (Donate araçları verirken kullanılır)
          -/transfervehicle İD plaka
          -/envantertemizle İD (kendi envanterini temizler)
          -/dv (Arabayı DV'ler)
          -/yetkiver İD mod/admin/god 
          -/wladd [Hex] (WL ekler)
          -/wldel [Hex] (WL siler)
          -/wlrefresh (Hex listesi yenileme)
          -/fix (araba tamir eder)
          -/admincar (Şoför koltugunda olduğunuz arabayı garajınıza ekler) 
          -/adminanahtar (şoför koltuğunda olduğunuz aracın anahtarını verir)
          -/silahtamir 100 (Silahı %100 tamir eder)
          -/mermiver 250 (Silahın mermisini doldurur)
          -/announce metin (Sistem duyurusu geçme) 
          -/isimdegistir id <ADAMIN IDsi> İsim Soyisim (Oyuncuyua CK PK atmadan ismini değiştirmek için kullanılır) [GOD gerekli]
          
          -/duvaritemizle (Spray scripti için küfür ve rahatsız edici kelimeler yazıldığında tek bir sprayi temizlemek için kullanılacak komut)
          -/butunduvaritemizle (Eğer sunucudaki bütün duvarlar temizlenecekse kullanılacak komut)**`)

		await interaction.update({embeds: [adminkodları], components: [row] });

		}

	  if (interaction.customId === 'itemkodları') {

		const row2 = new ActionRowBuilder()
		.addComponents(
		new ButtonBuilder()
		.setCustomId('adminkodları')
		.setLabel('Admin Komutları')
		.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
		.setCustomId('meslekkodları')
		.setLabel('Meslek Kodları')
		.setStyle(ButtonStyle.Secondary),
		)
	

		let itemkodları = new EmbedBuilder()
		.setColor("0a0a0a")
		  .setDescription(`**---------- GENEL İTEM KODLARI ----------
  
		  Silahlar:
		  
		  -/itemver İD weapon_combatpistol 1 (illegal pistol)
		  -/itemver İD weapon_pistol50 1 (Deagle)
		  -/itemver İD weapon_microsmg 1 (İllegal UZİ)
		  -/itemver İD weapon_minismg 1 (İllegal mini SMG)
		  -/itemver İD weapon_assaultrifle 1 (uzun ak)
		  -/itemver İD weapon_compactrifle 1 (kısa ak)
		  -/itemver İD weapon_doubleaction 1 (Altın revolver)
		  -/itemver İD weapon_glock 17 (pistol glock
		  -/itemver İD weapon_knife 1 (Bıçak)
		  -/itemver İD weapon_switchblade (switchbalde bıçak)
		  -/itemver İD weapon_bat 1 (Beyzbol Sopası)
		  -/itemver İD weapon_pistol 1 (PD pistol)
		  -/itemver İD weapon_appistol 1 (PD ap pistol)
		  -/itemver İD weapon_pistol_mk2 1 (PD mk2 tabanca)
		  -/itemver İD weapon_microsmg (Uzi)
		  -/itemver İD weapon_minismg (Mini smg)
		  -/itemver İD weapon_smg 1 (PD smg)
		  -/itemver İD weapon_combatpdw 1 (PD pdw)
		  -/itemver İD weapon_carbinerifle 1 (PD rifle)
		  -/itemver İD weapon_carbinerifle_mk2 1 (PD rifle)
		  -/itemver İD weapon_gusenberg 1 (Tommy Gun)
		  -/itemver İD weapon_machinepistol 1 (tec9)
		  -/itemver İD assaultrifle_extendedclip 1 (1x şarjör)
		  -/itemver İD pistol_extendedclip 1 (1x şarjör)
		  -/itemver İD rifle_suppressor (susturucu)
		  -/itemver İD pistol_suppressor (susturucu)
		  -/itemver İD assaultrifle_drum (2x şarjör)
		  -/itemver İD rifle_flashlight (fener )
		  -/itemver İD carbinerifle_scope(dürbün)
		  -/itemver İD machinepistol_drum    - uzi uzatılmış
		  -/itemver İD smg_defaultclip  - uzi dürbün
		  
		  Mermiler:
		  
		  -/itemver İD pistol_ammo miktar
		  -/itemver İD rifle_ammo miktar
		  -/itemver İD smg_ammo miktar
		  -/itemver İD shotgun_ammo miktar
		  -/itemver İD mg_ammo miktar
		  
		  Blackmarket Ürünler:
		  
		  -/itemver İD radio (telsiz)
		  -/itemver İD karaborsaradio (karaborsa telsiz)
		  -/itemver İD armor (zırh)
		  -/itemver İD heavyarmor (ağır zırh)
		  -/itemver İD lockpick (maymuncuk)
		  -/itemver İD advancedlockpick (gelişmiş maymuncuk)
		  -/itemver İD handcuffs (kelepçe)
		  -/itemver İD handcuffkey (kelepçe anahtarı)
		  -/itemver İD parachute (paraşüt)
		  -/itemver İD nitrous (nitro)
		  
		  Diğer İtemler: 
		  
		  -/itemver İD bandage miktar (bandaj)
		  -/itemver İD phone miktar (telefon)
		  -/itemver İD lithium miktar (lityum batarya)
		  -/itemver İD acetone miktar (aseton)
		  -/itemver İD markedbills miktar (karapara)**`)		


		await interaction.update({embeds: [itemkodları], components: [row2] });
	  }
	}
  });




client.on(Events.InteractionCreate, async interaction =>{

	if(!interaction.isStringSelectMenu()) return;



	if(interaction.customId === "kayitpuan") {

		if (interaction.values[0] == "sıfırlaa2") {
			interaction.update({})
			return
		}
		async function getUserKayits(user) {
			const userID = user.id;
		  
			const kayitRecord = await Kayit.findOne({ userID });
			const Kayits = kayitRecord ? kayitRecord.Kayits : 0;
		  
			return Kayits;
		  }
		
		  const guild = interaction.guild;
		
		  
		  const userKayits = {};
		  const usersWithModeratorRole = guild.members.cache.filter(member => member.roles.cache.has(yetkiliekibi)).map(member => member.user.id);
		
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
		
			  const embed = new EmbedBuilder()
			  .setColor(`BLACK`)
			  .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
			  .setTitle('Kayıt Puan Sıralaması')
			  .setImage(`${sunucubanner}`)
			  .setDescription(
				sortedUserKayits
				  .map(([userID, kayits], index) => `> **${index + 1}. <@${userID}> =>** __${kayits} Puan__`)
				  .join('\n\n')
			  )
			  .setTimestamp();
		
		
		
			interaction.update({ embeds: [embed], components: [], ephemeral: true });



	})
}


if(interaction.customId === "logkanalları") {

	const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('iptaletme')
					.setLabel('Geri Dön ❗')
					.setStyle(ButtonStyle.Secondary),
			)

	if (interaction.values[0] === "select_ticket-kategori") {
 			const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_ticket-kategori')
                .addChannelTypes(ChannelType.GuildCategory)
                .setPlaceholder('Ticket Kategori Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
		
           await interaction.update({ components: [row, row2]})     
	}
	
	if (interaction.values[0] === "select_ticket-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_ticket-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ticket Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})       
	}
	
	if (interaction.values[0] === "select_kayıt-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_kayıt-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Kayıt Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})   
	}
	
	if (interaction.values[0] === "select_whitelistçıkış-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_whitelistçıkış-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Whitelist Çıkış Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})    
	}
	
	if (interaction.values[0] === "select_rol-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_rol-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Rol Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})   
	}
	
	if (interaction.values[0] === "select_ban-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_ban-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ban Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})      
	}
	
	if (interaction.values[0] === "select_unban-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_unban-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Unban Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})  
	}
	
	if (interaction.values[0] === "select_ses-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_ses-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ses Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})       
	}
	
	if (interaction.values[0] === "select_ekip-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_ekip-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ekip Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})   
	}
	
	if (interaction.values[0] === "select_mesaj-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_mesaj-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Mesaj Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]}) 
	}
	
	if (interaction.values[0] === "select_⁠giriş-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_⁠giriş-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('⁠Giriş Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})   
	}
	
	if (interaction.values[0] === "select_kanal-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_kanal-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Kanal Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})    
	}
	
	if (interaction.values[0] === "select_başvuru-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_başvuru-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Başvuru Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})      
	}
	
	if (interaction.values[0] === "select_reklam-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_reklam-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Reklam Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})  
	}
	
	if (interaction.values[0] === "select_uyarı-log") {
  const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_uyarı-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Uyarı Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})    
	}
	
	if (interaction.values[0] === "select_yetkilibildirim-log") {
 const row = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                .setCustomId('select_yetkilibildirim-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Yetkili Bildirim Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );
           await interaction.update({ components: [row, row2]})    
	}
	if (interaction.values[0] === "select_bot_ses_giris") {
		const row = new ActionRowBuilder()
				   .addComponents(
					   new ChannelSelectMenuBuilder()
					   .setCustomId('select_bot_ses_giris')
					   .addChannelTypes(ChannelType.GuildVoice)
					   .setPlaceholder('Botun Sesli Olarak Gireceği Kanalı Ayarlamak İstediğiniz Kanalı Belirleyin.')
					   .setMinValues(1)
					   .setMaxValues(1)
				   );
				  await interaction.update({ components: [row, row2]})    
		   }

	

}


//Ticket System 9 0 4's Development
	                                    const row = new ActionRowBuilder()
										.addComponents(
											new StringSelectMenuBuilder()
											.setCustomId('del')
											.setPlaceholder(`Ticket'ı Kapatmak İçin Tıkla!`)
											.addOptions([
												
												{
													label: `Kaydet & Ticket'ı Kapat!`,
													description: `Ticket'ı Kaydeder ve Kapatır.`,
													value: 'delete',
													emoji: "💾"
												},											
												{
													label: `Kendim Çözdüm, Yardıma Gerek Kalmadı.`,
													description: `Sorununuzu Çözdüyseniz Bunu Seçin.`,
													value: 'delete2',
													emoji: '⚙️'
												}
												
											])
										);
										
										
								var serverIcon = interaction.guild.iconURL({dynamic: true});

								let DejaUnChannel = await interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)

										
								if(interaction.customId === "del") {
								
									if (interaction.values[0] == "delete2") {
										if(interaction.member.roles.cache.has(yetkiliekibi)) return interaction.reply({content: `> **Sen Yetkilisin, Bu Özellik Sadece <@&${yetkiliekibi}> Permi Olmayanlar İçin Geçerli \`❗\`**`, ephemeral: true})

										const kendiçözdü = new EmbedBuilder()
										.setDescription(`**${interaction.member} / \`${interaction.member.id}\` Sorununu Kendi Çözdüğünü Söyledi. Artık Yardıma İhtiyacı Yok \`❗\`**`)
										.setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
										.setThumbnail(`${interaction.member.displayAvatarURL()}`)
										.setTimestamp()
										.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })
										await interaction.reply({embeds: [kendiçözdü], content: `<@&${yetkiliekibi}>`})
									}

									if (interaction.values[0] == "delete") {
																								
										const yetkinyok = new EmbedBuilder()
										.setDescription(`**Kanalı Sadece <@&${yetkiliekibi}> Kapatabilir. \`❌\`**`)
										.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })
										if(!interaction.member.roles.cache.has(yetkiliekibi)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})
										const channel = interaction.channel
										interaction.channel.messages.fetch().then(async (messages) => {
											let userID = interaction.member.id
											const puan = 1;
								
											let coin = await Coin.findOne({ userID });
									  
											if (!coin) {
											  coin = new Coin({ userID, coins: puan });
											} else {
											  coin.coins += puan;
											}
									  
											await coin.save();

											let gunlukcoin = await GunlukCoin.findOne({ userID });
									  
											if (!gunlukcoin) {
											  gunlukcoin = new GunlukCoin({ userID, coins: puan });
											} else {
											  gunlukcoin.gunlukcoins += puan;
											}
									  
											await gunlukcoin.save();

											const ticketLogs = await Log.find({}, 'ticketLog');
											if (ticketLogs.length === 0) {
												return interaction.reply({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
											}
											const ticketkanalid = ticketLogs.map(log => log.ticketLog)
									  
											const ticketkanalımız = ticketkanalid.join(', ')
											
											const kanal = interaction.guild.channels.cache.get(ticketkanalımız)
											if(!kanal) return interaction.reply({content: `> **\`ticket-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``, ephemeral: true})
									
										
											
											try {
				
				
												const attachment = await discordTranscripts.createTranscript(channel, {
													limit: -1, 
													returnType: 'attachment', 
													filename: `904_${interaction.channel.id}_${channel.name}.html`, 
													poweredBy: false,
													saveImages: true, 
												});

					
												await kanal.send({ files: [attachment] })
											


												  const bahsetmelink = interaction.message.mentions.users.first();


												  const embed778 = new EmbedBuilder()
												  .setDescription(`> **Kapatılan Ticket:** \`${interaction.channel.name} Başarıyla Kapatıldı ✅\`\n\n> **Puan Verilen Yetkili:** ${interaction.member}\n\n> **Ticket'ı Kapatan Yetkili:** ${interaction.member}\n\n> **Ticket Açan Kişi Bilgileri:** ${bahsetmelink} / ${bahsetmelink.id}\n\n> **Yetkilinin Ticket Puanı:** __${coin.coins}__`)
												  .setThumbnail(`${bahsetmelink.displayAvatarURL()}`)
												  .setAuthor({name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
												  .setTimestamp()


try {

		channel.delete()
} catch (error) {
	console.log(err)

	const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('tr-TR')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

	const atc = new AttachmentBuilder(Buffer.from(output), { name: '904log.txt' })

	const embed = new EmbedBuilder()
	.setAuthor({name: `Ticket Adı: ${interaction.channel.name}`,iconURL: `${sunucuiconurl}`})
	.setDescription(`> **Ticket Mesajları Aşağıdadır;**\n\n MESAJLAR ÇOK UZUN OLDUĞUNDAN ALINAMADI BU YÜZDEN TXT OLARAK YOLLADIM! \n\n **Ticket'ı Kapatan Yetkili ${interaction.user}** \n\n> **En Çok Mesaj Yazdığı İçin Puan Verildi.${user}**\n> **Yetkilinin Ticket Puanı:** __${coin.coins}__`)
	.setThumbnail(`${interaction.user.displayAvatarURL()}`)
	.setTimestamp()
	.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })


	client.channels.cache.get(kanal).send({files: [atc], content: `**----------------------------------------------------------**`, embeds: [embed]})
	channel.delete()
}
												



										
											
											} catch (err) {
												console.log(err)

												const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('tr-TR')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

												const atc = new AttachmentBuilder(Buffer.from(output), { name: '904log.txt' })

												const embed = new EmbedBuilder()
												.setAuthor({name: `Ticket Adı: ${interaction.channel.name}`,iconURL: `${sunucuiconurl}`})
												.setDescription(`> **Ticket Mesajları Aşağıdadır;**\n\n MESAJLAR ÇOK UZUN OLDUĞUNDAN ALINAMADI BU YÜZDEN TXT OLARAK YOLLADIM! \n\n **Ticket'ı Kapatan Yetkili ${interaction.user}** \n\n> **En Çok Mesaj Yazdığı İçin Puan Verildi.${user}**\n> **Yetkilinin Ticket Puanı:** __${coin.coins}__`)
												.setThumbnail(`${interaction.user.displayAvatarURL()}`)
												.setTimestamp()
												.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })


												client.channels.cache.get(kanal).send({files: [atc], content: `**----------------------------------------------------------**`, embeds: [embed]})
												channel.delete()
											}	
								
								
											
										});
									}
								}

						

								const kayıtbutonu1 = new ActionRowBuilder()
											.addComponents(
												new ButtonBuilder()
											 .setCustomId("buton57")
											 .setLabel('Başka Bir Yetkiliye Devret')
											 .setStyle(ButtonStyle.Secondary),
											 new ButtonBuilder()
											 .setCustomId("buton55")
											 .setLabel('Kullanıcı Ekle')
											 .setStyle(ButtonStyle.Secondary),
											 new ButtonBuilder()
											 .setCustomId("buton56")
											 .setLabel('Rol Ekle')
											 .setStyle(ButtonStyle.Secondary)
											 
											)

								if (interaction.customId == "select") {
									if (interaction.values[0] == "Sıfırla") {
										await interaction.update({})
										return;
									}
									if (DejaUnChannel) {
										await interaction.deferReply({ephemeral: true})
										await interaction.editReply({content: `**${DejaUnChannel} / \`${DejaUnChannel.id}\` İsimli Ticket Kanalı Zaten Aktif Durumda \`❗\`** `, ephemeral: true})
										return;
									}

									const ticketKategoriLogs = await Log.find({}, 'ticketKategori');
									if (ticketKategoriLogs.length === 0) {
										return interaction.reply({content: `> **Hiçbir Log Verisi Bulamadım \`❌\` Lütfen Yetkililere Bildirin \`❗\`**`, ephemeral: true})
									}
									const ticketKategorikanalid = ticketKategoriLogs.map(log => log.ticketKategori)							  
									const ticketKategorikanalımız = ticketKategorikanalid.join(', ')
									const kanal = interaction.guild.channels.cache.get(ticketKategorikanalımız)						  
									if(!kanal) return interaction.reply({content: `> **Kategori Kanalı Sunucuda Mevcut Değil \`❗\` Lütfen Yetkililere Bildirin \`❌\`**`, ephemeral: true})
									if(kanal.type !== 4) return interaction.reply({content: `> **Ticketların Açılacağı Kategori Türü Yerine Farklı Bir Kanal Türü Seçilmiş \`❗\` Lütfen Yetkililere Bildirin \`❌\`**`, ephemeral: true})
							
									if (interaction.values[0] == "other") {
										await interaction.deferReply({ephemeral: true})
										await interaction.guild.channels.create({
											type: ChannelType.GuildText,
											name: `ticket-${interaction.user.username}`,
											topic: `${interaction.user.id}`,
											parent: `${kanal.id}`,
											permissionOverwrites: [
												{   
													id: interaction.guild.id,
													deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
												},
												{
													id: interaction.user.id,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												},
												{
													id: yetkiliekibi,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												}
											]
										}).then((c)=>{
											const partenariat = new EmbedBuilder()
											.setTitle(`${emoji}  Diğer Kategoriler Hakkında Ticket Açtı!`)
											.setDescription('Yaşadığınız Sorunu Anlatır Mısınız ? Kanala Resim Ve Video Yükleyebilirsiniz.')
											.setThumbnail(`${interaction.member.displayAvatarURL()}`)
											.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
											c.send({embeds: [partenariat], content: `<@&${yetkiliekibi}> | ${interaction.user}`, components: [row, kayıtbutonu1]})
											interaction.editReply({content: `**Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Oluşturulan Kanal:** <#${c.id}> \`✅\``, ephemeral: true})
										})
									} else if (interaction.values[0] == "general") {
										await interaction.deferReply({ephemeral: true})
										await interaction.guild.channels.create({
											type: ChannelType.GuildText,
											name: `ticket-${interaction.user.username}`,
											topic: `${interaction.user.id}`,
											parent: `${kanal.id}`,
											permissionOverwrites: [
												{   
													id: interaction.guild.id,
													deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
												},
												{
													id: interaction.user.id,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												},
												{
													id: yetkiliekibi,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												}
											]
										}).then((c)=>{
											const plainte = new EmbedBuilder()
											.setTitle(`${emoji} Destek, Bug & Teknik Sorunlar Hakkında Ticket Açtı!`)
											.setDescription('Yaşadığınız Sorunu Anlatır Mısınız ? Kanala Resim Ve Video Yükleyebilirsiniz.')
											.setThumbnail(`${interaction.member.displayAvatarURL()}`)
											.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
											c.send({embeds: [plainte], content: `<@&${yetkiliekibi}> | ${interaction.user}`, components: [row, kayıtbutonu1]})	
											interaction.editReply({content: `**Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Oluşturulan Kanal:** <#${c.id}> \`✅\``, ephemeral: true})
										})
									} 
									
									else if (interaction.values[0] == "fiveguard") {
										await interaction.deferReply({ephemeral: true})
										await interaction.guild.channels.create({
											type: ChannelType.GuildText,
											name: `ticket-${interaction.user.username}`,
											topic: `${interaction.user.id}`,
											parent: `${kanal.id}`,
											permissionOverwrites: [
												{   
													id: interaction.guild.id,
													deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
												},
												{
													id: interaction.user.id,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												},
												{
													id: config.fiveguardetiketrol,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												}
											]
										}).then((c)=>{
											const plainte = new EmbedBuilder()
											.setTitle(`${emoji} Fiveguard İle İlgili Ban vb. Hakkında Ticket Açtı!`)
											.setDescription('Yaşadığınız Sorunu Anlatır Mısınız ? Kanala Resim Ve Video Yükleyebilirsiniz.')
											.setThumbnail(`${interaction.member.displayAvatarURL()}`)
											.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
											c.send({embeds: [plainte], content: `<@&${config.fiveguardetiketrol}> | ${interaction.user}`, components: [row, kayıtbutonu1]})	
											interaction.editReply({content: `**Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Oluşturulan Kanal:** <#${c.id}> \`✅\``, ephemeral: true})
										})
									}

									else if (interaction.values[0] == "donate") {
										await interaction.deferReply({ephemeral: true})
										await interaction.guild.channels.create({
											type: ChannelType.GuildText,
											name: `ticket-${interaction.user.username}`,
											topic: `${interaction.user.id}`,
											parent: `${kanal.id}`,
											permissionOverwrites: [
												{   
													id: interaction.guild.id,
													deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
												},
												{
													id: interaction.user.id,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												},
												{
													id: config.donateetiketrol,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												}
											]
										}).then((c)=>{
											const plainte = new EmbedBuilder()
											.setTitle(`${emoji} Donate Satın Almak veya Bilgi Almak Hakkında Ticket Açtı!`)
											.setDescription('Yaşadığınız Sorunu Anlatır Mısınız ? Kanala Resim Ve Video Yükleyebilirsiniz.')
											.setThumbnail(`${interaction.member.displayAvatarURL()}`)
											.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
											c.send({embeds: [plainte], content: `<@&${config.donateetiketrol}> | ${interaction.user}`, components: [row, kayıtbutonu1]})	
											interaction.editReply({content: `**Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Oluşturulan Kanal:** <#${c.id}> \`✅\``, ephemeral: true})
										})
									}
									
									else if (interaction.values[0] == "shopping") {
										await interaction.deferReply({ephemeral: true})
										await interaction.guild.channels.create({
											type: ChannelType.GuildText,
											name: `ticket-${interaction.user.username}`,
											topic: `${interaction.user.id}`,
											parent: `${kanal.id}`,
											permissionOverwrites: [
											{   
													id: interaction.guild.id,
													deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
												},
												{
													id: interaction.user.id,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												},
												{
													id: yetkiliekibi,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												}
											]
										}).then((c)=>{
											const embed = new EmbedBuilder()
											.setTitle(`${emoji}  Donate Alımlar & Ödemeler Hakkında Ticket Açtı!`)
											.setDescription('Yetkililer Yazmadan Önce, Satın Almak İstediğin Donate İle İlgili Detaylı Bilgi Verebilirsin Veya Bekleyebilirsin.')
											.setThumbnail(`${interaction.member.displayAvatarURL()}`)
											.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
											c.send({embeds: [embed], content: `<@&${yetkiliekibi}> | ${interaction.user}`, components: [row, kayıtbutonu1]})
											interaction.editReply({content: `**Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Oluşturulan Kanal:** <#${c.id}> \`✅\``, ephemeral: true})
										})
										
									
										
									
									}
									else if (interaction.values[0] == "staff") {
										await interaction.deferReply({ephemeral: true})
										await interaction.guild.channels.create({
											type: ChannelType.GuildText,
											name: `ticket-${interaction.user.username}`,
											topic: `${interaction.user.id}`,
											parent: `${kanal.id}`,
											permissionOverwrites: [
												{   
													id: interaction.guild.id,
													deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
												},
												{
													id: interaction.user.id,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												},
												{
													id: yetkiliekibi,
													allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
												}
											]
										}).then((c)=>{
											
											const plainte = new EmbedBuilder()
											.setTitle(`${emoji}  Oyun içi Sorunlar & Rol Hataları Hakkında Ticket Açtı!`)
											.setDescription('Oyun içi Sorunlar Veya Rol Hatası Olarak Ne Yaşadınız ?, Lütfen Kısaca Anlatınız.')
											.setThumbnail(`${interaction.member.displayAvatarURL()}`)
											.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
											c.send({embeds: [plainte], content: `<@&${yetkiliekibi}> | ${interaction.user}`, components: [row, kayıtbutonu1]})
											interaction.editReply({content: `**Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Oluşturulan Kanal:** <#${c.id}> \`✅\``, ephemeral: true})
										})
									}									
								}
})



	
	
	client.on('interactionCreate', async (interaction) => {
	
	const nrcmodal = new Modal() 
	.setCustomId('narcos-botlist')
	.setTitle(`${config.sunucuismi} Başvuru Formu`)
	.addComponents(
	  new TextInputComponent() 
	  .setCustomId('bot-id')
	  .setLabel('Neden Staff Olmak İstiyorsunuz?')
	  .setStyle('LONG') 
	  .setMinLength(1)
	  .setMaxLength(100)
	  .setPlaceholder('Neden Olmanız Gerektiğini Yazınız.')
	  .setRequired(true)
	)
	.addComponents(
		new TextInputComponent() 
		.setCustomId('bot-yas')
		.setLabel('Yaşınız ?')
		.setStyle('LONG') 
		.setMinLength(1)
		.setMaxLength(50)
		.setPlaceholder('Yaşınızı Yazınız.')
		.setRequired(true)
	  )
	.addComponents(
		new TextInputComponent() 
		.setCustomId('bot-prefix')
		.setLabel('Daha Önce Yetkilik Yaptınız Mı?')
		.setStyle('LONG') 
		.setMinLength(1)
		.setMaxLength(100)
		.setPlaceholder('Yaptıysaınz Hangi Sunucu ve Rütbe Yazınız..')
		.setRequired(true)
	  )
	  .addComponents(
		new TextInputComponent() 
		.setCustomId('bot-destek')
		.setLabel('Destek Kanalında Tartışma Var Naparsınız?')
		.setStyle('LONG') 
		.setMaxLength(100)
		.setMinLength(1)
		.setPlaceholder('Ne Yapmanız Gerektiğini Yazınız.')
		.setRequired(true)
	  )
	  .addComponents(
		new TextInputComponent() 
		.setCustomId('bot-hakkinda')
		.setLabel('Ek Olarak Eklicekleriniz.')
		.setMaxLength(100)
		.setStyle('LONG') 
		.setPlaceholder('Size Yetkilik Süresi Boyunca + Puan Katabilir.')
	  );
	
	
		if(interaction.customId === "bot-başvuru"){
			showModal(nrcmodal, {
				client: client, 
				interaction: interaction 
			  })
		}
	
		if(interaction.customId === "botonay"){		
			let sahip = db2.fetch(`onay-red-mesaj_${interaction.message.id}`)
			let botid = db2.fetch(`bot_id_${sahip}`)
	
			const embed = new EmbedBuilder()
			.setColor(renk)
				.setDescription(`
			**${botid}** Başvuru Onaylandı.
			**Onaylayan Yetkili:** <@${interaction.user.id}> (${interaction.user.id})
			`)
			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('onaylandı')
			.setLabel(`Başvuru Onaylandı. (Onaylayan Yetkili ID: ${interaction.member.id})`)
			.setStyle(ButtonStyle.Success)
			.setDisabled(true)
			
			);
			await interaction.update({ components: [row] });
			  const mentionedUsers = interaction.message.mentions.users;

    if (mentionedUsers.size > 0) {
		        mentionedUsers.forEach(user => {
					
					user.send(`> **Başvurun Olumlu Sonuçlandı!, Ticket Açabilirsin.**`)


				})
		
	}
			
			db2.delete(`onay-red-mesaj_${interaction.message.id}`)
			db2.delete(`bot_bilgi_${botid}`)
			db2.delete(`bot_${botid}`)
			db2.delete(`bot_id_${sahip}`)
		
	
		}
		
		if(interaction.customId === "botred"){		
			let sahip = db2.fetch(`onay-red-mesaj_${interaction.message.id}`)
			let botid = db2.fetch(`bot_id_${sahip}`)
	
			const embed = new EmbedBuilder()
			.setColor(renk)
				.setDescription(`
			**${botid}** Başvuru Reddedildi.
			**Onaylayan Yetkili:** <@${interaction.user.id}> (${interaction.user.id})
			`)
			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('reddedildi')
			.setLabel(`Başvuru Reddedildi. (Reddeden Yetkili ID: ${interaction.member.id})`)
			.setStyle(ButtonStyle.Danger)
			.setDisabled(true)
			
			);
			await interaction.update({ components: [row] });
			  const mentionedUsers = interaction.message.mentions.users;

    if (mentionedUsers.size > 0) {
		        mentionedUsers.forEach(user => {
					
					user.send(`> **Başvurun Maalesef Reddedildi!, Üzülme Tekrar Deneyebilirsin.**`)


				})
		
	}
			
			db2.delete(`onay-red-mesaj_${interaction.message.id}`)
			db2.delete(`bot_bilgi_${botid}`)
			db2.delete(`bot_${botid}`)
			db2.delete(`bot_id_${sahip}`)
		
	
		}
		
		
	
	});













	  client.on('guildMemberRemove', async member => {
		if(member.roles.cache.has(whitelistpermi))
		{

			const KayıtlıHex = require('./src/models/kayıtlıhexschema.js');

			const hex2 = await KayıtlıHex.findOne({ discordId: member.id });
			
					let hex = ""
					if(!hex2) {
						hex = `**Hex:** \`Bulunumadı\` \`❌\``
					}
					else
					{
						hex = `**Hex:** \`${hex2.kayıtlıhex}\` \`✅\``
					}

					const whitelistLogs = await Log.find({}, 'whitelistCikisLog');
					if (whitelistLogs.length === 0) {
						return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
					}
					const whitelistkanalid = whitelistLogs.map(log => log.whitelistCikisLog)
			  
					const whitelistkanalımız = whitelistkanalid.join(', ')
					const kanal = member.guild.channels.cache.get(whitelistkanalımız)
					if(!kanal) return console.log(`\x1b[31m`,`whitelistçıkış-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)
					
			const exampleEmbed = new EmbedBuilder()
	.setThumbnail(member.displayAvatarURL())
	.setColor(renk)
	.setAuthor({ name: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})
	.setDescription(`**${member} Adlı Kişi Sunucumuzdan Ayrıldı. \`❗\`**\n\n **Kullanıcının ID'si : **${member.id}\n\n${hex}`)
	.setTimestamp()
	.setFooter({ text: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})

	kanal.send({content: `<@&${yetkiliekibi}>`, embeds: [exampleEmbed]});
		}
		else return;

	  })

	  client.on("guildMemberAdd", async member => {
		const rolke = member.guild.roles.cache.get(kayıtsızüyepermi)
		if(!rolke) return console.log(`Kayıtsızüye Permi Sunucuda Bulunamadı ❌`)
		await member.roles.add(kayıtsızüyepermi)
	  })

	  const invites = new Collection()


	  client.on('ready', async () => {
		await(2000)

		client.guilds.cache.forEach(async (guild)=> {
			const firstInvites = await guild.invites.fetch().catch(err => {console.log(err)})
			invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));

		})

	  })
	
	  client.on('inviteCreate', async (invite) => {

		const firstInvites = await invite.guild.invites.fetch().catch(err => {console.log(err)})

		invites.set(invite.guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));

	  })
	  client.on('inviteDelete', async (invite) => {

		const firstInvites = await invite.guild.invites.fetch().catch(err => {console.log(err)})

		invites.set(invite.guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));

	  })

	
	  client.on("guildMemberAdd", async (member) => {
		if(!member) return;
		if (member.user.bot) return;

		const girisLogs = await Log.find({}, 'girisLog');
		if (girisLogs.length === 0) {
			return console.log(`Hiçbir Log Verisi Bulamadım! ❌ `)
		}
		const giriskanalid = girisLogs.map(log => log.girisLog)
  
		const giriskanalımız = giriskanalid.join(', ')
		const kanal = member.guild.channels.cache.get(giriskanalımız)
		if(!kanal) return console.log(`giris-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌ `)
		
		const newInvites = await member.guild.invites.fetch();
		const oldInvites = invites.get(member.guild.id)

		const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));

		let mesaj;
		let inviter;
		let davetusername 


		if(invite) 
		{
			const inviter = await client.users.fetch(invite.inviter.id)
			davetusername = inviter.username
			mesaj = `**Davet Bilgileri;**\n> **Davet Eden Kişi:** ${inviter} / ${inviter.username}\n> **Davet Edilen Kod:** ${invite.code}\n> **Kod Kullanım:** ${invite.uses}`
		}
		else
		{
			mesaj = `**Davet Bilgileri;**\n> **Davet Eden Kişi:** Özel URL`
			inviter = `Özel URL`
			davetusername = `Özel URL`
		}

		const firstInvites = await member.guild.invites.fetch().catch(err => {console.log(err)})

		invites.set(member.guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));


		let date = moment(member.user.createdAt)
		   const startedAt = Date.parse(date);
		   var msecs = Math.abs(new Date() - startedAt);
			 
		   const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
		   msecs -= years * 1000 * 60 * 60 * 24 * 365;
		   const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
		   msecs -= months * 1000 * 60 * 60 * 24 * 30;
		   const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
		   msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
		   const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
		   msecs -= days * 1000 * 60 * 60 * 24;
		   const hours = Math.floor(msecs / (1000 * 60 * 60));
		   msecs -= hours * 1000 * 60 * 60;
		   const mins = Math.floor((msecs / (1000 * 60)));
		   msecs -= mins * 1000 * 60;
		   const secs = Math.floor(msecs / 1000);
		   msecs -= secs * 1000;
			 
		   var string = "";
		   if (years > 0) string += `${years} yıl ${months} ay`
		   else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
		   else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
		   else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
		   else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
		   else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
		   else if (secs > 0) string += `${secs} saniye`

			 
		   string = string.trim();
	   
		   const log3 = kanal;
		   let endAt = member.user.createdAt
		   let gün = moment(new Date(endAt).toISOString()).format('DD')
		   let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
		   let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
		   let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
		   let kuruluş = `${gün} ${ay} ${yıl}`;
		   let kuruluş2 = `${gün} ${ay} ${yıl}`;

	

	const exampleEmbed = new EmbedBuilder()
	.setThumbnail(member.displayAvatarURL())
	.setColor(renk)
	.setDescription(`**Sunucumuza Hoş Geldin**\`❗\` ${member} \n\n **Hesap Oluşturma Tarihi:** <t:${parseInt(member.user.createdTimestamp / 1000)}:R> Oluşturulmuş.\n\n **Sunucuya Giriş Tarihi:** <t:${parseInt(member.joinedTimestamp / 1000)}:R> \n\n **Mülakata Girmeye Hazır Olduğunda <#${config.mülakatseskanal}> Kanalımıza Giriş Yaparsan\n\n <@&${yetkiliekibi}> Seninle İlgilenecektir.**\n\n ${mesaj} `)
	.setTimestamp()
	.setFooter({ text: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})
	 


	const avatarURL = member.displayAvatarURL({ extension: 'png', dynamic: true, size: 1024 });
        
	const canvas = createCanvas(800, 400);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = '#7289DA';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const background = await loadImage(`https://i.imgur.com/ugcIxpz.png`)


	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


const transparentRectWidth = 770;
const transparentRectHeight = 370;
const transparentRectX = 15;
const transparentRectY = 15;
const cornerRadius = 13;

ctx.fillStyle = 'rgba(0,0,0,0.3)'; 
ctx.roundRect(transparentRectX, transparentRectY, transparentRectWidth, transparentRectHeight, cornerRadius);
ctx.fill();

let tag = member.user.tag.replace(/#\d+/, '');
let davetedentag = davetusername;

const icon = await loadImage(`https://904.com.tr/resimler/904_uyari.png`)
const iconSize = 50;
const iconX = 270;
const iconY = 294;


const icon2 = await loadImage(`https://904.com.tr/resimler/904_uyesayisi.png?`)
const iconSize2 = 50;
const iconX2 = 270;
const iconY2 = 230;

const icon3 = await loadImage(`https://904.com.tr/resimler/904_davet.png`)
const iconSize3 = 65;
const iconX3 = 255;
const iconY3 = 167;

const icon4 = await loadImage(`https://904.com.tr/resimler/904_giris.png`)
const iconSize4 = 65;
const iconX4 = 260;
const iconY4 = 108;


ctx.drawImage(icon, iconX, iconY, iconSize, iconSize)
ctx.drawImage(icon2, iconX2, iconY2, iconSize2, iconSize2)
ctx.drawImage(icon3, iconX3, iconY3, iconSize3, iconSize3)
ctx.drawImage(icon4, iconX4, iconY4, iconSize4, iconSize4)

const avatar = await loadImage(avatarURL);
const avatarSize = 200; 
const avatarX = 30;
const avatarY = 100;

const diameter = 220;
const lineWidth = 6;
const xCoordinate = 130; 
const yCoordinate = 200; 

ctx.beginPath();
ctx.arc(xCoordinate, yCoordinate, diameter / 2 - lineWidth / 2, 0, Math.PI * 2);
ctx.lineWidth = lineWidth;
ctx.strokeStyle = '#FFFFFF'; 
ctx.stroke();

// Yuvarlak avatar çizimi
drawCircle(ctx, avatarX, avatarY, avatarSize / 2);
ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

-
	ctx.restore(); 

	ctx.fillStyle = '#d4d9fe';
	ctx.font = 'bold 40px Arial';
	ctx.fillText(`${config.sunucuismi} Hoşgeldin!`, 170, 70);

	ctx.fillStyle = '#FFFFFF';
	ctx.font = 'italic 30px Arial';
	ctx.fillText(`Katılan Üye: ${tag}`, 330, 150);
	ctx.fillText(`Davet Eden: ${davetedentag ? davetedentag : 'Bilinmiyor'} `, 330, 210);
	ctx.fillText(`Üye Sayımız: ${member.guild.memberCount}`, 330, 270);
	ctx.fillText(`Oluşturma Tarih: ${kuruluş2}`, 330, 330);


	const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: '904.png' });
	exampleEmbed.setImage('attachment://904.png');

	const embed222 = new EmbedBuilder()
	.setThumbnail(member.displayAvatarURL())
	.setColor(renk)
	.setDescription(`> **Sunucumuza hoş geldin!** ${member} \n\n> **Mülakata Girmeye Hazır Olduğunda <#${config.mülakatseskanal}> Kanalımıza Giriş Yapabilirsin.**`)
	.setTimestamp()
	.setFooter({ text: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})
	 
	embed222.setImage('attachment://904.png');

	if (months < 1 && years < 1) {
		const butonalttantire904 = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
		 .setCustomId("butonalttantire904")
		 .setLabel('⚠ Kullanıcıyı Yasakla! (Şüpheli Hesap)')
		 .setStyle(ButtonStyle.Secondary),
		)
		log3.send({ embeds: [exampleEmbed], components: [butonalttantire904], content: `> \`🤍\` ${member} **/** \`${member.id}\``, files: [attachment] });
	}
	else
	{
		log3.send({ embeds: [exampleEmbed], content: `> \`🤍\` ${member} **/** \`${member.id}\``, files: [attachment] });
		//member.send({ embeds: [embed222], files: [attachment] });

	}

		   
	});




	client.on("voiceStateUpdate", async (oldState, newState) => {

		const state = newState || oldState

		if(state.channelId !== `${mülakatseskanal}`) {
			return;
					}
		if(oldState.member.roles.cache.get(`${config.yetkiliekibi}`)) return;
		if(newState.member.roles.cache.get(`${config.yetkiliekibi}`)) return;

		const kanal = client.channels.cache.get(mülakatseskanal);

		const yetkilibildirimlogLogs = await Log.find({}, 'yetkilibildirimlog');
		if (yetkilibildirimlogLogs.length === 0) {
			return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
		}
		const yetkilibildirimlogkanalid = yetkilibildirimlogLogs.map(log => log.yetkilibildirimlog)
  
		const yetkilibildirimlogkanalımız = yetkilibildirimlogkanalid.join(', ')
		const kanal2 = oldState.guild.channels.cache.get(yetkilibildirimlogkanalımız)
		if(!kanal2) return console.log(`yetkilibildirimlog-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`,)

		const log = kanal2

		if(!mülakatseskanal) return;
		if(!log) return;

		if (oldState.channel && !newState.channel) return;
		if (oldState.channel && oldState.selfMute && !newState.selfMute) return 
		if (oldState.channel && !oldState.selfMute && newState.selfMute) return 
		if (oldState.channel && oldState.selfDeaf && !newState.selfDeaf) return 
		if (oldState.channel && !oldState.selfDeaf && newState.selfDeaf) return 
		if (oldState.channel && !oldState.streaming && newState.channel && newState.streaming) return 
		if (oldState.channel && oldState.streaming && newState.channel && !newState.streaming) return 
		if (oldState.channel && !oldState.selfVideo && newState.channel && newState.selfVideo) return 
		if (oldState.channel && oldState.selfVideo && newState.channel && !newState.selfVideo) return 

		const embed = new EmbedBuilder()
		.setAuthor({name: `${newState.member.displayName}`, iconURL: `${newState.member.displayAvatarURL()}`})
		.setDescription(`**${newState.member} Adlı Kişi Mülakat İçin ${kanal} Kanalımıza Giriş Yaptı\`❗\` \n\nKullanıcı ID:** \`${newState.member.id}\``)
		.setTimestamp()
		.setColor(renk)
		.setFooter({text: `Kanal: [${kanal.name}]`, iconURL: `${newState.member.displayAvatarURL()}`})

		log.send({embeds: [embed], content: `<@&${yetkiliekibi}> `})
	
	})



	client.on('modalSubmit',async (modal) => {


		
		if(modal.customId === 'narcos-botlist'){
			const botid = modal.getTextInputValue('bot-id')
			const botprefix = modal.getTextInputValue('bot-prefix')
			const topgg = modal.getTextInputValue('bot-onay')
			const aciklama = modal.getTextInputValue('bot-hakkinda')
			const botdestek = modal.getTextInputValue('bot-destek')
			const botyas = modal.getTextInputValue('bot-yas')

			let kontrol = db2.fetch(`bot_id_${modal.user.id}`)
			await modal.deferReply({ ephemeral: true })
			if(kontrol) return  modal.followUp({ content: `Zaten Başvuru Yapmışsın Onaylanmasını Bekleyiniz.`, ephemeral: true })
			db2.set(`bot_id_${modal.user.id}`, botid)
			db2.set(`bot_${botid}`, modal.user.id)
			db2.set(`bot_bilgi_${botid}`, [])
			db2.push(`bot_bilgi_${botid}`, botprefix)
			db2.push(`bot_bilgi_${botid}`, topgg)
			db2.push(`bot_bilgi_${botid}`, botdestek)
			db2.push(`bot_bilgi_${botid}`, botyas)

			db2.push(`bot_bilgi_${botid}`, aciklama ? aciklama : "açıklama bulunamadı")


			const basvuruLogs = await Log.find({}, 'basvuruLog');
			if (basvuruLogs.length === 0) {
				return modal.followUp({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
			}
			const basvurukanalid = basvuruLogs.map(log => log.basvuruLog)
	  
			const basvurukanalımız = basvurukanalid.join(', ')
			const kanal = modal.guild.channels.cache.get(basvurukanalımız)
			if(!kanal) return modal.followUp({content: `> **\`basvuru-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** \`❌\``, ephemeral: true})


			modal.followUp({ content: `**Başarılı Bir Şekilde Staff Başvurun Gönderildi.**`, ephemeral: true })
	
	
   const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('botonay')
                    .setLabel('Başvuruyu Onayla!')
			       .setStyle(ButtonStyle.Success),		
                new ButtonBuilder()
                    .setCustomId('botred')
                    .setLabel('Başvuruyu Reddet!')
                    .setStyle(ButtonStyle.Danger),
            );



			const embed = new EmbedBuilder()
			.setColor(renk)
			.setDescription(`
			> **Staff Başvurusu Bilgileri;**\n
			**Neden Staff Olmak İstiyorsunuz? :** \`\`\`\ ${botid}\`\`\`\
			**Daha Önce Yetkilik Yaptınız Mı? (Yetkilide Hedefleriniz Neler?) :** \`\`\`\ ${botprefix}\`\`\`\
			**Yaşınız ?:** \`\`\`\ ${botyas} \`\`\`\
			**Destek Kanalında Tartışma Var Ne Yapardınız ?:** \`\`\`\ ${botdestek}\`\`\`\
			**Ek Açıklama;**
			\`\`\`\ ${aciklama ? aciklama: "Açıklama Bulunamadı."} \`\`\`\
	
			> **Başvuru Gönderen Kullanıcı Bilgileri;**
	
			**İD:** \`${modal.user.id} ${modal.user.username}\`
			**Etiket:** <@${modal.user.id}>
			`)
			.setImage(`${sunucubanner}`)


			try {
				const embed5 = new EmbedBuilder()
				.setColor(renk)
				.setAuthor({name: `${config.sunucuismi}`, iconURL: `${sunucubanner}`})
				.setDescription(`**Başarıyla Yetkili Başvuru Formunu Aldım, Bize Katılmak İstediğin İçin Teşekkürler, En Kısa Zamanda Sana Dönüş Yapıcağız!**`)
				modal.user.send({embeds: [embed5]})

				
				kanal.send({embeds:[embed], content: `<@${modal.user.id}> / <@&${config.yetkiliekibi}>`,components: [row]}).then(c => {
					  db2.set(`onay-red-mesaj_${c.id}`, modal.user.id)
				  })
	

			 
			} catch (error) {
				
			  }
		
		  
		}  
		
		
		
		
		
		
		
		
		
		
		
		
		
		

		if(modal.customId === 'modal-904s'){

			const ilkseçenek = modal.getTextInputValue('904s-2')
			const ikinciseçenek = modal.getTextInputValue('904s-3')
			const üçüncüseçenek = modal.getTextInputValue('904s-4')

			await modal.deferReply({ ephemeral: true })

			const embed = new EmbedBuilder()
			.setColor(renk)
			.setDescription(`
			> **Ticket Bilgileri;**\n
			**Neden Ticket Açıyorsunuz? :** \`\`\`\ ${ilkseçenek}\`\`\`\
			**Ticketınız Hakkında Sorununuz? :** \`\`\`\ ${ikinciseçenek}\`\`\`\
			**Hangi Yetkililer Size Yardımcı Olabilir?:** \`\`\`\ ${üçüncüseçenek} \`\`\`\
	
			**İD:** \`${modal.user.id} ${modal.user.username}\`
			**Etiket:** <@${modal.user.id}>
			`)
			.setImage(`${sunucubanner}`)

			const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
				.setCustomId('del')
				.setPlaceholder(`Ticket'ı Kapatmak İçin Tıkla!`)
				.addOptions([
					
					{
						label: `Kaydet & Ticket'ı Kapat!`,
						description: `Ticket'ı Kaydeder ve Kapatır.`,
						value: 'delete',
						emoji: "💾"
					},											
					{
						label: `Kendim Çözdüm, Yardıma Gerek Kalmadı.`,
						description: `Sorununuzu Çözdüyseniz Bunu Seçin.`,
						value: 'delete2',
						emoji: '⚙️'
					}
					
				])
			);

			
			let DejaUnChannel2 = await modal.guild.channels.cache.find(c => c.topic == modal.user.id)

			if (DejaUnChannel2) return modal.followUp({content: '**❌ Zaten Bir Ticket Talebin Açık.**', ephemeral: true})

			const ticketKategoriLogs = await Log.find({}, 'ticketKategori');
			if (ticketKategoriLogs.length === 0) {
				return modal.followUp({content: `> **Hiçbir Log Verisi Bulamadım!** \`❌\``, ephemeral: true})
			}
			const ticketKategorikanalid = ticketKategoriLogs.map(log => log.ticketKategori)							  
			const ticketKategorikanalımız = ticketKategorikanalid.join(', ')
			const kanal = modal.guild.channels.cache.get(ticketKategorikanalımız)						  
			if(!kanal) return modal.followUp({content: `> **Kategori Kanalı Sunucuda Mevcut Değil \`❗\` Lütfen Yetkililere Bildirin \`❌\`**`, ephemeral: true})
			if(kanal.type !== 4) return modal.followUp({content: `> **Ticketların Açılacağı Kategori Türü Yerine Farklı Bir Kanal Türü Seçilmiş \`❗\` Lütfen Yetkililere Bildirin \`❌\`**`, ephemeral: true })
	
				await modal.guild.channels.create({
					type: ChannelType.GuildText,
					name: `ticket-${modal.user.username}`,
					topic: `${modal.user.id}`,
					parent: `${kanal.id}`,
					permissionOverwrites: [
						{   
							id: modal.guild.id,
							deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
						},
						{
							id: modal.user.id,
							allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
						},
						{
							id: yetkiliekibi,
							allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
						}
					]
				}).then((c)=>{
					c.send({embeds: [embed], components: [row], content: `<@&${yetkiliekibi}> | ${modal.user}`})
					modal.followUp({content: `**✔️ Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Kanal:** <#${c.id}>`,  ephemeral: true})
				})
			

		}






if(modal.customId === "hexbultext")
{
	 const hexCode = modal.getTextInputValue('hexbultext2')

	 const existingDocument = await KayıtlıHex.findOne({ kayıtlıhex: hexCode });

	 const embed5555 = new EmbedBuilder()
	 .setFooter({text: `${modal.guild.name}`, iconURL: `${modal.guild.iconURL()}`})
	 .setTimestamp()

	 let discordId = ""

	 if (existingDocument) {
		 discordId = `> Başarıyla \`${hexCode}\` Bulundu! <@${existingDocument.discordId}> / ${existingDocument.discordId} \`✅\``
	} else {
		 discordId = `> Belirttiğiniz \`${hexCode}\` Verisi Bulunamadı \`❌\``
	}

	embed5555.setDescription(discordId)

modal.reply({embeds: [embed5555]})	

}

		if(modal.customId === '904modal'){
			const botid = modal.getTextInputValue('kullaniciid')

			const user =  await modal.guild.members.cache.get(`${botid}`)
			if(!user) 
			{
				return modal.reply({content:`> **${modal.member} Böyle Bir Discord ID Sunucuda Bulamadım => __${botid}__**`})
			}

			await modal.channel.permissionOverwrites.edit(botid, { ViewChannel: true, SendMessages: true, AttachFiles: true });
			modal.reply(`> **<@${botid}> Adlı Kişi Başarıyla Kanala Eklendi.**`)
		}
		if(modal.customId === '904modal2'){
			const botid2 = modal.getTextInputValue('rolid')

			const user =  await modal.guild.roles.cache.get(`${botid2}`)
			if(!user) 
			{
				return modal.reply({content:`> **${modal.member} Böyle Bir Rol ID Bilgisini Sunucuda Bulamadım => __${botid2}__**`})
			}

			await modal.channel.permissionOverwrites.edit(botid2, { ViewChannel: true, SendMessages: true, AttachFiles: true });
			modal.reply(`> **<@&${botid2}> Adlı Rol Başarıyla Kanala Eklendi.**`)
		}
	})

	const { Modal, TextInputComponent, showModal } = require('discord-modals') 
	const discordModals = require('discord-modals') 
	discordModals(client); 

	client.on("interactionCreate", async interaction => {

		if (interaction.customId === "hexbuluser") {

			await interaction.deferReply({ephemeral: true})
	
			const embed = new EmbedBuilder()
			.setTitle(`Kullanıcıların Hex Verileri`)
			.setFooter({text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()

			if(interaction.values > 1) embed.setTitle(`Kullanıcının Hex Verisi`)


			let description = "";

			await Promise.all(interaction.values.map(async value => {
			const hex2 = await KayıtlıHex.findOne({ discordId: value });

			let hex = ""
			if(!hex2) {
				hex = `**Hex:** \`Bulunumadı\` \`❌\``
			}
			else
			{
				hex = `**Hex:** \`${hex2.kayıtlıhex}\` \`✅\``
			}

				//description += `<@${value}> / ${value} **Hex:** \`${hex ? hex : "Bulunamadı. \`❌\` "}\`\n`;
				description += `<@${value}> / ${value} ${hex}\n`;
			}));
	
			embed.setDescription(description);

			await interaction.editReply({embeds: [embed], ephemeral: true})

		}
		

		const row55552 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('iptaletme')
					.setLabel('Geri Dön ❗')
					.setStyle(ButtonStyle.Secondary),
			)

		if (interaction.customId === "select_ticket-kategori") {

			let ticketkategori = "";
			const ticketLogs = await Log.find({});
			const ticketkategorid = ticketLogs.map(log => log.ticketKategori).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkategorid)
			if(!ticketkanal) ticketkategori+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkategori += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { ticketKategori: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`Ticket Kategori\` \n\n- **Eski Kanal Bilgisi:** ${ticketkategori} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_ticket-kategori')
                .addChannelTypes(ChannelType.GuildCategory)
                .setPlaceholder('Ticket Kategori Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );


			await interaction.update({embeds: [embed], components: [row2, row55552]})
			
		}


		if (interaction.customId === "select_ticket-log") {

			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.ticketLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { ticketLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`ticket-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_ticket-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ticket Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}

		if (interaction.customId === "select_kayıt-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.kayitLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { kayitLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`kayıt-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_kayıt-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Kayıt Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

					
		}
		
		if (interaction.customId === "select_whitelistçıkış-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.whitelistCikisLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { whitelistCikisLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`whitelistçıkış-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_whitelistçıkış-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Whitelist Çıkış Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_rol-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.rolLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { rolLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`rol-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_rol-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Rol Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_ban-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.banLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { banLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`ban-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_ban-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ban Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_unban-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.unbanLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { unbanLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`unban-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_unban-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Unban Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_ses-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.sesLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { sesLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`ses-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_ses-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ses Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_ekip-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.ekipLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { ekipLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`ekip-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_ekip-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Ekip Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_mesaj-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.mesajLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { mesajLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`mesaj-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_mesaj-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Mesaj Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_⁠giriş-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.girisLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { girisLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`giriş-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()

			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_giriş-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Giriş Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_kanal-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.kanalLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { kanalLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`kanal-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()

			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_kanal-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Kanal Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_başvuru-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.basvuruLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { basvuruLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`başvuru-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()

			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_başvuru-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Başvuru Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_reklam-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.reklamLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { reklamLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`reklam-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()

			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_reklam-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Reklam Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_uyarı-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.uyarıLog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { uyarıLog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`uyarı-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_uyarı-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Uyarı Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		
		if (interaction.customId === "select_yetkilibildirim-log") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.yetkilibildirimlog).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { yetkilibildirimlog: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Log Verisi:** \`bildirim-log\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Log Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_yetkilibildirim-log')
                .addChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Bildirim Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}
		if (interaction.customId === "select_bot_ses_giris") {
			let ticketkanali = "";
			const ticketLogs = await Log.find({});
			const ticketkanalid = ticketLogs.map(log => log.botsesgiris).join(', ')
			const ticketkanal = interaction.guild.channels.cache.get(ticketkanalid)
			if(!ticketkanal) ticketkanali+= `Sunucuda Bulamadım! Veya Ayarlı Değildi. \`❌\``
			else ticketkanali += `${ticketkanal} / \`${ticketkanal.id}\``

			await Log.findOneAndUpdate({}, { botsesgiris: interaction.values.join(', ') }, { upsert: true, new: true });

			const embed = new EmbedBuilder()
			.setDescription(`**Ayarlanan Kanal Verisi:** \`Bot-Ses-Giris\` \n\n- **Eski Kanal Bilgisi:** ${ticketkanali} \n\n> **Kanal Verileri Seçtiğiniz <#${interaction.values}> / \`${interaction.values}\` İsimli Kanal'a Taşındı! \`✅\`**`)
			.setFooter({text: `904 Development`, iconURL: `${interaction.guild.iconURL()}`})
			.setTimestamp()


			const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
				.setCustomId('select_bot_ses_giris')
                .addChannelTypes(ChannelType.GuildVoice)
                .setPlaceholder('Botun Sesli Olarak Gireceği Kanalı Ayarlamak İstediğiniz Kanalı Belirleyin.')
                .setMinValues(1)
                .setMaxValues(1)
            );

						await interaction.update({embeds: [embed], components: [row2, row55552]})

			
		}


		const dokuzdortmodal = new Modal() 
		.setCustomId('904modal')
		.setTitle(`Kullanıcı Ekleme`)
		.addComponents(
		  new TextInputComponent() 
		  .setCustomId('kullaniciid')
		  .setLabel('Ekleyeceğiniz Kullanıcının ID Giriniz.')
		  .setStyle('LONG') 
		  .setMinLength(1)
		  .setMaxLength(50)
		  .setPlaceholder(`Kullanıcının Discord ID'sini Giriniz.`)
		  .setRequired(true)
		)

		const dokuzdortmodal2 = new Modal() 
		.setCustomId('904modal2')
		.setTitle(`Rol Ekleme`)
		.addComponents(
		  new TextInputComponent() 
		  .setCustomId('rolid')
		  .setLabel(`Ekleyeceğiniz Rol'ün ID Bilgisini Giriniz.`)
		  .setStyle('LONG') 
		  .setMinLength(1)
		  .setMaxLength(50)
		  .setPlaceholder(`Ekleyeceğiniz Rolün Discord ID Bilgisini Giriniz.`)
		  .setRequired(true)
		)
		const yetkinyok = new EmbedBuilder()
		.setDescription(`**Bu Özelliği Sadece <@&${yetkiliekibi}> Kullanabilir.**`)
		.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })

		if (interaction.customId  == "buton56") {
			if(!interaction.member.roles.cache.get(yetkiliekibi)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})

			showModal(dokuzdortmodal2, {
				client: client, 
				interaction: interaction 
			  })
		}

		if(interaction.customId == "butonalttantire904")
		{
			if(!interaction.member.roles.cache.get(yetkiliekibi)) return interaction.reply({content: `> \`❌\` **Başını Kullanırsın. 904 :)**`, ephemeral: true})


			const butonalttantire9042 = new ActionRowBuilder()
			.addComponents(
			new ButtonBuilder()
			.setCustomId("butonalttantire9042")
			.setLabel(`⚠ Kullanıcı Yasaklandı! ${interaction.user.id}`)
			.setDisabled(true)
			.setStyle(ButtonStyle.Secondary),
			)
			const mentionedUsers = interaction.message.mentions.users.first();
			const member = await interaction.guild.members.fetch(mentionedUsers.id);
			if(!member.bannable) return interaction.reply({content: `> \`❌\` **Kullanıcıyı Banlamak İçin Yetkim Yok.**`, ephemeral: true})
			await member.ban({ reason: `${interaction.user.id} Yetkili Tarafından Şüpheli Hesap Ban!` });
			interaction.update({components: [butonalttantire9042]})

		}
		const modalama904 = new Modal() 
		.setCustomId('modal-904s')
		.setTitle(`${config.sunucuismi} Ticket`)
		.addComponents(
			new TextInputComponent() 
			.setCustomId('904s-2')
			.setLabel('Neden Ticket Açıyorsunuz?')
			.setStyle('LONG') 
			.setMinLength(1)
			.setMaxLength(100)
			.setPlaceholder('Neden Ticket Açıyorsunuz?')
			.setRequired(true)
		  )
		  .addComponents(
			new TextInputComponent() 
			.setCustomId('904s-3')
			.setLabel('Ticketınız Hakkında Sorununuz?')
			.setStyle('LONG') 
			.setMinLength(1)
			.setMaxLength(100)
			.setPlaceholder('Ticketınız Hakkında Sorununuz?')
			.setRequired(true)
		  )
		  .addComponents(
			new TextInputComponent() 
			.setCustomId('904s-4')
			.setLabel('Hangi Yetkililer Size Yardımcı Olabilir?')
			.setStyle('LONG') 
			.setMinLength(1)
			.setMaxLength(100)
			.setPlaceholder('Hangi Yetkililer Size Yardımcı Olabilir?')
			.setRequired(true)
		  )

		if(interaction.customId === 'denemeticket')
		{

			showModal(modalama904, {
				client: client, 
				interaction: interaction 
			  })

		}

		if(interaction.customId === 'iptaletme')
		{
			const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('logkanalları')
					.setPlaceholder('Ayarlamak İstediğiniz Log Kanalını Seçiniz.')
					.addOptions([
						{
							label: 'Ticket Kategori',
							description: 'Ticketların Açılacağı Kategoriyi Seçiniz.',
							value: 'select_ticket-kategori',
							emoji: `📁`,
						},
						{
							label: 'Ticket Log',
							description: 'Ticket Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_ticket-log',
							emoji: `📁`,
						},
						{
							label: 'Kayıt Log',
							description: 'Kayıt Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_kayıt-log',
							emoji: `📁`,
						},
						{
							label: 'Whitelist Çıkış Log',
							description: 'Whitelist Çıkış Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_whitelistçıkış-log',
							emoji: `📁`,
						},
						{
							label: 'Rol Log',
							description: 'Rol Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_rol-log',
							emoji: `📁`,
						},
						{
							label: 'Ban Log',
							description: 'Ban Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_ban-log',
							emoji: `📁`,
						},
						{
							label: 'Unban Log',
							description: 'Unban Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_unban-log',
							emoji: `📁`,
						},
						{
							label: 'Ses Log',
							description: 'Ses Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_ses-log',
							emoji: `📁`,
						},
						{
							label: 'Ekip Log',
							description: 'Ekip Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_ekip-log',
							emoji: `📁`,
						},
						{
							label: 'Mesaj Log',
							description: 'Mesaj Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_mesaj-log',
							emoji: `📁`,
						},
						{
							label: 'Giriş Log',
							description: '⁠Giriş Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_⁠giriş-log',
							emoji: `📁`,
						},
						{
							label: 'Kanal Log',
							description: 'Kanal Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_kanal-log',
							emoji: `📁`,
						},
						{
							label: 'Başvuru Log',
							description: 'Başvuru Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_başvuru-log',
							emoji: `📁`,
						},
						{
							label: 'Reklam Log',
							description: 'Reklam Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_reklam-log',
							emoji: `📁`,
						},
						{
							label: 'Uyarı Log',
							description: 'Uyarı Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_uyarı-log',
							emoji: `📁`,
						},
						{
							label: 'Yetkili Bildirim Log',
							description: 'Yetkili Bildirim Log Olarak Ayarlamak İstediğiniz Kanalı Seçiniz.',
							value: 'select_yetkilibildirim-log',
							emoji: `📁`,
						},
						{
							label: 'Bot Ses Kanalı',
							description: 'Botun Sesli Olarak Gireceği Kanalı Ayarlamak İstediğiniz Kanalı Belirleyin.',
							value: 'select_bot_ses_giris',
							emoji: `📁`,
						}
										 
					]),
			);
	
	
			const embed = new EmbedBuilder()
			.setTitle(`Kanal Ayarlama Komutuna Hoşgeldin \`❗\``)
			.setDescription(`> **Lütfen Ayarlamak İstediğin Kanalı Aşağıdan Seç \`✅\`**`)
			.setThumbnail(`${config.sunucuiconurl}`)
			.setFooter({text: `${interaction.guild.name}`, iconURL: `${config.sunucuiconurl}`})
	
	
				await interaction.update({ components: [row], embeds: [embed]})
		}

		if (interaction.customId  == "buton55") {
			if(!interaction.member.roles.cache.get(yetkiliekibi)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})

			showModal(dokuzdortmodal, {
				client: client, 
				interaction: interaction 
			  })
		}

		if(interaction.customId == "buton57" )
		{
			if(!interaction.member.roles.cache.get(yetkiliekibi)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})

				const embed = new EmbedBuilder()
				.setColor(config.renk)
				.setDescription(`> **Devredilen Kanal İsmi:** ${interaction.channel.name} & ${interaction.channel}\n\n> **Devreden Yetkili:** ${interaction.member}\n\n> **Tarafından Başka Bir Yetkili İstenildi!** <@&${yetkiliekibi}>`)
				.setThumbnail(`${interaction.member.displayAvatarURL()}`)
				.setFooter({text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

				const kayıtbutonu2 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
				 .setCustomId("buton57")
				 .setLabel('Başka Bir Yetkiliye Devret')
				 .setDisabled(true)
				 .setStyle(ButtonStyle.Secondary),
				 new ButtonBuilder()
				 .setCustomId("buton55")
				 .setLabel('Kullanıcı Ekle')
				 .setStyle(ButtonStyle.Secondary),
				 new ButtonBuilder()
				 .setCustomId("buton56")
				 .setLabel('Rol Ekle')
				 .setStyle(ButtonStyle.Secondary)
				 
				)

				const row = new ActionRowBuilder()
				.addComponents(
					new StringSelectMenuBuilder()
					.setCustomId('del')
					.setPlaceholder(`Ticket'ı Kapatmak İçin Tıkla!`)
					.addOptions([
						
						{
							label: `Kaydet & Ticket'ı Kapat!`,
							description: `Ticket'ı Kaydeder ve Kapatır.`,
							value: 'delete',
							emoji: "💾"
						},											
						{
							label: `Kendim Çözdüm, Yardıma Gerek Kalmadı.`,
							description: `Sorununuzu Çözdüyseniz Bunu Seçin.`,
							value: 'delete2',
							emoji: '⚙️'
						}
						
					])
				);
				

				//await interaction.reply({content: `> **Talebiniz Başarıyla Kanala Gönderildi!**`, ephemeral: true})
				await interaction.update({components: [row, kayıtbutonu2]})
				await interaction.channel.send({embeds: [embed], content: `<@&${yetkiliekibi}>`})
		
		}

		if (interaction.customId  == "kayıtbuton1") {
			let süre = await db2.get(`butontıklama_${interaction.user.id}`)
				let timeout = 1000 * 60 * 60;

if (süre !== null && (Date.now() - süre) < timeout) {
  let remainingTime = timeout - (Date.now() - süre);
  let minutes = Math.floor(remainingTime / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000); 

  return interaction.reply({ content: `> **\`\`\`Tekrar Yetkililere Bildirim Göndermek İçin Kalan Süre: ${minutes} Dakika ${seconds} Saniye ❗\`\`\`**`, ephemeral: true });
}

if(interaction.member.roles.cache.has(whitelistpermi))
return interaction.reply({content:`**Sen Zaten Kayıtlısın. Yetkililere Bildirim Gönderemezsin \`❌\`**`,ephemeral:true})
	
else {


		
				var serverIcon = interaction.guild.iconURL({dynamic: true});

	
				const embed5523 = new EmbedBuilder()
				.setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
				.setDescription(`**${interaction.member} Adlı Kişi Mülakat Butonuna Bastı \`❗\` \n\nKullanıcı ID:** \`${interaction.member.id}\``)
				.setTimestamp()
				.setColor(renk)
				.setFooter({text: `Butona Basıldı.`, iconURL: `${interaction.member.displayAvatarURL()}`})

				const yetkilibildirimlogLogs = await Log.find({}, 'yetkilibildirimlog');
				if (yetkilibildirimlogLogs.length === 0) {
					return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
				}
				const yetkilibildirimlogkanalid = yetkilibildirimlogLogs.map(log => log.yetkilibildirimlog)
		  
				const yetkilibildirimlogkanalımız = yetkilibildirimlogkanalid.join(', ')
				const kanal = interaction.guild.channels.cache.get(yetkilibildirimlogkanalımız)
				if(!kanal) return console.log(`yetkilibildirimlog-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`,)


				kanal.send({content: `<@&${yetkiliekibi}> `, embeds: [embed5523]}) 
	

			const kayıtmesaj = new EmbedBuilder()
			.setTitle(`${interaction.guild.name}`)
			.setDescription(`**Yetkililere Bildirimin Gönderildi \`❗\`**\n Merhaba Hoşgeldin ${interaction.member} \`🤍\`\n Bu Sırada Mülakat Kanalına Geçiş Sağlayıp Bekleyebilirsin. \n \`〰\` <#${mülakatseskanal}> \`〰\``)
			.setThumbnail(`${interaction.member.displayAvatarURL()}`)
			.setTimestamp()
			.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})

			await interaction.member.roles.add(config.kayıtsızüyepermi);

				 interaction.reply({ embeds: [kayıtmesaj], ephemeral: true });
	
				 
	
			   	 db2.set(`butontıklama_${interaction.user.id}`,Date.now());
			

				} 
		}            
	});
	
	client.on("messageCreate", async message => {
		if (message.channel.type === 1) {
			return;
		  }

		if (message.content.toLowerCase() === '!butonke') {
			if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
		  { 
			return;
		  }
		   const kayıtbutonu1 = new ActionRowBuilder()
		   .addComponents(
			new ButtonBuilder()
			.setCustomId("kayıtbuton1")
			.setLabel('Mülakattayım')
			.setEmoji(emoji)
			.setStyle(ButtonStyle.Secondary)
		   )
	
		   let embed = new EmbedBuilder()
		   .setColor(renk)
		   .setTitle("Mülakatta Bekliyorsan Butona Tıkla!")
		   .setDescription(`● Öncelikle **${message.guild.name}** Oyuncuları Olmak İçin Hoş Geldiniz. Sizleri Aramızda Görmekten Mutluluk Duyuyoruz.

		   ● Siz Değerli Oyuncularımız İçin En Kaliteli ve Güzel Bir Sunucu Ortamı Kurmaktayız.
		   		   
		   ● Sunucumuz %60 Sosyal RP %40 GunRP Şeklinde Olucaktır(Siz Değerli Oyuncularımız İçin!).
		   
		   ● Mülakatları Geçmek İçin +18 Yaş Ve Kaliteli Rol Bilgisine Sahip Olmanız Gerekmektedir.
		   
		   ● En Kaliteli Roller Ve Anlayışlı Yönetim Ekibimiz Sayesinde Sizi Memnun Etmeyeceğimize Dair Bir Kuşkunuz Kesinlikle Olmasın.
		   
		   ● Oluşan Sorunlarda Hızlı Ve Doğru Kararlar İle İlerlemekteyiz.`)
		   .setImage(`${config.sunucubanner}`)
		   .setThumbnail(config.sunucuiconurl)
		   message.channel.send({content:"||@everyone|| **&** ||@here||", embeds: [embed], components: [ kayıtbutonu1 ]});
		 
		   
		   } });




		   client.on('messageDelete', async message => {
			if (message.channel.type === 1) {
				return; 
			}
		
			const { guild, author, content, channel } = message;
		
			const botUser = message.guild.members.cache.get(client.user.id);

			const ticketLogs = await Log.find({}, 'ticketLog');
			const ticketkanalid = ticketLogs.map(log => log.ticketLog)
			const ticketkanalımız = ticketkanalid.join(', ')

			if(message.channel.id === ticketkanalımız) return;

			if (message.member !== botUser) return;

            const kategoriId = await db.get(`kategoriid_`);

			const channel2 = message.channel;
		  
try {
	if (channel2.parentId === kategoriId) {
		if (message.embeds.length > 0) {
			const embed = message.embeds[0];
			message.channel.send({ embeds: [embed] });
		} else {
			const mesaj = message.content;
			message.channel.send(mesaj);
				return;
			
		}			
	}
	else return
} catch (error) {
	return console.log(`Kategori Mesaj Koruma Sorun Oluştu. ${error}`)	
}
	

		});
		


client.on('messageDelete', async message => {
	if (message.channel.type === 1) {
		return;
	  }

	const { guild, author, content, channel } = message;
  
	const botUser = message.guild.members.cache.get(client.user.id);

	if (message.member === botUser) {
		return;
	  }

	const mesajLogs = await Log.find({}, 'mesajLog');
	if (mesajLogs.length === 0) {
		return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
	}
	const mesajkanalid = mesajLogs.map(log => log.mesajLog)

	const mesajkanalımız = mesajkanalid.join(', ')
	const kanal = message.guild.channels.cache.get(mesajkanalımız)
	if(!kanal) return console.log(`mesaj-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)

	const logChannel = kanal
  

try {
	
   
  
	  if (author) {
	
		const user = author.username
  
		const embed = new EmbedBuilder()
		.setAuthor({name: `${message.guild.name}`, iconURL: `${sunucuiconurl}`})
		.setTitle(`Kullanıcı ${message.channel} Kanalında Mesajını Sildi \`❗\``)
		.setDescription(`> **${message.member}** Tarafından Mesaj Silindi.\n> \n> **Mesajın Silindiği Kanal:** <#${channel.id}>\n> \n> **Silinen Mesaj:** ${content} \n> \n> **Kanal ID:** ${channel.id}\n> \n> **Silen Kişi ID:** ${message.member.id} / ${user}`)
		.setThumbnail(`${message.member.displayAvatarURL()}`) 
		.setFooter({text: `${message.member.displayName}`, iconURL: `${message.member.displayAvatarURL()}`}) 
		.setTimestamp()
		.setColor('BLACK')
		logChannel.send({embeds: [embed]});
	  } else {
		return;
	  }

} catch (error) {
	const embed2 = new EmbedBuilder()
	.setTitle(`Kullanıcı Belirtilen Kanalda Mesaj Sildi!`)
	.setAuthor({name: `${message.guild.name}`, iconURL: `${sunucuiconurl}`})
	.setColor("BLACK")
	.setDescription(`> **Bir Sorun Oluştu Yazıları Alamadım!**`)
	.setTimestamp();


	kanal.send({ embeds: [embed2] });
}


  });


  client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.channel.type === 1) {
		return;
	  }

	  if (newMessage.channel.type === 1) {
		return;
	  }

	  if (oldMessage.conent === newMessage.content) {
		return;
	  }

	  const botUser = oldMessage.guild.members.cache.get(client.user.id);

	  if (oldMessage.member === botUser) {
		  return;
		}

		const botUser2 = newMessage.guild.members.cache.get(client.user.id);

		if (newMessage.member === botUser2) {
			return;
		  }

	const { guild, author, content, channel } = oldMessage;


	const mesajLogs = await Log.find({}, 'mesajLog');
	if (mesajLogs.length === 0) {
		return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
	}
	const mesajkanalid = mesajLogs.map(log => log.mesajLog)

	const mesajkanalımız = mesajkanalid.join(', ')
	const kanal = newMessage.guild.channels.cache.get(mesajkanalımız)
	if(!kanal) return console.log(`mesaj-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)

	const logChannel = kanal; 

try {
	if(oldMessage.member === client.user && newMessage.member === client.user) return;

	if(oldMessage.author.bot && newMessage.author.bot) return;

	const user = oldMessage.author

	const embed = new EmbedBuilder()
	  .setTitle(`Kullanıcı ${oldMessage.channel} Kanalında Mesajını Düzenledi \`❗\``)
	  .setAuthor({name: `${oldMessage.guild.name}`, iconURL: `${sunucuiconurl}`})
	  .setColor("BLACK")
	  .setThumbnail(`${oldMessage.member.displayAvatarURL()}`) 
	  .setDescription(`> **Kullanıcı:** ${oldMessage.author} \n> \n> **Mesajın Düzenlendiği Kanal:** <#${channel.id}>\n> \n> **Önceki Mesajı:** ${oldMessage.content} \n> \n> **Yeni Mesaj:** ${newMessage.content}\n> \n> **Silen Kişi ID:** ${oldMessage.member.id} / ${oldMessage.author.tag}`)
	  .setFooter({text: `${oldMessage.member.displayName}`, iconURL: `${oldMessage.member.displayAvatarURL()}`}) 
	  .setTimestamp();
  
	logChannel.send({ embeds: [embed] });
} catch (error) {
	const embed2 = new EmbedBuilder()
	.setTitle("Kullanıcı Belirtilen Kanalda Mesaj Düzenledi!")
	.setAuthor({name: `${oldMessage.guild.name}`, iconURL: `${sunucuiconurl}`})
	.setColor("BLACK")
	.setDescription(`> **Bir Sorun Oluştu Yazıları Alamadım!**`)
	.setTimestamp();

	kanal.send({ embeds: [embed2] });

}


	
  });



	client.on("voiceStateUpdate", async (oldState, newState) => {

		const embed = new EmbedBuilder()
		.setTimestamp()
		.setColor(`Black`)

		if(oldState.id === config.botid || newState.id === config.botid) return;

		const sesLogs = await Log.find({}, 'sesLog');
		if (sesLogs.length === 0) {
			return console.log(`Hiçbir Log Verisi Bulamadım!❌`)
		}
		const seskanalid = sesLogs.map(log => log.sesLog)
  
		const seskanalımız = seskanalid.join(', ')
		const kanal = oldState.guild.channels.cache.get(seskanalımız)
		if(!kanal) return console.log(`> ses-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)

        const log = kanal
		if(!oldState) return;
		if(!newState) return;

        if (!oldState.channel && newState.channel) {
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalına Giriş Yaptı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_ses_girdi.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return
		} 
        if (oldState.channel && !newState.channel)
		{
			embed.setDescription(`> **${oldState.member.displayName} Kullanıcısı \`${oldState.channel.name}\` Adlı Ses Kanalından Çıkış Yaptı \`❗\`**`)
			embed.setAuthor({name: `${oldState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_ses_cikti.png`})
			embed.setFooter({text: `${oldState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		} 
        if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id)
		{
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı Ses Kanalını Değiştirdi \`❗\`** \n> \n> **(Eski Kanal: \`${oldState.channel.name}\` => Yeni Kanal: \`${newState.channel.name}\`)**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_ses_girdi.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		
		}
        if (oldState.channel.id && oldState.selfMute && !newState.selfMute) 
		{
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Kendi Susturmasını Kaldırdı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_mikrofon_acik.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		}
        if (oldState.channel.id && !oldState.selfMute && newState.selfMute)
		{ 
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Kendini Susturdu \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_mikrofon_kapali.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		}   
        if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming)
		{
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Yayın Açtı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_yayin_acik.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		} 
        if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming)
		{
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Yayını Kapattı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_yayin_kapali.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		} 
        if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo)
		{ 
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Kamera Açtı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_kamera_acik.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		} 
        if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo)
		{
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Kamerasını Kapattı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_kamera_kapali.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		} 
		if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf)
		{ 
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Kendi Sağırlaştırmasını Kaldırdı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_kulaklik_acik.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		} 
        if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) 
		{ 
			embed.setDescription(`> **${newState.member.displayName} Kullanıcısı \`${newState.channel.name}\` Adlı Ses Kanalında Kendini Sağırlaştırdı \`❗\`**`)
			embed.setAuthor({name: `${newState.guild.name}`, iconURL: `https://904.com.tr/resimler/904_kulaklik_kapali.png`})
			embed.setFooter({text: `${newState.guild.name}`})
			log.send({embeds: [embed]});
			return;
		}
    module.exports.conf = {
        name: "voiceStateUpdate"
    }
    });



	let cooldown2 = new Set();

	client.on("messageCreate", async message => {
	  if (message.channel.type === 1) return;
	  if(message.author.id === config.botid) return;
	  if(message.channel.id === config.oyundankareler) return;
	  
	  let data = ["sa", "Sa", "S.a", "s.a", "s.A", "S.A", "sA", "SA", "sea", "Sea", "SEA", "Selamün Aleyküm", "selamün aleyküm", "Selamun Aleykum", "selamun aleykum", "Selamun Aleyküm", "selamun aleykum"];
	  if (data.includes(message.content)) {
		if (cooldown2.has(message.author.id)) {
			if (message.deletable) message.delete().catch(()=> null);
		}
		
		cooldown2.add(message.author.id); 
		setTimeout(() => {
		  cooldown2.delete(message.author.id); 
		}, 30000); 
		
		message.reply("**Aleyküm Selam!**");
	  }
	});


		  const { joinVoiceChannel } = require('@discordjs/voice');
const { time } = require("console");


client.once('ready', async () => {
const guild = await client.guilds.fetch(config.guildID)
if(!guild) return console.log(`Guild Bulunumadı!`)

const botuser = await guild.members.cache.get(`${config.botid}`)
if(!botuser) return console.log(`Bot ID Bulunumadı!`)

const botsesgiris = await Log.find({}, 'botsesgiris');
		if (botsesgiris.length === 0) {
			return console.log(`Hiçbir Log Verisi Bulamadım! ❌ `)
		}
		const botsesgirisid = botsesgiris.map(log => log.botsesgiris)
  
		const botsesgirisımız = botsesgirisid.join(', ')
		const kanal = guild.channels.cache.get(botsesgirisımız)
		if(!kanal) return console.log(`Botun Girebileceği Ses Kanalı Sunucuda Mevcut Değil! ❌ `)
		if(kanal.type !== 2) return console.log(`Botun Gireceği Kanal Bir Ses Odası Olmalı ❌`)
		
const targetChannel = kanal

if(!botuser.voice.channel) {
	try {
        const voiceConnection = await joinVoiceChannel({
            channelId: targetChannel.id,
            guildId: targetChannel.guild.id,
            adapterCreator: targetChannel.guild.voiceAdapterCreator
        });

        console.log(`Başarıyla Sesli Kanala Katıldı: ${targetChannel.name}`);
    } catch (error) {
        console.error(`Kanala katılırken bir hata oluştu: ${error}`);
    }
}
else {
	await wait(300_000);
	try {
        const voiceConnection = await joinVoiceChannel({
            channelId: targetChannel.id,
            guildId: targetChannel.guild.id,
            adapterCreator: targetChannel.guild.voiceAdapterCreator
        });
console.log(`Başarıyla Sesli Kanala Katıldı: ${targetChannel.name}`);
    } catch (error) {
        console.error(`Kanala katılırken bir hata oluştu: ${error}`);
    }
}

});




		  const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg",]
		  
		  client.on("guildMemberAdd", async (member) => {

			const SistemDatabase = await sistemdb.find({})
			const antibot = SistemDatabase.map(sistem => sistem.antibot).join(', ')

			if(antibot !== 'true') return


			const member2 = await member.guild.members.fetch(member.id);

			if(member.user.bot) 
			{

				console.log(`Kişi Bot ${member.user.id}`)
				const reason = `904 Anti Raid Sistem`
				await member2.ban({ reason });
			
			}
			else
			{
				return;
			}


		  })


		  client.on("messageCreate", async (message) => {
			if (message.channel.type === 1) {
				return; 
			  }

			  const botUser = message.guild.members.cache.get(client.user.id);
			  if (message.member === botUser) {
				  return;
				}
			  
				if(!message.member) return 

			if(message.member.roles.cache.has(`${config.banhammer}`) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return

				if (reklam.some(word => message.content.toLowerCase().includes(word)) ) {

					const SistemDatabase = await sistemdb.find({})
        			const antireklam = SistemDatabase.map(sistem => sistem.antireklam).join(', ')
					if(antireklam !== 'true') return

					const reklam904 = new EmbedBuilder()
					.setAuthor({name: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}`})
					.setDescription(`> **Kişi Bilgileri: ${message.author} / ${message.author.id}**\n\n> **Yapılan Reklam:** ${message.content}`)
					.setThumbnail(message.author.displayAvatarURL())
					.setFooter({text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}`})

					if (message.deletable) message.delete().catch(()=> null);

					const reklamLogs = await Log.find({}, 'reklamLog');
					if (reklamLogs.length === 0) {
						return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
					}
					const reklamkanalid = reklamLogs.map(log => log.reklamLog)
			  
					const reklamkanalımız = reklamkanalid.join(', ')
					const kanal = message.guild.channels.cache.get(reklamkanalımız)
					if(!kanal) return console.log(`reklam-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`,)
				  await kanal.send({embeds: [reklam904], content: `<@&${config.banhammer}> / <@&${config.yetkiliekibi}>`})
				  }

		})

		client.on("messageUpdate", async (oldMessage, NewMessage) => {
			if (oldMessage.channel.type === 1) {
				return; 
			  }
			  if (NewMessage.channel.type === 1) {
				return; 
			  }

			  const botUser = oldMessage.guild.members.cache.get(client.user.id);

			  if (oldMessage.member === botUser) {
				  return;
				}
		
				const botUser2 = NewMessage.guild.members.cache.get(client.user.id);
		
				if (NewMessage.member === botUser2) {
					return;
				  }
				  if(!NewMessage.member) return console.log(`Reklam Düzenleme Alınmadı!`)

			if(NewMessage.member.roles.cache.has(`${config.banhammer}`) || NewMessage.member.permissions.has(PermissionsBitField.Flags.Administrator)) return

				if (reklam.some(word => NewMessage.content.toLowerCase().includes(word)) ) {
					const SistemDatabase = await sistemdb.find({})
        			const antireklam = SistemDatabase.map(sistem => sistem.antireklam).join(', ')
					if(antireklam !== 'true') return

					const reklam904 = new EmbedBuilder()
					.setAuthor({name: `${NewMessage.guild.name}`, iconURL: `${NewMessage.guild.iconURL()}`})
					.setDescription(`> **Kişi Bilgileri: ${NewMessage.author} / ${NewMessage.author.id}**\n\n> **Düzenlenerek Yapılan Reklam:** ${NewMessage.content}`)
					.setThumbnail(NewMessage.author.displayAvatarURL())
					.setFooter({text: `${NewMessage.guild.name}`, iconURL: `${NewMessage.guild.iconURL()}`})

					if (NewMessage.deletable) NewMessage.delete().catch(()=> null);

					const reklamLogs = await Log.find({}, 'reklamLog');
					if (reklamLogs.length === 0) {
						return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
					}
					const reklamkanalid = reklamLogs.map(log => log.reklamLog)
			  
					const reklamkanalımız = reklamkanalid.join(', ')
					const kanal = NewMessage.guild.channels.cache.get(reklamkanalımız)
					if(!kanal) return console.log(`reklam-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`,)		
				  await kanal.send({embeds: [reklam904], content: `<@&${config.banhammer}> / <@&${config.yetkiliekibi}>`})
				  }

		})

		
		let cooldown5 = new Set();

	client.on("messageCreate", async (message) => {
		try {
			if (message.channel.type === 1) return;

			if (message.channel.id !== `${config.oyundankareler}`) { 
			  return;
			}
			if (message.author.id === `${config.botid}`) return;
	
	
			if(message.content.includes("https://media.discordapp.net/attachments/")) return;
			if (message.attachments.size < 1) {
				if (cooldown5.has(message.author.id)) {
					if (message.deletable) message.delete().catch(()=> null);
					return
				} 
	
				cooldown5.add(message.author.id); 
				setTimeout(() => {
				  cooldown5.delete(message.author.id); 
				}, 30000); 
			  if (message.deletable) message.delete().catch(()=> null);
			  await message.channel.send(`**${message.author} Bu Kanal'a Sadece Resim Atabilirsin \`❌\`**`)
			}
		} catch (error) {
			console.log(`Mesaj Silinmiş.`)
		}

	  });


		client.on("guildMemberUpdate", async (oldMember, newMember) => {
			const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
			const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
			

			const rolLogs = await Log.find({}, 'rolLog');
			if (rolLogs.length === 0) {
				return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
			}
			const rolkanalid = rolLogs.map(log => log.rolLog)
			const rolkanalımız = rolkanalid.join(', ')
			const kanal = newMember.guild.channels.cache.get(rolkanalımız)
			if(!kanal) return console.log(`rol-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)

			if(newMember.id === `${botid}` && oldMember.id === `${botid}`) return; 

			addedRoles.forEach(role => {
			  const auditLogEntry = newMember.guild.fetchAuditLogs({
				type: AuditLogEvent.MemberRoleUpdate,
				limit: 1
			  }).then(logs => {
				const log = logs.entries.first();
				const executor = log.executor;
				if(executor.id === `${botid}`) return;
				const embed = new EmbedBuilder()
				.setTitle("Kullanıcıya Rol Eklendi \`✅\`")
				.setAuthor({name: `${newMember.displayName}`, iconURL: `${newMember.displayAvatarURL()}`})
				.setImage(`${sunucubanner}`)
				.setThumbnail(`${newMember.displayAvatarURL()}`)
				.setColor(`Green`)
				.setDescription(`> **Verilen Kullanıcı Bilgileri:** ${newMember}\n \`\`\`${newMember.displayName} / ${newMember.id}\`\`\`\n> **Verilen Rol ve Rol ID:** ${role} **/** ${role.id}\n> \n> **Veren Kişi Bilgileri:** ${executor} **/** ${executor.id}`)
				.setFooter({text: `Rolü Veren Kişi: ${executor.tag}`, iconURL: `${executor.displayAvatarURL()}`}) 
				kanal.send({ embeds: [embed] });
			  }).catch(console.error);
			});
		  
			removedRoles.forEach(role => {
			  const auditLogEntry = newMember.guild.fetchAuditLogs({
				type: AuditLogEvent.MemberRoleUpdate,
				limit: 1
			  }).then(logs => {
				const log = logs.entries.first();
				const executor = log.executor;
				if(executor.id === `${botid}`) return;
				const embed = new EmbedBuilder()
				  .setTitle("Kullanıcıdan Rol Alındı \`❎\`")
				  .setAuthor({name: `${newMember.displayName}`, iconURL: `${newMember.displayAvatarURL()}`})
				  .setImage(`${sunucubanner}`)
				  .setThumbnail(`${newMember.displayAvatarURL()}`)
				  .setColor(`Black`)
				  .setDescription(`> **Alınan Kullanıcı Bilgileri:** ${newMember}\n \`\`\`${newMember.displayName} / ${newMember.id}\`\`\`\n> **Alınan Rol ve Rol ID:** ${role} **/** ${role.id}\n> \n> **Alan Kişi Bilgileri:** ${executor} **/** ${executor.id}`)
				  .setFooter({text: `Rolü Alan Kişi: ${executor.tag}`, iconURL: `${executor.displayAvatarURL()}`}) 
				kanal.send({ embeds: [embed] });
			  }).catch(console.error);
			});

		
		  });


		  const TICK_EMOJI = '✅'; 
		  const RED_EMOJI = '❌'; 
		  
			  client.on("messageCreate", async message => {
		  
		  try {
			  if (message.channel.type === 1) return;
		  
				  if(message.channelId !== `${isimistekkanal}`) return;
		  
				  if(message.member.id === `${botid}`) return;
				  const content = message.content;
		  
				  const hasLink = /https?:\/\/[^\s]+/.test(content); 
				  const hasMentions = /<@!?\d+>/.test(content); 
				  const hasImages = /\bhttps?:\/\/\S+\b/gi.test(content); 
				  if (message.stickers.size > 0 || content.includes('<a:')) {
					  return message.reply(`**Lütfen Düzgün Bir İsim Yazınız.**`);
				  }
				  if (hasLink || hasMentions || hasImages) {
					return message.reply(`**Lütfen Düzgün Bir İsim Yazınız.**`);
				  }
		  
		  
					await message.react(TICK_EMOJI);
					await message.react(RED_EMOJI);
		  } catch (error) {
			  return console.log('\x1b[31m', `Otomatik İsim Düzenleme Komutunda Sorun Oluştu! (904 Development)`)
		  }
		  
				  
			  
			});
		  
		  
			client.on('messageReactionAdd', async (reaction, user) => {
			  if (reaction.message.channelId !== `${isimistekkanal}`) return;
		  
		  
			  try {
				  if (reaction.emoji.name === '✅') {
					  const member = reaction.message.guild.members.cache.get(user.id);
					  if(member.id === `${botid}`) return;
			  
					  const message = reaction.message;
					  const content = message.content;
					  const BüyükKullanıcıAdı = content.split(' ').map(word => {
						return word.charAt(0).toUpperCase() + word.slice(1);
					}).join(' ');
					
					  const username = user.username;
					  if (member.roles.cache.get(`${yetkiliekibi}`)) {
			  
					  await reaction.message.member.setNickname(BüyükKullanıcıAdı);
					  await reaction.message.reply(`> **${user} Tarafından Kullanıcı Adı İsteğiniz Onaylandı! \`✅\` Onaylanan Kullanıcı Adı: \`${BüyükKullanıcıAdı}\`**`)
					  await message.reactions.removeAll()
				  }
					}
					if (reaction.emoji.name === '❌') {
					  const member = reaction.message.guild.members.cache.get(user.id);
					  if(member.id === `${botid}`) return;
					  if (member.roles.cache.get(`${yetkiliekibi}`)) {
						const username = user;
						  const message = reaction.message;
			  
						  await reaction.message.reply(`> **${user} Tarafından Kullanıcı Adı İsteğiniz Reddedildi! \`❌\`**`)
						  await message.reactions.removeAll()
					  }
				  }
			  } catch (error) {
				  const message = reaction.message;
				  const member = reaction.message.guild.members.cache.get(user.id);
				  await reaction.message.reply(`> **${member} Adlı Kullanıcının Adını Düzenleme Yetkim Yok \`❗\`**`)
				  await message.reactions.removeAll()
			  return;
			  }
			  
				});
	  




let cooldown3 = new Set();



client.on("messageCreate", async message => {
		  
		  try {
			  if (message.channel.type === 1) return;
		  
				  if(message.channelId !== `${config.permistekkanal}`) return;
		  
				  if(message.member.id === `${botid}`) return;
				  const content = message.content;
		  
				  const hasLink = /https?:\/\/[^\s]+/.test(content); 
				  const hasMentions = /<@&!?\d+>/.test(content); 
				  const hasImages = /\bhttps?:\/\/\S+\b/gi.test(content); 

				  if (cooldown3.has(message.author.id)) {
					if (message.deletable) message.delete().catch(()=> null); 					
				  }

				  if (message.stickers.size > 0 || content.includes('<a:')) {
					cooldown3.add(message.author.id); 
		setTimeout(() => {
		  cooldown3.delete(message.author.id); 
		}, 10000); 
					return message.reply(`> **Lütfen Düzgün Bir Rol Etiketleme Talebinde Bulununuz.**`);
				  }
				  if (hasLink || hasImages) {
					cooldown3.add(message.author.id); 
		setTimeout(() => {
		  cooldown3.delete(message.author.id); 
		}, 10000); 
					return message.reply(`> **Lütfen Düzgün Bir Rol Etiketleme Talebinde Bulununuz.**`);
					
				  }

				  if(!hasMentions)
				  {
					cooldown3.add(message.author.id); 
		setTimeout(() => {
			cooldown3.delete(message.author.id); 
		}, 10000); 
					message.channel.send(`> **${message.member} Vermek İstediğiniz Rolü Lütfen Cümlenizde Etiketleyiniz. Örnek:** \`<@&ROLID> Veya @rolismi\` __(Rol ID Yazan Yere Rolün ID'sini Giriniz.)__`)
					if (message.deletable) message.delete().catch(()=> null);
				  }
		  
		  
					await message.react(TICK_EMOJI);
					await message.react(RED_EMOJI);
		  } catch (error) {
			  return console.log('\x1b[31m', `Otomatik Perm Verme İsteğinde Sorun Oluştu! (904 Development)`)
		  }
		  
				  
			  
			});
		  
		  
			client.on('messageReactionAdd', async (reaction, user) => {
			  if (reaction.message.channelId !== `${config.permistekkanal}`) return;
		  
		  
			  try {
				  if (reaction.emoji.name === '✅') {
					  const member = reaction.message.guild.members.cache.get(user.id);
					  if(member.id === `${botid}`) return;
			  
					  const message = reaction.message;

					  const content = message.content;

		
					
					  if (member.roles.cache.get(`${yetkiliekibi}`)) {
			  

						let user;
    let roleName;

    if (message.mentions.users.size > 0) {
      user = message.mentions.members.first();
	 roleName = content.split('<@&')[1].split('>')[0];

    } else {
	await message.reactions.removeAll()
    await message.reply('**Lütfen Format Biçimini Düzgün Kullanın! <@836953972861698138> <@&rolid> Şeklinde Etiketleme Yapın. \`❗\`**');
	return
    }
    if (!user || !roleName) {
	await message.reactions.removeAll()
      await message.reply('**Kullanıcı veya Rol Bilgisi Eksik Veya Yanlış \`❗\`**');
	  return;
    }



const botkendi = message.guild.members.cache.get(config.botid)

if(botkendi.roles.highest.comparePositionTo(roleName) <= 0) 
{
						message.reactions.removeAll()
                        return message.reply(`**Vermeye Çalıştığınız Role Yetkim Yetmiyor <@&${roleName}> \`❌\`**`)
}

await user.roles.add(roleName)
 
	


						const embed = new EmbedBuilder()
						.setTimestamp()
						.setThumbnail(`${user.displayAvatarURL()}`)
						.setFooter({text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}`})
						embed.setDescription(`> **${member} Tarafından Perm İsteğiniz Onaylandı!** \`✅\`\n\n**Rol Verilen Kİşinin Bilgileri:**\n\n> ** ${user} / \`${user.id}\`**\n\n> **Verilen Rol: <@&${roleName}> / \`${roleName}\`**`)
						
						message.reply({embeds: [embed]})
						message.reactions.removeAll()
			            .catch((error) => {
										console.error('Rol verme hatası:', error);
									});
							/*
							const userTag = content.split('<@')[1].split('>')[0];
							const roleTag = content.split('<@&')[1].split('>')[0];
					
							const user = message.guild.members.cache.get(userTag);
							const role = message.guild.roles.cache.get(roleTag);

							const embed = new EmbedBuilder()
							.setTimestamp()
							.setThumbnail(`${user.displayAvatarURL()}`)
							.setFooter({text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}`})
	

							if (user && role) {
								user.roles.add(role)
									.then(() => {
										embed.setDescription(`> **${member} Tarafından Perm İsteğiniz Onaylandı!** ✅\n\n**Rol Verilen Kİşinin Bilgileri:**\n\n> ** ${user} / ${user.id}**`)

										 message.reply({embeds: [embed]})
										 message.reactions.removeAll()

									})
									.catch((error) => {
										console.error('Rol verme hatası:', error);
									});
							}*/
						

			
				  }
					}

					if (reaction.emoji.name === '❌') {

					  const member = reaction.message.guild.members.cache.get(user.id);
					  if(member.id === `${botid}`) return;

					  if (member.roles.cache.get(`${yetkiliekibi}`)) {

						const message = reaction.message;

						const embed = new EmbedBuilder()
						.setTimestamp()
						.setDescription(`> **${member} Tarafından Perm İsteğiniz Reddedildi!** \`❌\``)
						.setFooter({text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}`})


						message.reply({embeds: [embed], content: `${message.member}`})
						message.reactions.removeAll()

					  }
				  }
			  } catch (error) {
				  const message = reaction.message;
				  console.log(error)
			  
				  await reaction.message.reply(`> **Lütfen Format Biçimini Düzgün Kullanın! <@1135956637128077403> <@1193910729590452356> Şeklinde Etiketleme Yapın.**`)
				  await message.reactions.removeAll()
			  return;
			  }
			
				});


				client.on('roleUpdate', async (oldRole, newRole) => {

					const fetchedLogs = await oldRole.guild.fetchAuditLogs({
						type: AuditLogEvent.RoleUpdate,
						limit: 1,
					})
	
					const firstEntry = fetchedLogs.entries.first()
	
						const { executor,  } = firstEntry;
	
						const executorid = await oldRole.guild.members.fetch(executor.id)
	
						if(executorid.id === botid) return;


						const izinler904 = {
							'CreateInstantInvite': 'Davet Oluştur',
							'KickMembers': 'Üyeleri At',
							'BanMembers': 'Üyeleri Yasakla',
							'Administrator': 'Yönetici',
							'ManageChannels': 'Kanalları Yönet',
							'ManageGuild': 'Sunucuyu Yönet',
							'AddReactions': 'Tepki Ekle',
							'ViewAuditLog': 'Denetim Kaydını Görüntüle',
							'PrioritySpeaker': 'Öncelikli Konuşmacı',
							'Stream': 'Yayın Aç',
							'ViewChannel': 'Kanalı Görüntüle',
							'SendMessages': 'Mesaj Gönder',
							'SendTTSMessages': 'TTS Mesaj Gönder',
							'ManageMessages': 'Mesajları Yönet',
							'EmbedLinks': 'Bağlantı Gönder',
							'AttachFiles': 'Dosya Gönder',
							'ReadMessageHistory': 'Mesaj Geçmişini Oku',
							'MentionEveryone': 'Herkesi Bahset',
							'UseExternalEmojis': 'Harici Emojiler Kullan',
							'Connect': 'Bağlan',
							'Speak': 'Konuş',
							'MuteMembers': 'Üyeleri Sustur',
							'DeafenMembers': 'Üyeleri Sağırlaştır',
							'MoveMembers': 'Üyeleri Taşı',
							'UseVAD': 'Ses Algılama Kullan',
							'ChangeNickname': 'Kullanıcı Adı Değiştir',
							'ManageNicknames': 'Kullanıcı Adlarını Yönet',
							'ManageRoles': 'Rolleri Yönet',
							'ManageWebhooks': 'Webhookları Yönet',
							'ManageEmojisAndStickers': 'Emojileri ve Stickerları Yönet',
							'UseApplicationCommands': 'Uygulama Komutlarını Kullan',
							'ManageEvents': 'Etkinlikleri Yönet',
							'ManageThreads': 'Thread\'leri Yönet',
							'CreatePublicThreads': 'Genel Thread\'leri Oluştur',
							'CreatePrivateThreads': 'Özel Thread\'leri Oluştur',
							'UseExternalStickers': 'Harici Stickerları Kullan',
							'SendMessagesInThreads': 'Thread\'lerde Mesaj Gönder',
							'UseEmbeddedActivities': 'Gömülü Aktiviteleri Kullan',
							'ModerateMembers': 'Üyeleri Düzenle'
						  };


	
						  const oldPermissions = oldRole.permissions.toArray().map(p => `${izinler904[p]}`).filter(Boolean).join(', ') || 'Yok';
						  const newPermissions = newRole.permissions.toArray().map(p => `${izinler904[p]}`).filter(Boolean).join(', ') || 'Yok';
					  

						const channelInfoEmbed = new EmbedBuilder()
						.setColor('Black')
						.setAuthor({name: `${oldRole.name} Adlı Rol Düzenlendi.`, iconURL: `${oldRole.guild.iconURL()}`})
						.setThumbnail(`https://904.com.tr/resimler/904_duzenleme.png`)
						.addFields(
							{ name: '**Eski Rol Adı**', value: `**\`\`\`${oldRole.name}\`\`\`**`, inline: true },
							{ name: '**Yeni Rol Adı**', value: `**\`\`\`${newRole.name}\`\`\`**`, inline: true },
							{ name: '**Rol ID**', value: `**\`\`\`${newRole.id}\`\`\`**`, inline: true },
							{ name: '**Eski Rol Rengi**', value: oldRole.hexColor !== '#000000' ? `**\`\`\`${oldRole.hexColor.toUpperCase()}\`\`\`**` : '**\`\`\`Varsayılan\`\`\`**', inline: true },
							{ name: '**Yeni Rol Rengi**', value: newRole.hexColor !== '#000000' ? `**\`\`\`${newRole.hexColor.toUpperCase()}\`\`\`**` : '**\`\`\`Varsayılan\`\`\`**', inline: true },
							{ name: '**Eski Rol İzinleri**', value: `**\`\`\`${oldPermissions}\`\`\`**`, inline: false },
							{ name: '**Yeni Rol İzinleri**', value: `**\`\`\`${newPermissions}\`\`\`**`, inline: false }
						  )
						.setFooter({text: `${oldRole.guild.name}`, iconURL: `${oldRole.guild.iconURL()}`})
						.setTimestamp();
				
						if (oldPermissions === newPermissions) {
							return;
							
						  }


						  const rolLogs = await Log.find({}, 'rolLog');
						  if (rolLogs.length === 0) {
							  return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
						  }
						  const rolkanalid = rolLogs.map(log => log.rolLog)
					
						  const rolkanalımız = rolkanalid.join(', ')
						  const kanal = oldRole.guild.channels.cache.get(rolkanalımız)
						  if(!kanal) return console.log(`\x1b[31m`,`rol-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)
				  
						  kanal.send({embeds: [channelInfoEmbed]});

				})




				client.on('roleCreate', async createdRole904 => {

				const fetchedLogs = await createdRole904.guild.fetchAuditLogs({
					type: AuditLogEvent.RoleCreate,
					limit: 1,
				})

				const firstEntry = fetchedLogs.entries.first()

					const { executor,  } = firstEntry;

					const executorid = await createdRole904.guild.members.fetch(executor.id)

					if(executorid.id === botid) return;

					const channelInfoEmbed = new EmbedBuilder()
					
						.setColor('Black')
						.setAuthor({name: `${createdRole904.name} Adlı Rol Oluşturuldu ✅`, iconURL: `${createdRole904.guild.iconURL()}`})
						.setThumbnail(`https://904.com.tr/resimler/904_rol_olusturma.png`)
						.setDescription(`> **Oluşturulan Rol İsmi:** ${createdRole904} / ${createdRole904.name} \n\n> **Oluşturan Yetkili ID:** ${executorid.id} \n\n> **Oluşturulan Rol Tarihi:** <t:${parseInt(createdRole904.createdTimestamp / 1000)}:R> \n\n> **Oluşturan Yetkili Adı:** ${executor} \n\n **Oluşturan Yetkilinin Rolleri:** ${executorid.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "Rolleri Yok."}`)
						.setFooter({text: `${createdRole904.guild.name}`, iconURL: `${createdRole904.guild.iconURL()}`})
						.setTimestamp();
				



						const rolLogs = await Log.find({}, 'rolLog');
						if (rolLogs.length === 0) {
							return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
						}
						const rolkanalid = rolLogs.map(log => log.rolLog)
				  
						const rolkanalımız = rolkanalid.join(', ')
						const kanal = createdRole904.guild.channels.cache.get(rolkanalımız)
						if(!kanal) return console.log(`\x1b[31m`,`> **\`rol-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** ❌`)
				
						kanal.send({embeds: [channelInfoEmbed]});

				})

				client.on('roleDelete', async deletedRole904 => {

					const fetchedLogs = await deletedRole904.guild.fetchAuditLogs({
						type: AuditLogEvent.RoleCreate,
						limit: 1,
					})
	
					const firstEntry = fetchedLogs.entries.first()
	
						const { executor,  } = firstEntry;
	
						const executorid = await deletedRole904.guild.members.fetch(executor.id)
	
						if(executorid.id === botid) return;
	
						const channelInfoEmbed = new EmbedBuilder()
						
							.setColor('Black')
							.setAuthor({name: `${deletedRole904.name} Adlı Rol Silindi ❗`, iconURL: `${deletedRole904.guild.iconURL()}`})
							.setThumbnail(`https://904.com.tr/resimler/904_silme.png`)
							.setDescription(`> **Silinen Rol İsmi:** ${deletedRole904.name} \n\n> **Silen Yetkili ID:** ${executorid.id} \n\n> **Silinen Rol Tarihi:** <t:${parseInt(deletedRole904.createdTimestamp / 1000)}:R> \n\n> **Silen Yetkilinin Adı:** ${executor} \n\n **Silen Yetkilinin Rolleri:** ${executorid.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "Rolleri Yok."}`)
							.setFooter({text: `${deletedRole904.guild.name}`, iconURL: `${deletedRole904.guild.iconURL()}`})
							.setTimestamp();
					
	
	
	
							const rolLogs = await Log.find({}, 'rolLog');
							if (rolLogs.length === 0) {
								return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
							}
							const rolkanalid = rolLogs.map(log => log.rolLog)
					  
							const rolkanalımız = rolkanalid.join(', ')
							const kanal = deletedRole904.guild.channels.cache.get(rolkanalımız)
							if(!kanal) return console.log(`\x1b[31m`,`> **\`rol-log\` İsimli Log Kanalı Sunucuda Mevcut Değil!** ❌`)
					
							kanal.send({embeds: [channelInfoEmbed]});
	
					})



				client.on('channelDelete', async deletedChannel => {


					const fetchedLogs = await deletedChannel.guild.fetchAuditLogs({
						type: AuditLogEvent.ChannelDelete,
						limit: 1,
					});
					const firstEntry = fetchedLogs.entries.first()

					const { executor,  } = firstEntry;

					const kanalTurleri = {
						0: 'Metin_Kanalı',
						1: 'DM', 
						2: 'Ses_Kanalı',
						3: 'GRUP_DM',
						4: 'Kategori',
						5: 'Haber_Kanalı',
						6: 'Mağaza_Kanalı',
						10: 'Haber_Kanalı_Konusu',
						11: 'Genel_Konu',
						12: 'Özel_Konu',
						13: 'Sesli_Konu',
						20: 'BILINMEYEN' 
					};
					const kanalTuru = kanalTurleri[deletedChannel.type] || 'BILINMEYEN';

					const executorid = await deletedChannel.guild.members.fetch(executor.id)

					if(executorid.id === botid) return;

					const channelInfoEmbed = new EmbedBuilder()
						.setColor('Black')
						.setAuthor({name: `${deletedChannel.guild.name} Adlı Sunucumuzda Kanal Silindi \`❗\``, iconURL: `${deletedChannel.guild.iconURL()}`})
						.setThumbnail(`https://904.com.tr/resimler/904_silme.png`)
						.setDescription(`> **Silinen Kanal İsmi:** ${deletedChannel.name} \n\n> **Silinen Kanal Türü:** ${kanalTuru} \n\n> **Silen Yetkili ID:** ${executorid.id} \n\n> **Silen Yetkili Adı:** ${executor} \n\n **Silen Yetkilinin Rolleri:** ${executorid.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "Rolleri Yok."}`)
						.setFooter({text: `${deletedChannel.guild.name}`, iconURL: `${deletedChannel.guild.iconURL()}`})
				        .setTimestamp()


						const kanalLogs = await Log.find({}, 'kanalLog');
						if (kanalLogs.length === 0) {
							return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
						}
						const kanalkanalid = kanalLogs.map(log => log.kanalLog)
						const kanalkanalımız = kanalkanalid.join(', ')
						const kanal = deletedChannel.guild.channels.cache.get(kanalkanalımız)
						if(!kanal) { 
							console.log(`\x1b[31m`,`kanal-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)
							return
						}


						kanal.send({embeds: [channelInfoEmbed]});

				});


				client.on('channelCreate', async createdChannel => {

					const fetchedLogs = await createdChannel.guild.fetchAuditLogs({
						type: AuditLogEvent.ChannelCreate,
						limit: 1,
					});
					const firstEntry = fetchedLogs.entries.first()

					const { executor,  } = firstEntry;

					const kanalTurleri = {
						0: 'Metin_Kanalı',
						1: 'DM', 
						2: 'Ses_Kanalı',
						3: 'GRUP_DM',
						4: 'Kategori',
						5: 'Haber_Kanalı',
						6: 'Mağaza_Kanalı',
						10: 'Haber_Kanalı_Konusu',
						11: 'Genel_Konu',
						12: 'Özel_Konu',
						13: 'Sesli_Konu',
						20: 'BILINMEYEN' 
					};
					const kanalTuru = kanalTurleri[createdChannel.type] || 'BILINMEYEN';

					const executorid = await createdChannel.guild.members.fetch(executor.id)


					if(executorid.id === botid) return;


					const channelInfoEmbed = new EmbedBuilder()
						.setColor('Black')
						.setAuthor({name: `${createdChannel.name} Adlı Kanal Oluşturuldu ✅`, iconURL: `${createdChannel.guild.iconURL()}`})
						.setThumbnail(`https://904.com.tr/resimler/904_kanal_olusturma.png`)
						.setDescription(`> **Oluşturulan Kanal İsmi:** ${createdChannel.name} \n\n> **Oluşturulan Kanal Türü:** ${kanalTuru} \n\n> **Oluşturulan Kanal Tarihi:** <t:${parseInt(createdChannel.createdTimestamp / 1000)}:R> \n\n> **Oluşturan Yetkili ID:** ${executorid.id} \n\n> **Oluşturan Yetkili Adı:** ${executor} \n\n **Oluşturan Yetkilinin Rolleri:** ${executorid.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "Rolleri Yok."}`)
						.setFooter({text: `${createdChannel.guild.name}`, iconURL: `${createdChannel.guild.iconURL()}`})
				

						const kanalLogs = await Log.find({}, 'kanalLog');
						if (kanalLogs.length === 0) {
							return console.log(`Hiçbir Log Verisi Bulamadım! ❌`)
						}
						const kanalkanalid = kanalLogs.map(log => log.kanalLog)
						const kanalkanalımız = kanalkanalid.join(', ')
						const kanal = createdChannel.guild.channels.cache.get(kanalkanalımız)
						if(!kanal) return console.log(`\x1b[31m`,`kanal-log İsimli Log Kanalı Sunucuda Mevcut Değil! ❌`)

						kanal.send({embeds: [channelInfoEmbed]});

				});

				const { CronJob } = require('cron');
 


				client.once("ready", () => {
					  
					const job = CronJob.from({
						cronTime: '00 59 23 * * *',
						onTick: async function () {
							const guild = client.guilds.cache.get(config.guildID);
							const channel = guild.channels.cache.get(config.staffodasi);
							if(!channel) return;
							if(!guild) return;

							const SistemDatabase = await sistemdb.find({})
							const günlükyetkiliverileri = SistemDatabase.map(sistem => sistem.günlükyetkiliverileri).join(', ')
							if(günlükyetkiliverileri !== 'true') return;

							const now = new Date();
							const options = {  year: 'numeric', month: 'long', day: 'numeric' };
							const locale = 'tr-TR';
							const formattedDate2 = now.toLocaleDateString(locale, options);

							const userCoins = {};
							const userKayits = {};
							const usersWithModeratorRole = guild.members.cache.filter(member => member.roles.cache.has(config.yetkiliekibi)).map(member => member.user.id);
						  
							GunlukCoin.find({ userID: { $in: usersWithModeratorRole } }).then(gunlukcoins => {
								gunlukcoins.forEach(gunlukcoin => {
								if (!userCoins[gunlukcoin.userID]) {
								  userCoins[gunlukcoin.userID] = gunlukcoin.gunlukcoins;
								} else {
								  userCoins[gunlukcoin.userID] += gunlukcoin.gunlukcoins;
								}
							  });
						  
							  const sortedUserCoins = Object.entries(userCoins)
								.sort(([, a], [, b]) => b - a)
								.slice(0, 15);
							
					
								GunlukKayit.find({ userID: { $in: usersWithModeratorRole } }).then(gunlukkayits => {
									gunlukkayits.forEach(gunlukkayit => {
									if (!userKayits[gunlukkayit.userID]) {
									  userKayits[gunlukkayit.userID] = gunlukkayit.gunlukkayits;
									} else {
									  userKayits[gunlukkayit.userID] += gunlukkayit.gunlukkayits;
									}
								  });
								
								  const sortedUserKayits = Object.entries(userKayits)
									.sort(([, a], [, b]) => b - a)
									.slice(0, 15);


									if (sortedUserCoins.length === 0 && sortedUserKayits.length === 0) {
										return channel.send(`> **Bugün Kimse Ticket ve Kayıt Almadı.** \`😥\``);
									}
									if (sortedUserCoins.length === 0 || sortedUserKayits.length === 0) {
										return channel.send(`> **Bugün Kimse Ticket ve Kayıt Almadı.** \`😥\``);
									}

							const embed = new EmbedBuilder()
							.setTitle(`${formattedDate2} Tarihli Günlük Yetkili Verileri`)
							.setTimestamp()
							.setDescription(
								sortedUserKayits
									.map(([userID, kayits], index) => {
										const kayitPuan = kayits || 0;
										const ticketPuan = userCoins[userID] || 0;
										return `> **${index + 1}. <@${userID}>** Günlük Kayıt Puanı: __${kayitPuan}__ **/** Günlük Ticket Puanı: __${ticketPuan}__`;
									})
									.join('\n\n')
							)										
							channel.send({ embeds: [embed] });
							
							GunlukCoin.deleteMany({}, (err, result) => {
								if (err) {
									console.error("Veriler silinirken bir hata oluştu:", err);
								} else {
									console.log("Coin veriler başarıyla silindi.");
								}
							})
							GunlukKayit.deleteMany({}, (err, result) => {
								if (err) {
									console.error("Veriler silinirken bir hata oluştu:", err);
								} else {
									console.log("Kayit veriler başarıyla silindi.");
								}
							})
							
				
								})
							})
						},
						start: true,
						timeZone: 'Europe/Istanbul'
					});
					  
					job.start()  
				  });


				  const Role5 = require('./src/models/roleschema.js');

				  client.once("ready", () => {
						
					  const job = CronJob.from({
						  cronTime: '10 59 23 * * *',
						  onTick: async function () {
							  const guild = client.guilds.cache.get(config.guildID);
							  const channel = guild.channels.cache.get(config.staffodasi);
							  if(!channel) return;
							  if(!guild) return;

							  const embed = new EmbedBuilder()
							  .setTitle(`Günlük Rol Kayıt Listesi Alındı \`❗\``)
							  .setAuthor({name: `${config.sunucuismi}`, iconURL: `${config.sunucuiconurl}`})
							  .setTimestamp()
				  
							  const SistemDatabase = await sistemdb.find({})
							  const günlükrolkaydetme = SistemDatabase.map(sistem => sistem.günlükrolkaydetme).join(', ')
							  if(günlükrolkaydetme !== 'true') return;

							  Role5.deleteMany({}, (err, result) => {
								if (err) {
									console.error("Veriler silinirken bir hata oluştu:", err);
								} else {
									console.log("Tüm veriler başarıyla silindi.");
								}
							})
				  
							
							  const promises = guild.roles.cache.map(async (role) => {
								  if (role.name !== '@everyone') { 
									  await Role5.findOneAndUpdate(
										  { roleID: role.id },
										  { $set: { userID: role.members.map(member => member.id), roleName: role.name } },
										  { upsert: true }
									  );      
								  }
							  });
							  
							  await Promise.all(promises);
							  
							  channel.send({ embeds: [embed] });
							  
				  
				  
						  },
						  start: true,
						  timeZone: 'Europe/Istanbul'
					  });
						
					  job.start()  
					});

				

				async function connectToMongo() {
					try {
						mongoose.set("strictQuery", false);
						mongoose.connect(config.mongourl, {
						  useNewUrlParser: true,
						  ssl: true,
						  sslValidate: false,
						});	
					  console.log('\x1b[32m', 'MongoDB Bağlantısı Başarıyla Kuruldu. (904 Development)');
					} catch (error) {
					 return console.error('\x1b[31m', 'Mongourl Değeri Yanlış Lütfen Düzeltin. (904 Development)');
					}
				  }
				  
				  connectToMongo();

				  async function connectToToken() {
					try {
					  await client.login(token)
					  console.log('\x1b[32m', 'Token Bağlantısı Başarıyla Kuruldu. (904 Development)');
					} catch (error) {
					 return console.error('\x1b[31m', 'Token Değeri Yanlış Lütfen Config.js Dosyasından Düzeltin. (904 Development)');
					}
				  }
				  
				  connectToToken();




				  const embed = new EmbedBuilder().setColor("Red");

				  client.on("error", (err) => {
					console.log(err);
				
					embed
					  .setTitle("Discord API Error")
					  .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
					  .setDescription(
						`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
					  )
					  .setTimestamp();
				
					return webhook.send({
						username: `${config.sunucuismi}`,
						avatarURL: `${config.sunucuiconurl}`,
						embeds: [embed],
					});

				  });
				
				  process.on("unhandledRejection", (reason, promise) => {
					console.log(reason, "\n", promise);
				
					embed
					  .setTitle("Unhandled Rejection/Catch")
					  .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
					  .addFields(
						{
						  name: "Komut Hatası:",
						  value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``,
						},
						{
						  name: "Promise",
						  value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``,
						}
					  )
					  .setTimestamp();
				
					  return webhook.send({
						username: `${config.sunucuismi}`,
						avatarURL: `${config.sunucuiconurl}`,
						embeds: [embed],
					});

				});
				
				  process.on("uncaughtException", (err, origin) => {
					console.log(err, "\n", origin);
				
					embed
					  .setTitle("Uncaught Exception/Catch")
					  .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
					  .addFields(
						{
						  name: "Hata ❌",
						  value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
						},
						{
						  name: "Origin",
						  value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``,
						}
					  )
					  .setTimestamp();
				
					return webhook.send({
						username: `${config.sunucuismi}`,
						avatarURL: `${config.sunucuiconurl}`,
						embeds: [embed],
					});
				  });
				
				  process.on("uncaughtExceptionMonitor", (err, origin) => {
					console.log(err, "\n", origin);			
					embed
					  .setTitle("Uncaught Exception Monitor")
					  .setURL(
						"https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor"
					  )
					  .addFields(
						{
						  name: "Hata ❌",
						  value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
						},
						{
						  name: "Origin",
						  value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``,
						}
					  )
					  .setTimestamp();
				
					  return webhook.send({
						username: `${config.sunucuismi}`,
						avatarURL: `${config.sunucuiconurl}`,
						embeds: [embed],
					});
				  });
				
				  process.on("warning", (warn) => {
					if (warn.name === 'ExperimentalWarning' && warn.message.includes('buffer.File')) {
						return;
					}
					embed
					  .setTitle("Uncaught Exception Monitor Warning")
					  .setURL("https://nodejs.org/api/process.html#event-warning")
					  .addFields({
						name: "Uyarı ⚠️",
						value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\``,
					  })
					  .setTimestamp();
				
					  return webhook.send({
						username: `${config.sunucuismi}`,
						avatarURL: `${config.sunucuiconurl}`,
						embeds: [embed],
					});
				  });

