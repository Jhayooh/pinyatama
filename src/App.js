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
      element: <AdminHome />
    },

    {
      path: "/Geo",
      element: <GeoLoc />
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
