import dynamic from 'next/dynamic'
import './globals.css'
import Script from 'next/script'
const Body = dynamic (() =>{
  return import('./structure/Body').then((result)=> result.default);
})
import { GoogleTagManager } from '@next/third-parties/google'

// refactor a faire
const RootLayout = ({children}) => {
  
  return (
    <html lang="fr">
      <head>
        <meta name='description' content='blablabla'/>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Oswald:wght@200;300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Teko:wght@300;400&display=swap" rel="stylesheet"></link>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1583645471852701" crossOrigin="anonymous"></Script>
        
      </head>
      <body >
        <Body>{children}</Body>
        <Script src="https://sc.affilizz.com/affilizz.js" async></Script>
        <GoogleTagManager gtmId={process.env.GTMID}/>
      </body>
    </html>
  )
}
export default RootLayout;

