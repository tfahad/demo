// server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import userRoutes from './src/routes/userRoutes.js'
import reserRoutes from './src/routes/resetRoutes.js'
// import admin from "firebase-admin"
// import serviceAccount from "./taxi-fc3f6-firebase-adminsdk-29xll-bae0b81169.json"
import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
  credential: applicationDefault(),
  projectId: 'potion-for-creators',
});


const app = express();

app.use(express.json());
app.use(cors());



app.use('/api', userRoutes);
app.use('/api/request-reset', reserRoutes)



app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  
  const message = {
    notification: {
      title: "Notif",
      body: 'This is a Test Notification'
    },
    token: "YOUR FCM TOKEN HERE",
  };
  
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
  
  
});



const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










