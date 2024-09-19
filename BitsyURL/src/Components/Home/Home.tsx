import { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar"
import './home.css';
import Logo from '/bitsy.png';
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Footer from "../Footer/Footer";

const Home = () => {
  const [customizedURL, setCustomizedURL] = useState<string>('');
  const [originalURL, setOriginalURL] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const shortenButtonRef = useRef<any>(null);
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
  const httpRegex = /^https?:\/\//;
  const GenerateURL = async () => {
    shortenButtonRef.current.disabled = true;
    if(!httpRegex.test(originalURL)) {
      setOriginalURL("https://"+originalURL);
    }
    if(!urlRegex.test(originalURL)) {
      toast.error(<p>Invalid URL</p>);
      shortenButtonRef.current.disabled = false;
      return ;
    }
    const generateURLPromise = axios.post('https://bitsyurl-backend.vercel.app/GenerateURL', JSON.stringify({url: originalURL, suffix: customizedURL}), {
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      }
    });
    toast.promise(
      generateURLPromise,
      {
        loading: (<p><b>Creating URL...</b></p>),
        success: response => {
          setCustomizedURL("https://bitsyurl.vercel.app/"+response.data.url);
          setSubmitted(true);
          shortenButtonRef.current.disabled = false;
          return (<p>URL Created Successfully!</p>)
        },
        error: error => {
          shortenButtonRef.current.disabled = false;
          return (<p>{error.response.data.message}</p>);
        }   
      }
    );
  }
  const CopyToClipboard = async() => {
    await navigator.clipboard.writeText(customizedURL).then(() => {
      toast.success(<p>Copied to Clipboard!</p>);
    }).catch(() => toast.error(<p>Error copying...</p>));
  }
  return (
    <>
    <Toaster position="bottom-center"/>
    <div className="Home">
      <Navbar/>
      <div className="container">
        <div className="urlMaker">
          <div className="heading">
            <img src={Logo} className="Logo" alt='BitsyURL' />
            {submitted?<p>Your URL</p>: <p>Shorten your URLs</p>}
          </div>
          {submitted?<input type="text" className="disabledURL" disabled={true} value={originalURL} />:
          <input type="text" className="urlInput" value={originalURL} onChange={(e) => setOriginalURL(e.target.value)} placeholder="Enter your URL"/>}
          <div className="customizeHeading">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            {submitted?<p>Your BitsyURL</p>:<p>Customize your link</p>}
          </div>
          {submitted?<div className="customized">
              <input type="text" className="disabledURL" disabled={true} value={customizedURL} />
              <div className="copyButton" onClick={CopyToClipboard}>
                <i className="fa-solid fa-copy"></i>
              </div>
            </div>:
          <div className="customizing">
            <input type="text" className="mainUrl" disabled={true} value={"bitsyurl.vercel.app"} />
            <input type="text" className="sideURL" placeholder="Enter URL Suffix" value={customizedURL} onChange={(e) => setCustomizedURL(e.target.value)}/>
          </div>
          }
          {submitted?<button className="shortenButton" onClick={() => window.location.replace('/')}>
            Byte another URL
          </button>: <button className="shortenButton" onClick={GenerateURL} ref={shortenButtonRef}>
            Byte the URL
          </button>}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home
