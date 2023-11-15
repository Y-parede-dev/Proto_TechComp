"use client";
import { useEffect, useState } from 'react';
import styles from './TestColors.module.css';
import { Color } from '@/lib/ClassCustoms';

const TestColors = ({props}) => {
    const {modaleColorOpen, setmodaleColorOpen, body, root} = props;
    const [theme, setTheme] = useState('Black/White');
    const TextP = {
        name:"blue max",
        ["Bleu/Argent"]:"#113264",
        ["Black/White"]: '#000',
        ["Grey/Orange"]:"Orange",
    };
    const TextS = {
        name:"blue",
        ["Bleu/Argent"]:"#0588F0",
        ["Black/White"]: 'grey',
        ["Grey/Orange"]:"Black",
    };
    const Background = {
        name: "gray",
        ["Bleu/Argent"]:"#F9F9F9",
        ["Black/White"]:"white",
        ["Grey/Orange"]:"Grey",
    };
    const Border = {
        name: "blue light",
        ["Bleu/Argent"]:"#8EC8F6",
        ["Black/White"]:"gray",
        ["Grey/Orange"]:"orange",
    };
    // useEffect(()=>{
    //     if(theme =='Black/White'){
    //         TextP.name='Black';
    //         TextP.hex='#000';
    //         TextS.name='Grey';
    //         TextS.hex= "Grey";
    //         Background.name="White";
    //         Background.hex="White";
    //         Border.name="gray";
    //         Border.hex="gray";
    //     }
    // },[theme])
    // useEffect(()=>{
    //     themesContent.map((theme)=>{
    //         root.style.setProperty('--default-txt', theme.text);
    //         root.style.setProperty('--color-txt-second', theme.textSecond);
    //         root.style.setProperty("--color-border-first",theme.border )
    //         root.style.setProperty("--color-back-main",theme.background )
    //         root.style.setProperty("--color-back",theme.background )
    //         root.style.setProperty('--color-first', theme.background);
    //     })
    // }, [theme])
    const changeTheme = (elt) => {
        // console.log(elt.target.textContent)
        setTheme(elt.target.textContent)
        themesContent.map((theme)=>{
            if(theme.name == elt.target.textContent){
                root.style.setProperty('--default-txt', theme.text);
                root.style.setProperty('--color-txt-second', theme.textSecond);
                root.style.setProperty("--color-border-first",theme.border )
                root.style.setProperty("--color-back-main",theme.background )
                root.style.setProperty("--color-back",theme.background )
                root.style.setProperty('--color-first', theme.background);
            }
        })
    }
    class Themes {
        constructor(name, text, textSecond, border, background, className){
            this.name = name;
            this.text = text;
            this.textSecond = textSecond;
            this.border = border;
            this.background = background;
            this.className = className;
        }
    }
    const themesContent = [];
    const themes = {
        ThemeBleuArg: new Themes("Bleu/Argent", TextP["Bleu/Argent"], TextS["Bleu/Argent"], Border["Bleu/Argent"], Background["Bleu/Argent"], 'blueArg'),
        ThemeOrangeGrey: new Themes("Grey/Orange", TextP["Grey/Orange"], TextS["Grey/Orange"], Border["Grey/Orange"], Background["Grey/Orange"], 'greyOra'),
        ThemeDefault: new Themes("Black/White", TextP["Black/White"], TextS["Black/White"], Border["Black/White"], Background["Bleu/Argent"], 'blackWhite'),
    }
    for(const [key, value] of Object.entries(themes)){
        themesContent.push(value)
    }
    // const ThemeBleuArg = new Theme("Bleu/Argent", bleuTP.hex, bleuTS.hex, blueBo.hex, grayB.hex, 'blueArg');
    
    // const colors = [bleuTP, grayB, blueBo];
    return(
        <>
            {modaleColorOpen&&
                <div className={styles.containerColors}>
                <h2>THEMES</h2>
                <ul className={styles.listColors}>
                    { themesContent.map((theme)=>[
                        <li className={`${styles.themeDef} ${styles[theme.className]}`} onClick={e=>changeTheme(e)}>
                            <p>{theme.name}</p>
                        </li>
    
                    ])
                    }
                </ul>
            </div>
            }
        </>
        
    )
};
export default TestColors;