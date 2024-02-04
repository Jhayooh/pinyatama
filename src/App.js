
import './App.css';
import Dashboard from './component/page/Dashboard';
import AdminHome from './component/page/AdminHome'
import FarmTabs from './component/page/FarmTabs';
import LoginNew from './component/LoginNew'
import AddInfo from './component/AddInfo';
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
    },
    {
      path: '/login',
      element: <LoginNew />
    },
    {
      path: '/add',
      element: <AddInfo />
    }
  
  ])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
