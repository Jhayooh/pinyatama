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
