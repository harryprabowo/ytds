import { Inter, Ribeye } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css"
import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'YTDS',
  description: 'You Tien Hoe & Desy Indahsari',
}

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      {children}
    </body>
  </html>
)
export default RootLayout