const { createCanvas, loadImage, registerFont } = require("canvas");

/*
Size Image
canvasWidth = 2000;
No Game
canvasHeight = 600;
+1 Game
Text Head 600 + 100
canvasHeight = 700 + 200;
*/

//Set Font
registerFont("fonts/Mitr-Bold.ttf", { family: "Mitr-Bold" });

function newScale(originalLogoWidth, originalLogoHeight, newLogoWidth) {
  const scaleFactorLogo = newLogoWidth / originalLogoWidth;
  const newLogoHeight = originalLogoHeight * scaleFactorLogo;

  return newLogoHeight;
}

function drawTextHead(ctx, text, x, y, sizeFont) {
  ctx.fillStyle = "#191919";
  ctx.strokeStyle = "#F0ECE5";
  ctx.lineWidth = 2;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `${sizeFont} Mitr-Bold`;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

function drawText(ctx, text, x, y, sizeFont) {
  ctx.fillStyle = "#F0ECE5";
  ctx.strokeStyle = "#191919";
  ctx.lineWidth = 2;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `${sizeFont} Mitr-Bold`;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

function drawTextCenterHead(ctx, text, x, y, sizeFont) {
  ctx.fillStyle = "#191919";
  ctx.strokeStyle = "#F0ECE5";
  ctx.lineWidth = 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${sizeFont} Mitr-Bold`;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

function drawTextCenter(ctx, text, x, y, sizeFont) {
  ctx.fillStyle = "#F0ECE5";
  ctx.strokeStyle = "#191919";
  ctx.lineWidth = 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${sizeFont} Mitr-Bold`;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

function canvasCreate(canvasWidth, canvasHeight, background) {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  return {
    canvas: canvas,
    ctx: ctx,
  };
}

function canvasLineDesign(ctx) {
  ctx.save();
  ctx.fillStyle = "#F9F9E0";
  ctx.translate(40, -200);
  ctx.rotate((45 * Math.PI) / 180); // หมุน 45 องศา
  ctx.fillRect(0, 0, 10000, 300);
  ctx.restore();
}

async function canvasProfile(message, ctx, canvasWidth) {
  const userAvatarURL = message.author.displayAvatarURL({
    extension: "png",
    size: 256,
  });

  const imageLogo = await loadImage(userAvatarURL);
  const newLogoWidth = 300;
  const newLogoHeight = newScale(
    imageLogo.width,
    imageLogo.height,
    newLogoWidth,
  );
  const radius = newLogoWidth / 2;
  const offsetY = 200;

  // สร้างรูปโปรไฟล์ให้เป็นรูปร่างของวงกลม
  ctx.save(); // เก็บสถานะ Canvas ก่อนทำการ clip
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, offsetY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip(); // ตัดรูปให้เป็นรูปร่างของวงกลม

  // วาดรูปโปรไฟล์ลงบน Canvas และตัดให้เป็นรูปร่างของวงกลม
  ctx.drawImage(
    imageLogo,
    canvasWidth / 2 - newLogoWidth / 2,
    offsetY - newLogoHeight / 2,
    newLogoWidth,
    newLogoHeight,
  );

  // เพิ่มขอบสีดำให้กับวงกลม
  ctx.lineWidth = 5; // ขนาดขอบสีดำ
  ctx.strokeStyle = "black"; // สีขอบสีดำ
  ctx.stroke();

  ctx.restore(); // คืนสถานะ Canvas เดิมหลังจากการตัดรูปให้เป็นรูปร่างของวงกลม
}

function canvasText(ctx, canvasWidth, name, role, point) {
  const offsetX = canvasWidth / 3;
  const offsetY1 = 400;
  const offsetY2 = 475;

  drawTextCenterHead(ctx, `ชื่อ`, canvasWidth / 2 - offsetX, offsetY1, "60px");
  drawTextCenter(ctx, name, canvasWidth / 2 - offsetX, offsetY2, "55px");

  drawTextCenterHead(ctx, `ยศ`, canvasWidth / 2, offsetY1, "60px");
  drawTextCenter(ctx, role, canvasWidth / 2, offsetY2, "55px");

  drawTextCenterHead(ctx, `คะแนน`, canvasWidth / 2 + offsetX, offsetY1, "60px");
  drawTextCenter(ctx, point, canvasWidth / 2 + offsetX, offsetY2, "55px");
}

function canvasTextGame(ctx) {
  const offsetY = 600;
  drawTextHead(ctx, "อัพเดท 3 ภาคล่าสุด", 50, offsetY, "60px");
}

async function canvasImage(ctx, count) {
  const imageLogoMHF1 = await loadImage("assets/guildcard/1.MHF1.png");
  const newWidth = 200;
  const originalWidthLogoMHF1 = imageLogoMHF1.width; // ความกว้างต้นฉบับของรูปภาพ
  const originalHeightLogoMHF1 = imageLogoMHF1.height; // ความสูงต้นฉบับของรูปภาพ
  const scaleFactorLogoMHF1 = newWidth / originalWidthLogoMHF1; // อัตราส่วนการปรับขนาด
  const newHeightLogoMHF1 = originalHeightLogoMHF1 * scaleFactorLogoMHF1; // คำนวณความสูงใหม่ตามอัตราส่วน
  const offsetY = 750 + 200 * count;
  ctx.drawImage(
    imageLogoMHF1,
    150 - newWidth / 2,
    offsetY - newHeightLogoMHF1 / 2,
    newWidth,
    newHeightLogoMHF1,
  );

  drawText(ctx, `HR: 2 | 5`, 300, offsetY - 50, "45px");
  drawText(ctx, `MR: 999 | 999`, 300, offsetY, "45px");
  drawText(ctx, `ความคืบหน้า: 40%`, 300, offsetY + 50, "45px");
}

module.exports = {
  canvasCreate: canvasCreate,
  canvasProfile: canvasProfile,
  canvasLineDesign: canvasLineDesign,
  canvasText: canvasText,
  canvasTextGame: canvasTextGame,
  canvasImage: canvasImage,
};
