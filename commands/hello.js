module.exports = {
  name: "hello",
  execute: (message) => {
    const member = message.member;
    const channelManualComamnd = member.guild.channels.cache.get(
      process.env["CHANNEL_MANUAL_COMMAND"],
    );

    message.reply(
      `**สวัสดีค่ะ Hunter: ${message.member.displayName}**\nมีอะไรให้ช่วยสามารถเช็คคำสั่งที่ <#${channelManualComamnd.id}> ได้เลยนะคะ`,
    );
  },
};
