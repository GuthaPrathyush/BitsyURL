import Footer from '../Footer/Footer';
import NavBar from '../Navbar/Navbar'
import './error.css';

function Error() {
  return (
    <>
    <NavBar/>
    <div className='Error'>
      <div className="ErrorStatements">
        <p className='fournotfour'>404</p>
        <p className='subHeading'>Page nout Found!</p>
        <p className='verify'>Please verify the link with the sender</p>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Error
