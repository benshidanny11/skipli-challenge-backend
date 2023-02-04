const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./admin.json");

 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db=getFirestore();
module.exports={db:db, filedValue: FieldValue };