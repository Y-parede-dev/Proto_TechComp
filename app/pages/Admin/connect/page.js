
'use client';

import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styles from './page.module.css'
import {auth, googleProvider} from "@/config/configFirebase/conf.firebase"
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

const handle = (e) =>{
    e.preventDefault();
}

const GoogleSignIn = () => {
    const signInWithGoogle = async (e) => {
        e.preventDefault()
        try{
            console.log('tentative de connexion en cour')

            signInWithPopup(auth, googleProvider)
                .then((result)=>{
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    // console.log(credential)
                    // console.log(user)

                }).catch((error) => {
                    const errorCode= error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error)
                    console.log("error", credential)

                })
            // await auth.signInWithPopup(googleProvider)
        }catch(error){
            console.log('Erreur de connexion: ', error)

        }
    }
    return(<div onClick={e=>signInWithGoogle(e)}>wait</div>)
}
const UserSignWithEmail = () => {
    const router = useRouter()
    const [userInfo, setUserInfo] =  useState({
        email: "emptyEmail",
        password: "emptyPassword"
    })
    const CheckExistUser = async (e) => {
        e.preventDefault()
        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(userInfo.password, salt)
        await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential)=>{
                const user = userCredential;
                
                localStorage.setItem('uidAdmin', user.user.uid)
                router.push('/pages/Admin/Product-125897854-cust-jyr_media_administrator')
                
                console.log(user)
            }).catch((error)=>{
                console.log('errorrrrrrr', error)
            })
    }
    
    return(
        <>
            <form onSubmit={(e)=>CheckExistUser(e)}>
                <label>email</label>
                <input onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    email:e.target.value
                }))}} type="email"/>
                <label>password</label>
                <input onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    password :e.target.value
                }))}} type="password"/>
                <input type='submit' value={'se connecter'}/>
            </form>
        </>
    )
}
const UserSignUpWithEmail = () => {
    const [userInfo, setUserInfo] =  useState({
        email: "email",
        password: undefined,
        isHached: false
    })
    const hashPass = () => {
        if(userInfo.password!==undefined){
             
            setUserInfo((prevData)=>({
                ...prevData,
                password: hashed
            }))
            // console.log(userInfo)
            // console.log(hashed)
        }

    }
    const CreateUser = (e) => {
        e.preventDefault()
        // console.log(userInfo)
        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(userInfo.password, salt)
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential)=>{
                const user = userCredential.user;
                console.log('result', userCredential)
            }).catch((error)=>{
                console.log('errorrrrrrr', error)


            })
    }
    
    return(
        <>
            <form onSubmit={(e)=>CreateUser(e)}>
                <label>email</label>
                <input onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    email:e.target.value
                }))}} type="email"/>
                <label>password</label>
                <input onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    password :e.target.value
                }))}} type="password"/>
                <input type='submit' value={'Create'}/>
            </form>
        </>
    )
}
const page = () => {
    return(
        <section className={`${styles.main}`}>
            <h2>Zone admin</h2>
            <UserSignWithEmail/>
            {/* <UserSignUpWithEmail/>
            <GoogleSignIn/> */}
        </section>
    )
}

export default page;