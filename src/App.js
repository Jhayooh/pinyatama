import './App.css';
import Dashboard from './component/page/Dashboard';
import AdminHome from './component/page/AdminHome'
import FarmTabs from './component/page/FarmTabs';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
