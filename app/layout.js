import './globals.css'
import Script from 'next/script'
import Body from './components/Body'

const RootLayout = ({children}) => {
  return (
    <html lang="fr">
      <body >
        <Body>{children}</Body>
        <Script src="https://sc.affilizz.com/affilizz.js" async></Script>
      </body>
    </html>
  )
}
export default RootLayout
