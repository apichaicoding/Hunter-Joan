const { db } = require("./firebase/firebase.js");
const express = require("express");
const app = express();

const port = 8080;

app.use(express.json());

app.post("/add", async (req, res) => {
  const { nameMonster, maxHpMonster, currentHpMonster, damageUser } = req.body;
  try {
    const monsterRef = db.collection("monster").doc("test");
    await monsterRef.set({
      nameMonster,
      maxHpMonster,
      currentHpMonster,
      damageUser,
    });
    res.status(200).send("สำเร็จ");
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
  }
});

app.listen(port, () =>
  console.log(`เซิร์ฟเวอร์ MHTH กำลังทำงานบนพอร์ต ${port}`),
);
