import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLGetter from './Components/URLGetter';
import Home from './Components/Home/Home';
import Error from './Components/Error/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path=':urlSuffix' element={<URLGetter/>}></Route>
        <Route path='/*' element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
