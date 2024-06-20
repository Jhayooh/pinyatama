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
import Login from "./component/Login";
import About from  "./component/page/About"

function App() {
  const [user] = useAuthState(auth)
  console.log(user);
  const element = user ? <SideNav /> : <Dashboard />

  const router = createBrowserRouter([
    {
      path: "/",
      element: element
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
