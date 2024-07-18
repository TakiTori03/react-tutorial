import logo from './logo.svg';
import './App.scss';

import Header from './components/Layout/Header';
import { Outlet } from 'react-router-dom';
const App = () => {


  return (
    <><div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <Outlet></Outlet>
        </div>
      </div>

    </div>
    </>

  );
}

export default App;