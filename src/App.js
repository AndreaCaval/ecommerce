import { Route, Routes } from 'react-router-dom'

import Home from "./routes/home/home.components.jsx";
import Navigation from './routes/navigation/navigation.component.jsx';
import SignIn from './routes/signin/signin.component.jsx';

const Shop = () => {
  return <h1>lets shop</h1>
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
