const { createCanvas, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports.cardSkillArmLevel = async (message, searchSkilArmor, skilArmor) => {
  try {
    skilArmor.forEach(async data => {
      if (searchSkilArmor === data.name) {
        const checkCountResult = data.skill_desc.length;

        // สร้าง Canvas ด้วยความกว้างและความสูงที่กำหนด
        const canvasWidth = 1120;
        const canvasHeight = 20 + (50 * (checkCountResult + 1));
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');
        registerFont('./fonts/Prompt-Medium.ttf', { family: 'CustomFont' });

        // background
        ctx.fillStyle = '#FFA64E';
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.rect(10, 10, 100, 50);
        ctx.stroke();
        ctx.rect(100 + 10, 10, 1000, 50);
        ctx.stroke();

        data.skill_desc.forEach((value, index) => {
          ctx.rect(10, 10 + (50 * (index + 1)), 100, 50);
          ctx.stroke();
          ctx.rect(100 + 10, 10 + (50 * (index + 1)), 1000, 50);
          ctx.stroke();

        });

        ctx.fillStyle = '#000000';
        ctx.textBaseline = "alphabetic";
        ctx.font = "30px CustomFont";
        ctx.textAlign = "left";
        ctx.fillText("เลเวล", 20, 50);
        ctx.fillText("สกิล", 100 + 20, 50);

        data.skill_desc.forEach((value, index) => {
          ctx.font = "24px CustomFont";
          ctx.fillText(data.skill_point[index], 50, 50 + (50 * (index + 1)));
          ctx.fillText(data.skill_desc[index], 100 + 20, 50 + (50 * (index + 1)));
        });

        const buffer = canvas.toBuffer();
        const attachment = new AttachmentBuilder(buffer, { name: 'MHTH.png' });

        message.reply({
          content: `**เรียน Hunter: ${message.member.displayName}**\n${data.name}`,
          files: [attachment]
        });

        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};