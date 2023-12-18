import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./firebase-keys.json"),
  databaseURL: "https://ecolution-6ae7f-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();
const dbRef = db.ref("ecoLution/data");

export { dbRef };
