import './App.css';
import Favourites from './Components/Favourites';
import Meals from './Components/Meals';
import Models from './Components/Models';
import Search from './Components/Search';
import { useGlobalContext } from './Context';

function App() {
  const { showModel,favourites } = useGlobalContext()
  return (<>

    <Search />
    {favourites.length>0 && <Favourites/> }
    <Meals />
    {showModel && <Models/>}
  </>)
}

export default App;
