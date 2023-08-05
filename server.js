const express = require('express');
const server = express();

function formatTime(date) {
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    };

    const dateTimeFormat = new Intl.DateTimeFormat('th-TH', options);
    const [
        { value: day },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second }
    ] = dateTimeFormat.formatToParts(date);

    return `${day} ${month} ${year} Time ${hour}:${minute}:${second}`;
}

server.all(`/`, (req, res) => {
  const now = new Date();
  const formattedTime = formatTime(now);
  res.send(`Result: [OK]. ${formattedTime}`);
});

function keepAlive() {
    server.listen(3000, () => {
      const now = new Date();
      const formattedTime = formatTime(now);
      console.log(`Server is now ready! | ${formattedTime}`);
    });
}

module.exports = keepAlive;