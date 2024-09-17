import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const URLGetter = () => {
  const {urlSuffix} = useParams();
  const [newURL, setNewURL] = useState('');
  const [page, setPage] = useState((<></>));
  useEffect(() => {
    const urlGetter = async() => {
      try {
        const response = await axios.post('http://localhost:3000/GetURL', JSON.stringify({url: urlSuffix}), {
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            }
        });
        setNewURL(response.data.url);
      }
      catch(e) {
        setPage((<>URL Not found!</>));
      }
    }
    urlGetter();
  }, []);
  useEffect(() => {
    if(newURL != ''){
        window.location.replace(newURL);
    }
  }, [newURL]);
  return (
    page
  )
}

export default URLGetter
