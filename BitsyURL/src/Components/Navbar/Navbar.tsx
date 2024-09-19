import './navbar.css';
import Logo from '/bitsy.png';
function Navbar() {
  return (
    <nav>
        <img className='Logo' src={Logo} alt="BitsyURL" onClick={() => window.location.replace('/')} />
        <p className='Logo-name' onClick={() => window.location.replace('https://github.com/GuthaPrathyush/BitsyURL')}>BitsyURL</p>
    </nav>
  )
}

export default Navbar
