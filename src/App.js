import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Dashboard from "./component/page/Dashboard";
import FarmTabs from './component/page/FarmTabs';
import GeoLoc from './component/page/GeoLoc';
import Heatmap from './component/page/Heatmap';
import SideNav from "./component/page/SideNav";
import ProductPrices from './component/ProductPrices';
import Dash from './component/svg/Dash';
import { auth } from "./firebase/Config";
import { useAuthState } from 'react-firebase-hooks/auth';

import MapPolygon from "./component/MapPolygon";

function App() {
  const [user] = useAuthState(auth)
  console.log(user);
  const element = user ? <SideNav /> : <Dashboard />

  const router = createBrowserRouter([
    {
      path: "/",
      element: element
    },
    {
      path: "/farmname",
      element: <FarmTabs />
    },
    {
      path: "/Geo",
      element: <GeoLoc />
    },

    {
      path: "/table",
      element: <ProductPrices />
    },
    {
      path: "/Heat",
      element: <Heatmap />
    },
    {
      path: '/Dash',
      element: <Dash />
    },
    {
      path: 'map',
      element: <MapPolygon />
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
