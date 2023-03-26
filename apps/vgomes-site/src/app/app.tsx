// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import Home from './pages/home/home';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import Art from './pages/art/art';
import Nfts from './pages/nfts/nfts';
import NavBar from './components/nav-bar/nav-bar';
import Footer from './components/footer/footer';

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"
          action={async () => {
            return redirect('/');
          }}
          element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/art" element={<Art />}></Route>
        <Route path="/nfts" element={<Nfts />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
