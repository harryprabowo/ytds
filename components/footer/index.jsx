import { Great_Vibes } from 'next/font/google'
import { Button } from 'react-bootstrap'
import { FaYoutube, FaInstagramSquare } from "react-icons/fa";
import "styles/footer.scss"

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] })


const Footer = () => {
    return (
        <div className="footer-container">
            <h2>@2023</h2>
            <h1 className={greatVibes.className}>Thank you</h1>
            <br />
            <br />
            <Button variant="link" size="xl" href="https://www.youtube.com/@desyindahsari" target="_blank">
                <FaYoutube/>
            </Button>
            <Button variant="link" size="xl" href="https://www.instagram.com/desyindahsari/" target="_blank">
                <FaInstagramSquare />
            </Button>
        </div>
    )
}

export default Footer