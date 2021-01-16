import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.test = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const { text } = req.query;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.

  console.log({ text });
  res.json({ result: `text is ${text}` });
});
