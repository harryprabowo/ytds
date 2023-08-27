import { Great_Vibes, Playfair_Display, Playfair_Display_SC, Cinzel_Decorative } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.css'
import 'styles/base.scss'

const font = Playfair_Display({subsets: ['latin']})

export const metadata = {
  title: 'YTDS',
  description: 'You Tien Hoe & Desy Indahsari',
}

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={font.className}>
      {children}
    </body>
  </html>
)
export default RootLayout