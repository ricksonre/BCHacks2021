import '../Styles/App.css';
import Routes from '../Routes'
import SideBar from './SideBar'

export default function app() 
{
  return (
      <div class="App">
        <SideBar />
        <Routes />
      </div>
  );
}
