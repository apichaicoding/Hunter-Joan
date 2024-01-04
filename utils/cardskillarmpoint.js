const { createCanvas, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports.cardSkillArmPoint = async (message, searchSkilArmor, skilArmor) => {
  try {
    skilArmor.forEach(async data => {
      if (searchSkilArmor === data.name) {
        const checkCountResult = data.skill_name.length;

        // สร้าง Canvas ด้วยความกว้างและความสูงที่กำหนด
        const canvasWidth = 1620;
        const canvasHeight = 20 + (50 * (checkCountResult + 1));
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');
        registerFont('./fonts/Prompt-Medium.ttf', { family: 'CustomFont' });

        // พื้นหลัง
        ctx.fillStyle = '#FFA64E';
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.rect(10, 10, 100, 50);
        ctx.stroke();
        ctx.rect(100 + 10, 10, 300, 50);
        ctx.stroke();
        ctx.rect(400 + 10, 10, 1200, 50);
        ctx.stroke();

        data.skill_name.forEach((value, index) => {
          ctx.rect(10, 10 + (50 * (index + 1)), 100, 50);
          ctx.stroke();
          ctx.rect(100 + 10, 10 + (50 * (index + 1)), 300, 50);
          ctx.stroke();
          ctx.rect(400 + 10, 10 + (50 * (index + 1)), 1200, 50);
          ctx.stroke();

        });

        ctx.fillStyle = '#000000';
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = "left";
        ctx.font = "30px CustomFont";
        ctx.fillText("แต้ม", 20, 50);
        ctx.fillText("ชื่อ", 100 + 20, 50);
        ctx.fillText("สกิล", 400 + 20, 50);

        data.skill_name.forEach((value, index) => {
          if (data.skill_point[index].charAt(0) === "+") {
            ctx.fillStyle = 'green';
          } else {
            ctx.fillStyle = 'red';
          }
          ctx.font = "24px CustomFont";
          ctx.fillText(data.skill_point[index], 20, 50 + (50 * (index + 1)));
          ctx.fillText(data.skill_name[index], 100 + 20, 50 + (50 * (index + 1)));
          ctx.fillText(data.skill_desc[index], 400 + 20, 50 + (50 * (index + 1)));

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