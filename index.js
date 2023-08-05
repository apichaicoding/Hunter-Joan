const keepAlive = require(`./server`);
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});


//Ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activities: [{ name: `Joan โชว์โหด`, type: ActivityType.Watching }],
    status: 'online',
  });
});

//AddMember
client.on('guildMemberAdd', member => {
	const welcomeChannel = member.guild.channels.cache.get(process.env['ChannelWelcome']);
  const findFriendChannel = member.guild.channels.cache.get(process.env['ChannelFindFriend']);
  const setupChannel = member.guild.channels.cache.get(process.env['ChannelSetup']);
  const botCommandChannel = member.guild.channels.cache.get(process.env['ChannelBotCommand']);
	if (welcomeChannel) {
    setTimeout(() => {
      welcomeChannel.send(`ยินดีต้อนรับสู่เซิร์ฟเวอร์!\nCommunity MonsterHunterThailand(MHTH)\nนักล่าหน้าใหม่ Hunter <@${member.user.id}>\nหาเพื่อนหรือข้อมูล <#${findFriendChannel.id}>\nวิธีติดตั้งโหลดไฟล์ <#${setupChannel.id}>\nและบอทแสนฉลาด <#${botCommandChannel.id}>`);
    }, 2000);
	}
});

//RemoveMember
client.on('guildMemberRemove', member => {
	const goodbyeChannel = member.guild.channels.cache.get(process.env['ChannelGoodbye']);
	if (goodbyeChannel) {
		goodbyeChannel.send(`Hunter <@${member.user.id}> ได้จากเราไปแล้วหวังว่าเราได้พบกันใหม่`);
	}
});

//Command
client.on('messageCreate', async (msg) => {
  const game = ["!p3"];
  const mode = ["gh","va"];
  const rankgh = ["hr1","hr2","hr3","hr4","hr5","hr6","hr7","hr8","hr9"];
  const rankva = ["lv1","lv2","lv3","lv4","lv5","lv6","lv7","lv8","lv9"];
  const imageUrls = {
    // P3 GH
    p3ghhr1: "https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FGH%2FHR1.png?alt=media&token=436d5361-666b-4c92-baee-45b550b56669",
    p3ghhr2: "https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FGH%2FHR2.png?alt=media&token=1159d994-e755-437a-8f16-7232fbf1a82f",
    p3ghhr3: "https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FGH%2FHR3.png?alt=media&token=f7360ac3-b744-454c-8316-7bf65aa612e4",
    p3ghhr4: "https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FGH%2FHR4.png?alt=media&token=c101a82c-ee2f-4504-bb99-a30a7d99b416",
    p3ghhr5: "https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FGH%2FHR5.png?alt=media&token=93007fda-49ef-40ee-8875-a489d04ebcec",
    p3ghhr6: "https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FGH%2FHR6.png?alt=media&token=2e20e2cf-93c9-4037-822e-239e70b85948",
    // P3 VA
    p3valv1:"https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FVA%2FLV1.png?alt=media&token=f2a699eb-436c-4322-afc4-3cc2ff04c8a4",
    p3valv2:"https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FVA%2FLV2.png?alt=media&token=86818582-8f55-4b53-b8bb-457d176228a0",
    p3valv3:"https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FVA%2FLV3.png?alt=media&token=8b427f3f-b567-429b-9812-42a94d1ec452",
    p3valv4:"https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FVA%2FLV4.png?alt=media&token=adfb49d1-e862-46a4-aa07-cd5189d3cbd9",
    p3valv5:"https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FVA%2FLV5.png?alt=media&token=35424126-da1d-4884-b61d-81a00f6a65e2",
    p3valv6:"https://firebasestorage.googleapis.com/v0/b/discordbothunterjaon.appspot.com/o/P3%2FVA%2FLV6.png?alt=media&token=5c7ed8b0-b18a-45ee-b0ec-73c04c3653b6",
  };
  const command = msg.content.toLowerCase();
  const setCommand = command.split(" ");
  if (msg.author.bot) return;

  //ChannelBotCommand
  if (msg.guild && msg.guild.id === process.env['SERVERID'] && msg.channel.id === process.env['ChannelBotCommand'] ) {
    game.forEach(search1 => {
      if(setCommand.length > 1){
        if(setCommand[0] === search1){
          if(setCommand[1] === mode[0]){
              rankgh.forEach(search2 => {
                if(setCommand[2] === search2){
                  const img = `${setCommand[0]}${setCommand[1]}${setCommand[2]}`
                  const imageUrl = imageUrls[img.substring(1)];
                  if (imageUrl) {
                    msg.reply(imageUrl);
                  }
                }
              });
            }else if(setCommand[1] === mode[1]){
              rankva.forEach(search2 => {
                if(setCommand[2] === search2){
                  const img = `${setCommand[0]}${setCommand[1]}${setCommand[2]}`
                  const imageUrl = imageUrls[img.substring(1)];
                  if (imageUrl) {
                    msg.reply(imageUrl);
                  }
                }
              });
            }
        }
      }else if (command === `!hello`) {
  			msg.reply(`สวัสดีฮันเตอร์ ${msg.author.displayName}`);
      }
    });
	}

  //ChannelTest
  if (msg.guild && msg.guild.id === process.env['SERVERID'] && msg.channel.id === process.env['ChannelTest'] ) {
    game.forEach(search1 => {
      if(setCommand.length > 1){
        if(setCommand[0] === search1){
          if(setCommand[1] === mode[0]){
              rankgh.forEach(search2 => {
                if(setCommand[2] === search2){
                  const img = `${setCommand[0]}${setCommand[1]}${setCommand[2]}`
                  const imageUrl = imageUrls[img.substring(1)];
                  if (imageUrl) {
                    msg.reply(`${imageUrl}`);
                  }
                }
              });
            }else if(setCommand[1] === mode[1]){
              rankva.forEach(search2 => {
                if(setCommand[2] === search2){
                  const img = `${setCommand[0]}${setCommand[1]}${setCommand[2]}`
                  const imageUrl = imageUrls[img.substring(1)];
                  if (imageUrl) {
                    msg.reply(`${imageUrl}`);
                  }
                }
              });
            }
        }
      }else if (command === `!hello`) {
  			msg.reply(`สวัสดีฮันเตอร์ <@${msg.author.id}>`);
      }
    });
	}
  
});

//Login
client.login(process.env['TOKEN']);
keepAlive();