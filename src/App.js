import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AllItems from './components/All-items/AllItems';
import Navbar from './components/navbar/Navbar';
import ShortLists from './components/Short-listed/ShortLists';
import { availableList } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(availableList());
    return () => {
        // cleanup
    }
})
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact={true} path="/" component={AllItems}/>
        <Route exact={true} path="/shortlists" component={ShortLists}/>

      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
