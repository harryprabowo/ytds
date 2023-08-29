import { Federo } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.css'
import 'styles/base.scss'

const font = Federo({subsets: ['latin'], weight: '400'})

export const metadata = {
  title: 'Wedding | You Tien Hoe & Desy Indahsari',
  description: 'Wedding: You Tien Hoe & Desy Indahsari',
}

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={font.className}>
      {children}
    </body>
  </html>
)
export default RootLayout