"use client";
import  {getStorage, ref} from 'firebase/storage';
import {initializeApp} from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { InitFirebase, firebaseConfig } from './conf.init.firebase';

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app,"techcomparateur.appspot.com");
export const imageRef = ref(storage,'/')
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//todo: centraliser les exports - ex: export { item, item}