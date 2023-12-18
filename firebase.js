import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./firebase-keys.json"),
  databaseURL:
    "https://ultimate-gcs-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();
const dbRef = db.ref("ecoLution/data");

export { dbRef };
