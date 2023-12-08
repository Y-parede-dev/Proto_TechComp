import { initializeApp } from "firebase/app";

export const InitFirebase = () => {
    const firebaseConfig = {
        apiKey: process.env.FB_APIKEY,
        authDomain: process.env.FB_AUTH_DOMAIN,
        projectId: process.env.FB_PROJECT_ID,
        storageBucket: process.env.FB_STORAGE_BUCKET,
        messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
        appId: process.env.FB_APP_ID,
        measurementId: process.env.FB_MEASUREMENT_ID
    };
    const app = initializeApp(firebaseConfig)
    return app;
}