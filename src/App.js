import { Fragment } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart'
function App() {
  return (
    <Fragment>
      <Cart>
        <Header/>
        <main>
          <Meals />
        </main>
      </Cart>
    </Fragment>
  );
}

export default App;
