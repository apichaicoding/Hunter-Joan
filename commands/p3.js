const path = require('path');
const fs = require("fs");
const { keyQuest } = require('../utils/keyquest');
const { cardSkillArmPoint } = require('../utils/cardskillarmpoint');

module.exports = {
  name: 'p3',
  execute: async (message, value1, value2, value3) => {
    if (value2 == "gh" || value2 == "va") {
      return await keyQuest(message, value1, value2, value3);
    } else if (value2 == "skillarmor") {
      const filePathSearchskillarmor = path.join(__dirname, '../models/datasearchskillarmor.json');
      const filePathSkillarmor = path.join(__dirname, '../models/dataskillarmor.json');

      try {
        const rawdataSearchskillarmor = await fs.promises.readFile(filePathSearchskillarmor, 'utf-8');
        const convertJsonSearchskillarmor = JSON.parse(rawdataSearchskillarmor);
        const searchSkilArmor = convertJsonSearchskillarmor.searchSkilArmorP3;

        for (const data of searchSkilArmor) {
          if (value3 === data.name.toLowerCase()) {
            const rawdataSkillarmor = await fs.promises.readFile(filePathSkillarmor, 'utf-8');
            const convertJsonSkillarmor = JSON.parse(rawdataSkillarmor);
            const skilArmor = convertJsonSkillarmor.skilArmorP3;
            return await cardSkillArmPoint(message, data.value, skilArmor);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}