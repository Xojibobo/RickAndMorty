
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header>
            <div className="rick_morty">
                Rick & Morty <span className="wiki">WiKi</span>
            </div>
            <nav>
                <ul className="navbar">
                    <Link className="navbar-li" to={'/'}><li >Characters</li></Link>
                    <Link className="navbar-li" to={'/episode'}><li>Episode</li></Link>
                    <Link className="navbar-li" to={'/location'}><li>Location</li></Link>

                </ul>
            </nav>
        </header>)
}