
'use client';

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styles from './page.module.css';
import {auth} from "@/config/configFirebase/conf.firebase";
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';

const UserSignWithEmail = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] =  useState({
        email: "emptyEmail",
        password: "emptyPassword"
    });
    const CheckExistUser = async (e) => {
        e.preventDefault();
        const verifIsExistUidCookies = () => { // not use
            try{
                const cookieUidExist = Cookies.get('uidAdmin');
                if(cookieUidExist && cookieUidExist !== undefined){
                    return true;
                }else{
                    return false;
                };
            }catch(error){
                return false;
            };
        };
        await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential)=>{
                const user = userCredential;
                const oneDay = (24 * 60 * 60 * 1000);
                Cookies.set('uidAdmin', user.user.uid, {expires: Date.now() - oneDay});
                router.push('/pages/Admin/Product-125897854-cust-jyr_media_administrator');
            }).catch((error)=>{
                console.log('errorrrrrrr', error);
            })
    };
    return(
        <>
            <form onSubmit={(e)=>CheckExistUser(e)}>
                <label>email</label>
                <input  onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    email:e.target.value
                }))}} type="email"/>
                <label>password</label>
                <input  onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    password :e.target.value
                }))}} type="password"/>
                <input  type='submit' value={'se connecter'}/>
            </form>
        </>
    );
};
const UserSignUpWithEmail = () => {
    const [userInfo, setUserInfo] =  useState({
        email: "email",
        password: undefined,
        isHached: false
    });
    const CreateUser = (e) => {
        e.preventDefault()
        // console.log(userInfo)
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential)=>{
                const user = userCredential.user;
                console.log('result', userCredential)
            }).catch((error)=>{
                console.log('errorrrrrrr', error)
            })
    };
    
    return(
        <>
            <form onSubmit={(e)=>CreateUser(e)}>
                <label>email</label>
                <input  onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    email:e.target.value
                }))}} type="email"/>
                <label>password</label>
                <input  onChange={(e)=>{setUserInfo((prevData)=>({
                    ...prevData,
                    password :e.target.value
                }))}} type="password"/>
                <input  type='submit' value={'Create'}/>
            </form>
        </>
    );
};
const page = () => {
    return(
        <section className={`${styles.main}`}>
            <h2>Zone admin</h2>
            <UserSignWithEmail/>
            {/* <UserSignUpWithEmail/> */}
        </section>
    );
};
export default page;