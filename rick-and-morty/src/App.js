import React from 'react'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import EpisodeDetail from './pages/EpisodeDetail';
import Home from './pages/Home';
import './styles/app.scss';

function App() {
  return (
    <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/episode/:episodeId" element={<EpisodeDetail />}></Route>
              {/* <Route exact path="/detail" component={Error}/>
              <Route path="/episode/:episodeId" component={EpisodeDetail}/>
              <Route path="/error" component={Error}/> */}
            </Routes>
          </div>
      </Router>
  )
}

export default App;
