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
    console.log("mounting");  
    dispatch(availableList());
    // console.log(data);
    return () => {
        // cleanup
    }
}, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/shortlists" component={ShortLists}/>
        <Route path="/" component={AllItems}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
