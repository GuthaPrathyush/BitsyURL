import Logo from '/bitsyurl.png';
import './footer.css';
function Footer() {
  return (
    <footer>
      <img src={Logo} alt="BitsyURL" onClick={() => window.location.replace('/')}/>
      <div className="heading">Follow me on</div>
      <div className="socialNetworkDiv">
        <i className="fa-brands fa-square-github" onClick={() => window.location.replace('https://github.com/GuthaPrathyush')}></i>
        <i className="fa-brands fa-linkedin" onClick={() => window.location.replace('https://www.linkedin.com/in/gutha-prathyush-6215ba255/')}></i>
        <i className="fa-brands fa-square-x-twitter" onClick={() => window.location.replace('https://x.com/Gutha_Prathyush')}></i>
        <i className="fa-brands fa-square-reddit" onClick={() => window.location.replace('https://www.reddit.com/user/Prathyush_Gutha/')}></i>
      </div>
      <hr />
      <p>&copy;2024-{new Date().getFullYear()}, BitsyURL - All Rights Reserved</p>
    </footer>
  )
}

export default Footer
