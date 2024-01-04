const { createCanvas, loadImage, registerFont } = require("canvas");
const { AttachmentBuilder } = require("discord.js");

const roleGreetings = [
  {
    roleId: process.env["ROLE_MHTH_VIII"],
    greeting: "MHTH VIII",
    backgorund: "#7743db",
  },
  {
    roleId: process.env["ROLE_MHTH_VII"],
    greeting: "MHTH VII",
    backgorund: "#d0a2f7",
  },
  {
    roleId: process.env["ROLE_MHTH_VI"],
    greeting: "MHTH VI",
    backgorund: "#19a7ce",
  },
  {
    roleId: process.env["ROLE_MHTH_V"],
    greeting: "MHTH V",
    backgorund: "#aee2ff",
  },
  {
    roleId: process.env["ROLE_MHTH_IV"],
    greeting: "MHTH IV",
    backgorund: "#65b741",
  },
  {
    roleId: process.env["ROLE_MHTH_III"],
    greeting: "MHTH III",
    backgorund: "#a6cf98",
  },
  {
    roleId: process.env["ROLE_MHTH_II"],
    greeting: "MHTH II",
    backgorund: "#ffd28f",
  },
  {
    roleId: process.env["ROLE_MHTH_I"],
    greeting: "MHTH I",
    backgorund: "#f5cca0",
  },
];

const roleF1 = [
  { roleId: process.env["ROLE_MHF1_HR_1"], greeting: "19%" },
  { roleId: process.env["ROLE_MHF1_HR_2"], greeting: "39%" },
  { roleId: process.env["ROLE_MHF1_HR_3"], greeting: "59%" },
  { roleId: process.env["ROLE_MHF1_HR_4"], greeting: "79%" },
  { roleId: process.env["ROLE_MHF1_HR_5"], greeting: "99%" },
];

const roleFU = [
  { roleId: process.env["ROLE_MHFU_HR_5"], greeting: "19%" },
  { roleId: process.env["ROLE_MHFU_HR_6"], greeting: "39%" },
  { roleId: process.env["ROLE_MHFU_HR_7"], greeting: "59%" },
  { roleId: process.env["ROLE_MHFU_HR_8"], greeting: "79%" },
  { roleId: process.env["ROLE_MHFU_HR_9"], greeting: "99%" },
];

const roleP3 = [
  { roleId: process.env["ROLE_MHP3_HR_2"], greeting: "19%" },
  { roleId: process.env["ROLE_MHP3_HR_3"], greeting: "39%" },
  { roleId: process.env["ROLE_MHP3_HR_4"], greeting: "59%" },
  { roleId: process.env["ROLE_MHP3_HR_5"], greeting: "79%" },
  { roleId: process.env["ROLE_MHP3_HR_6"], greeting: "99%" },
];

const roleGU = [
  { roleId: process.env["ROLE_MHGU_HR_199"], greeting: "19%" },
  { roleId: process.env["ROLE_MHGU_HR_399"], greeting: "39%" },
  { roleId: process.env["ROLE_MHGU_HR_599"], greeting: "59%" },
  { roleId: process.env["ROLE_MHGU_HR_799"], greeting: "79%" },
  { roleId: process.env["ROLE_MHGU_HR_999"], greeting: "99%" },
];

const roleWI = [
  { roleId: process.env["ROLE_MHWI_HR_199"], greeting: "19%" },
  { roleId: process.env["ROLE_MHWI_HR_399"], greeting: "39%" },
  { roleId: process.env["ROLE_MHWI_HR_599"], greeting: "59%" },
  { roleId: process.env["ROLE_MHWI_HR_799"], greeting: "79%" },
  { roleId: process.env["ROLE_MHWI_HR_999"], greeting: "99%" },
];

const roleRS = [
  { roleId: process.env["ROLE_MHRS_HR_199"], greeting: "19%" },
  { roleId: process.env["ROLE_MHRS_HR_399"], greeting: "39%" },
  { roleId: process.env["ROLE_MHRS_HR_599"], greeting: "59%" },
  { roleId: process.env["ROLE_MHRS_HR_799"], greeting: "79%" },
  { roleId: process.env["ROLE_MHRS_HR_999"], greeting: "99%" },
];

const roleNO = [
  { roleId: process.env["ROLE_MHNO_HR_199"], greeting: "19%" },
  { roleId: process.env["ROLE_MHNO_HR_399"], greeting: "39%" },
  { roleId: process.env["ROLE_MHNO_HR_599"], greeting: "59%" },
  { roleId: process.env["ROLE_MHNO_HR_799"], greeting: "79%" },
  { roleId: process.env["ROLE_MHNO_HR_999"], greeting: "99%" },
];

function drawText(ctx, text, x, y, font, textAlign) {
  ctx.fillStyle = "#F0ECE5";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = textAlign;
  ctx.textBaseline = "middle";
  ctx.font = font;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

function yCard(canvasHeight, newHeight) {
  return canvasHeight / 2 - newHeight / 2;
}

function yText(canvasHeight) {
  return canvasHeight / 2;
}

async function loadImageFromPath(imagePath) {
  return await loadImage(imagePath);
}

async function drawImageWithText(
  ctx,
  image,
  xCard,
  yCard,
  newWidth,
  newHeight,
  compleText,
  xText,
  yText,
) {
  ctx.drawImage(image, xCard, yCard, newWidth, newHeight);
  drawText(ctx, `${compleText}`, xText, yText, "60px Mitr-Bold", "center");
}

function findCompleFromRole(roles, roleArray) {
  return (
    roleArray.find(({ roleId }) => roles.some((role) => role.id === roleId))
      ?.greeting || "0%"
  );
}

module.exports = async (guild, member) => {
  //Set Font
  registerFont("fonts/Mitr-Bold.ttf", { family: "Mitr-Bold" });

  //Profile
  const userAvatarURL = member.user.displayAvatarURL({
    extension: "png",
    size: 256,
  });

  //Role
  let nameRole = "ยังไม่มียศ";
  let colorRole = "#f5cca0";
  let compleF1 = "0%";
  let compleFU = "0%";
  let compleP3 = "0%";
  let compleGU = "0%";
  let compleWI = "0%";
  let compleRS = "0%";
  let compleNO = "0%";

  if (member) {
    const roles = member.roles.cache;

    const foundRole = roleGreetings.find(({ roleId }) =>
      roles.some((role) => role.id === roleId),
    );

    nameRole = foundRole?.greeting || nameRole;

    compleF1 = findCompleFromRole(roles, roleF1);
    compleFU = findCompleFromRole(roles, roleFU);
    compleP3 = findCompleFromRole(roles, roleP3);
    compleGU = findCompleFromRole(roles, roleGU);
    compleWI = findCompleFromRole(roles, roleWI);
    compleRS = findCompleFromRole(roles, roleRS);
    compleNO = findCompleFromRole(roles, roleNO);
  }

  try {
    // สร้าง Canvas ขนาด
    const canvasWidth = 1920;
    const canvasHeight = 1080;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // สีพื้นหลัง
    ctx.fillStyle = colorRole;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.fillStyle = "#F9F9E0";
    ctx.translate(40, -200);
    ctx.rotate((45 * Math.PI) / 180); // หมุน 45 องศา
    ctx.fillRect(0, 0, 2202, 300);
    ctx.restore();

    ////Text
    // เพิ่มข้อความทางด้านขวาของรูป ctc, text, x, y
    drawText(
      ctx,
      `ชื่อ:`,
      canvasWidth / 2 - 500,
      canvasHeight / 2 - 350 - 75,
      "50px Mitr-Bold",
      "left",
    );
    drawText(
      ctx,
      `${member.displayName}`,
      canvasWidth / 2 - 400,
      canvasHeight / 2 - 350 - 75,
      "50px Mitr-Bold",
      "left",
    );
    drawText(
      ctx,
      `ยศ:`,
      canvasWidth / 2 - 500,
      canvasHeight / 2 - 350 + 75,
      "50px Mitr-Bold",
      "left",
    );
    drawText(
      ctx,
      `${nameRole}`,
      canvasWidth / 2 - 400,
      canvasHeight / 2 - 350 + 75,
      "50px Mitr-Bold",
      "left",
    );

    ////Image
    const imageLogoMHF1 = await loadImage("assets/guildcard/1.MHF1.png");
    const imageLogoMHFU = await loadImage("assets/guildcard/2.MHFU.png");
    const imageLogoMHP3 = await loadImage("assets/guildcard/3.MHP3.png");
    const imageLogoMHGU = await loadImage("assets/guildcard/4.MHGU.png");
    const imageLogoMHWI = await loadImage("assets/guildcard/5.MHWI.png");
    const imageLogoMHRS = await loadImage("assets/guildcard/6.MHRS.png");
    const imageLogoMHNO = await loadImage("assets/guildcard/7.MHNO.png");
    const imageLogoMHWS = await loadImage("assets/guildcard/8.MHWS.png");

    const newWidth = 300; // ความยาวที่ต้องการให้รูปภาพ

    // ใช้ขนาดจริงของรูปภาพ
    const originalWidthLogoMHF1 = imageLogoMHF1.width; // ความกว้างต้นฉบับของรูปภาพ
    const originalHeightLogoMHF1 = imageLogoMHF1.height; // ความสูงต้นฉบับของรูปภาพ
    const originalWidthLogoMHFU = imageLogoMHFU.width;
    const originalHeightLogoMHFU = imageLogoMHFU.height;
    const originalWidthLogoMHP3 = imageLogoMHP3.width;
    const originalHeightLogoMHP3 = imageLogoMHP3.height;
    const originalWidthLogoMHGU = imageLogoMHGU.width;
    const originalHeightLogoMHGU = imageLogoMHGU.height;
    const originalWidthLogoMHWI = imageLogoMHWI.width;
    const originalHeightLogoMHWI = imageLogoMHWI.height;
    const originalWidthLogoMHRS = imageLogoMHRS.width;
    const originalHeightLogoMHRS = imageLogoMHRS.height;
    const originalWidthLogoMHNO = imageLogoMHNO.width;
    const originalHeightLogoMHNO = imageLogoMHNO.height;
    const originalWidthLogoMHWS = imageLogoMHWS.width;
    const originalHeightLogoMHWS = imageLogoMHWS.height;

    // ต้องการลดขนาดอัตราส่วน
    const scaleFactorLogoMHF1 = newWidth / originalWidthLogoMHF1; // อัตราส่วนการปรับขนาด
    const newHeightLogoMHF1 = originalHeightLogoMHF1 * scaleFactorLogoMHF1; // คำนวณความสูงใหม่ตามอัตราส่วน
    const scaleFactorLogoMHFU = newWidth / originalWidthLogoMHFU;
    const newHeightLogoMHFU = originalHeightLogoMHFU * scaleFactorLogoMHFU;
    const scaleFactorLogoMHP3 = newWidth / originalWidthLogoMHP3;
    const newHeightLogoMHP3 = originalHeightLogoMHP3 * scaleFactorLogoMHP3;
    const scaleFactorLogoMHGU = newWidth / originalWidthLogoMHGU;
    const newHeightLogoMHGU = originalHeightLogoMHGU * scaleFactorLogoMHGU;
    const scaleFactorLogoMHWI = newWidth / originalWidthLogoMHWI;
    const newHeightLogoMHWI = originalHeightLogoMHWI * scaleFactorLogoMHWI;
    const scaleFactorLogoMHRS = newWidth / originalWidthLogoMHRS;
    const newHeightLogoMHRS = originalHeightLogoMHRS * scaleFactorLogoMHRS;
    const scaleFactorLogoMHNO = newWidth / originalWidthLogoMHNO;
    const newHeightLogoMHNO = originalHeightLogoMHNO * scaleFactorLogoMHNO;
    const scaleFactorLogoMHWS = newWidth / originalWidthLogoMHWS;
    const newHeightLogoMHWS = originalHeightLogoMHWS * scaleFactorLogoMHWS;

    const xCard1 = canvasWidth / 2 - newWidth / 2 - 370 * 2;
    const xText1 = canvasWidth / 2 - 370 * 2;
    const xCard2 = canvasWidth / 2 - newWidth / 2 - 370 * 1;
    const xText2 = canvasWidth / 2 - 370 * 1;
    const xCard3 = canvasWidth / 2 - newWidth / 2;
    const xText3 = canvasWidth / 2;
    const xCard4 = canvasWidth / 2 - newWidth / 2 + 370 * 1;
    const xText4 = canvasWidth / 2 + 370 * 1;
    const xCard5 = canvasWidth / 2 - newWidth / 2 + 370 * 2;
    const xText5 = canvasWidth / 2 + 370 * 2;

    // เพิ่มรูปภาพลงใน Canvas โดยใช้ขนาดใหม่ที่คำนวณมา
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/1.MHF1.png"),
      xCard1,
      yCard(canvasHeight, newHeightLogoMHF1) - 50,
      newWidth,
      newHeightLogoMHF1,
      compleF1,
      xText1,
      yText(canvasHeight) + 100,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/2.MHFU.png"),
      xCard2,
      yCard(canvasHeight, newHeightLogoMHFU) - 50,
      newWidth,
      newHeightLogoMHFU,
      compleFU,
      xText2,
      yText(canvasHeight) + 100,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/3.MHP3.png"),
      xCard3,
      yCard(canvasHeight, newHeightLogoMHP3) - 50,
      newWidth,
      newHeightLogoMHP3,
      compleP3,
      xText3,
      yText(canvasHeight) + 100,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/4.MHGU.png"),
      xCard4,
      yCard(canvasHeight, newHeightLogoMHGU) - 50,
      newWidth,
      newHeightLogoMHGU,
      compleGU,
      xText4,
      yText(canvasHeight) + 100,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/5.MHWI.png"),
      xCard5,
      yCard(canvasHeight, newHeightLogoMHWI) - 50,
      newWidth,
      newHeightLogoMHWI,
      compleWI,
      xText5,
      yText(canvasHeight) + 100,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/6.MHRS.png"),
      xCard1,
      yCard(canvasHeight, newHeightLogoMHRS) + 300,
      newWidth,
      newHeightLogoMHRS,
      compleRS,
      xText1,
      yText(canvasHeight) + 450,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/7.MHNO.png"),
      xCard2,
      yCard(canvasHeight, newHeightLogoMHNO) + 300,
      newWidth,
      newHeightLogoMHNO,
      compleNO,
      xText2,
      yText(canvasHeight) + 450,
    );
    drawImageWithText(
      ctx,
      await loadImageFromPath("assets/guildcard/8.MHWS.png"),
      xCard3,
      yCard(canvasHeight, newHeightLogoMHWS) + 300,
      newWidth,
      newHeightLogoMHWS,
      "มาในปี 2025",
      xText3,
      yText(canvasHeight) + 450,
    );

    ////Profile
    // ระยะห่างจากด้านซ้ายของ Canvas และด้านบนของ Canvas
    const imageLogo = await loadImage(userAvatarURL);

    const originalLogoWidth = imageLogo.width; // ความกว้างต้นฉบับของรูปภาพ
    const originalLogoHeight = imageLogo.height; // ความสูงต้นฉบับของรูปภาพ

    const newLogoWidth = 250; // ความยาวที่ต้องการให้รูปภาพ
    const scaleFactorLogo = newLogoWidth / originalLogoWidth; // อัตราส่วนการปรับขนาด
    const newLogoHeight = originalLogoHeight * scaleFactorLogo; // คำนวณความสูงใหม่ตามอัตราส่วน

    // สร้างรูปโปรไฟล์ให้เป็นรูปร่างของวงกลม
    ctx.save(); // เก็บสถานะ Canvas ก่อนทำการ clip
    ctx.beginPath();
    ctx.arc(
      canvasWidth / 2 - 370 * 2 - newLogoWidth / 2 + newLogoWidth / 2,
      canvasHeight / 2 - 350 - newLogoHeight / 2 + newLogoHeight / 2,
      newLogoWidth / 2,
      0,
      Math.PI * 2,
    );
    ctx.closePath();
    ctx.clip(); // ตัดรูปให้เป็นรูปร่างของวงกลม

    // วาดรูปโปรไฟล์ลงบน Canvas และตัดให้เป็นรูปร่างของวงกลม
    ctx.drawImage(
      imageLogo,
      canvasWidth / 2 - 370 * 2 - newLogoWidth / 2,
      canvasHeight / 2 - 350 - newLogoHeight / 2,
      newLogoWidth,
      newLogoHeight,
    );

    // เพิ่มขอบสีดำให้กับวงกลม
    ctx.lineWidth = 10; // ขนาดขอบสีดำ
    ctx.strokeStyle = "black"; // สีขอบสีดำ
    ctx.beginPath();
    ctx.arc(
      canvasWidth / 2 - 370 * 2 - newLogoWidth / 2 + newLogoWidth / 2,
      canvasHeight / 2 - 350 - newLogoHeight / 2 + newLogoHeight / 2,
      newLogoWidth / 2,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
    ctx.closePath();

    // สร้างรูป MessageAttachment จาก Canvas
    const buffer = canvas.toBuffer();
    const attachment = new AttachmentBuilder(buffer, { name: "MHTH.png" });

    const channel = guild.channels.cache.get(process.env["CHANNEL_NEW_HUNTER"]);
    // const channel = guild.channels.cache.get(process.env["TEST_CHANNEL_EVENT"]);

    // ส่งรูป Canvas ในข้อความ
    if (channel) {
      channel.send({
        content: `**ยินดีต้อนรับสู่เซิร์ฟเวอร์**`,
        files: [attachment],
      });
    } else {
      console.log("ไม่พบช่องทาง");
    }
  } catch (error) {
    console.log(error);
  }
};
