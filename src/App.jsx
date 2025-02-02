import Sidebar from './components/Sidebar/SideBar.jsx';
import Navbar from './components/Navbar/NavBar.jsx';
import Content from './components/Content/Content.jsx';
import './index.css';

        // if you get errors in the first two lines of the import ignore them HHH
        // this is the app function OK? ok.

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Navbar />
        <Content/>
      </div>
    </div>
  );
}