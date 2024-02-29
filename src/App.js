import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import AdminHome from './component/page/AdminHome';
import Dashboard from './component/page/Dashboard';
import FarmTabs from './component/page/FarmTabs';
import GeoLoc from './component/page/GeoLoc';
import Dash from './component/svg/Dash';
import Heatmap from './component/page/Heatmap';
import ProductPrices from './component/ProductPrices'
import SideNav from "./component/page/SideNav";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Dashboard />
    },
    {
      path: "/farmname",
      element: <FarmTabs />
    },
    {
      path: "/admin",
      element: <SideNav />
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
      path:'/Dash',
      element:<Dash />
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
