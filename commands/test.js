const { AttachmentBuilder } = require("discord.js");
const {
  canvasCreate,
  canvasProfile,
  canvasLineDesign,
  canvasText,
  canvasTextGame,
  canvasImage,
} = require("../utils/functionCard.js");
const { db } = require("..//firebase/firebase.js");

module.exports = {
  name: "test",
  execute: async (message) => {
    try {
      const response = [`**เรียน Hunter: ${message.member.displayName}**\n`];

      // สร้าง Canvas ขนาด
      const canvasWidth = 2000;
      const canvasHeight = 1300;

      const { canvas, ctx } = canvasCreate(
        canvasWidth,
        canvasHeight,
        "#f5cca0",
      );

      canvasLineDesign(ctx);

      //Profile
      await canvasProfile(message, ctx, canvasWidth);

      //Text
      canvasText(
        ctx,
        canvasWidth,
        message.author.displayName,
        "MHTH III",
        "1,000,000",
      );

      canvasTextGame(ctx);

      await canvasImage(ctx, 0);
      await canvasImage(ctx, 1);
      await canvasImage(ctx, 2);

      // สร้างรูป MessageAttachment จาก Canvas
      const buffer = canvas.toBuffer();
      const attachment = new AttachmentBuilder(buffer, { name: "MHTH.png" });

      message.reply({
        content: response.join("\n"),
        files: [attachment],
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงสมาชิก:", error);
    }
  },
};
