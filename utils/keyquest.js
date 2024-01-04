const fs = require('fs');

module.exports.keyQuest = async (message, value1, value2, value3) => {
  try {
    const rawdata = fs.readFileSync('./models/datakeyquest.json');
    const convertJson = JSON.parse(rawdata);
    //Rankgh
    const rankgh = convertJson.rankgh;
    //Rankva
    const rankva = convertJson.rankva;
    //Check HR1-6 or LV1-6
    const checkRank = (rankgh.includes(value3) && rankgh.indexOf(value3) <= 5) || (rankva.includes(value3) && rankva.indexOf(value3) <= 5);
    if (checkRank) {
      //Set Image
      const filePath = `./assets/${value1}/${value2}/${value3}.png`;
      const keyquestDescription = convertJson.keyquestDescription;
      let contentIndex = 2;
      if (value3 === rankgh[5]) {
        contentIndex = 0;
      } else if (value3 === rankgh[4] || value3 === rankgh[3]) {
        contentIndex = 1;
      }

      message.reply({
        content: `**เรียน Hunter: ${message.member.displayName}**\n${keyquestDescription[contentIndex]}`,
        files: [filePath]
      });
      return;
    }
  } catch (error) {
    console.log(error);
  }
}