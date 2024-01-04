const admin = require('firebase-admin');
const serviceAccount = require('.//creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://discordbothunterjaon-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const db = admin.firestore();
module.exports = { db };
