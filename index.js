const keep_alive = require("./keep_alive");
const fs = require("fs");
const guildMemberAdd = require("./event/guildMemberAdd");
const guildMemberRemove = require("./event/guildMemberRemove");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

//Read File Command
const commands = [];

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command);
}

// ตัวแปรสำหรับเปลี่ยน timezone
const tzOffset = 7 * 60 * 60 * 1000; // 7 ชั่วโมง (เป็น millisecond)

// Function เพื่อส่งข้อความพร้อมเวลาปัจจุบัน (ใน timezone ของไทย)
function sendMessageWithTime() {
  const channel = client.channels.cache.get(process.env["CHANNEL_TEST"]);
  if (channel) {
    const currentDate = new Date();
    const thailandTime = new Date(currentDate.getTime() + tzOffset);
    const formattedDate = `วันที่ ${thailandTime
      .getDate()
      .toString()
      .padStart(2, "0")}/${(thailandTime.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${thailandTime.getFullYear()} เวลา ${thailandTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${thailandTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    channel.send(`ดาเมจ ${formattedDate}`);
  } else {
    console.log("ไม่พบช่องที่ระบุ!");
  }
}

//Ready
client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  client.user.setActivity({
    name: "โจรล่าแย้",
    type: ActivityType.Watching,
  });

  // ส่งข้อความทุกครึ่งชั่วโมง
  setInterval(() => {
    const currentDate = new Date();
    const thailandTime = new Date(currentDate.getTime() + tzOffset);
    const minutes = thailandTime.getMinutes();
    // sendMessageWithTime();
    if (minutes === 0 || minutes === 30) {
      sendMessageWithTime();
    }
  }, 60 * 1000);
});

//AddMember
// client.on("guildMemberAdd", messageHandlers.sendWelcomeMessage);

client.on("guildMemberAdd", (member) => {
  // ใช้ module.exports ที่ถูก require เข้ามาจากไฟล์ guildMemberRemove.js
  guildMemberAdd(member.guild, member);
});

//RemoveMember
// client.on("guildMemberRemove", messageHandlers.sendGoodbyeMessage);

client.on("guildMemberRemove", (member) => {
  // ใช้ module.exports ที่ถูก require เข้ามาจากไฟล์ guildMemberRemove.js
  guildMemberRemove(member.guild, member);
});

//meeageCreate
client.on("messageCreate", async (message) => {
  const allowedChannels = [
    process.env["CHANNEL_TEST"],
    process.env["CHANNEL_COMMAND"],
    process.env["TEST_CHANNEL_NORMAL"],
  ];

  if (!allowedChannels.includes(message.channel.id)) {
    return;
  }
  const prefix = "!";
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command1 = args.shift().toLowerCase();
  let command2 = "";
  let command3 = "";
  if (args.length >= 1) {
    command2 = args[0].toLowerCase();
  }
  if (args.length >= 2) {
    command3 = args.slice(1).join(" ").toLowerCase();
  }

  //Command
  const command = commands.find((cmd) => cmd.name === command1);
  if (command) {
    command.execute(message, command1, command2, command3);
  } else {
    const chatManualCommand = process.env["CHANNEL_MANUAL_COMMAND"];
    message.reply(`คำสั่งผิดโปรดตรวจสอบที่นี้ 👉<#${chatManualCommand}>👈`);
  }
});

//Login
client.login(process.env["TOKEN"]);
