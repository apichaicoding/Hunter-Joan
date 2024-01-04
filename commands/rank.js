const roleGreetings = [
  { roleId: process.env['ROLE_MHTH_VII'], greeting: 'MHTH VII' },
  { roleId: process.env['ROLE_MHTH_VI'], greeting: 'MHTH VI' },
  { roleId: process.env['ROLE_MHTH_V'], greeting: 'MHTH V' },
  { roleId: process.env['ROLE_MHTH_IV'], greeting: 'MHTH IV' },
  { roleId: process.env['ROLE_MHTH_III'], greeting: 'MHTH III' },
  { roleId: process.env['ROLE_MHTH_II'], greeting: 'MHTH II' },
  { roleId: process.env['ROLE_MHTH_I'], greeting: 'MHTH I' },
];

module.exports = {
  name: 'rank',
  execute: async (message) => {
    const allMember = message.guild.memberCount;

    try {
      const response = [`**เรียน Hunter: ${message.member.displayName}**\n`];

      await message.guild.members.fetch();

      const totalMembersInRoles = roleGreetings.map(({ roleId, greeting }) => {
        const role = message.guild.roles.cache.get(roleId);
        const membersInRole = role ? role.members.size : 0;
        return { greeting, membersInRole };
      });
      
      totalMembersInRoles.forEach(({ greeting, membersInRole }) => {
        const percentage = ((membersInRole / allMember) * 100).toFixed(2);
        response.push(`**${greeting}** จำนวน ${membersInRole} คน (${percentage}%)`);
      });
      
      response.push(`\n**จำนวน Hunter ในปัจจุบันทั้งหมด: ${allMember} คน**`);

      message.reply(response.join('\n'));
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงสมาชิก:', error);
    }
  },
};
