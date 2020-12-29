import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Nav from '../layouts/Nav';
import Footer from '../layouts/Footer';


import Home from '../components/Home';
import Reacts from '../components/Reacts';
import ProjectList from '../components/projects/ProjectList';
import ProjectCreate from './projects/ProjectCreate';





function App() {
    return (
      <>
      <Router> 
      <Nav /> 
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/react" component={Reacts} />
        <Route exact path="/projects/create" component={ProjectCreate} />
      </Switch>
      <Footer />
      </Router>
      </>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
