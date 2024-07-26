
import './App.scss';
import PerfectScrollbar from 'react-perfect-scrollbar'
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
        <PerfectScrollbar>
          <div className='app-content'>

            <Outlet></Outlet>
          </div>
        </PerfectScrollbar>
      </div>

    </div>
    </>

  );
}

export default App;
