import { BrowserRouter as Router, Route, Switch, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from "./component/page/Dashboard";
import FarmTabs from './component/page/FarmTabs';
import GeoLoc from './component/page/GeoLoc';
import Heatmap from './component/page/Heatmap';
import SideNav from "./component/page/SideNav";
import Dash from './component/svg/Dash';
import { auth } from "./firebase/Config";
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '../src/component/page/LandingPage/Login'
import Landing from "./component/page/LandingPage/Landing";

function App() {
  const [user] = useAuthState(auth)
  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <SideNav /> : <Landing />,
      // children: [
      //   { path: 'dashboard', element: <Dashboard /> },
      //   { path: 'farm-tabs', element: <FarmTabs /> },
      //   { path: 'geo-loc', element: <GeoLoc /> },
      //   { path: 'heatmap', element: <Heatmap /> },
      //   { path: 'product-prices', element: <ProductPrices /> },
      // ]
    },
    { path: '/login', element: <Login /> }
  ]);
  return (
    <div className='App'>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
