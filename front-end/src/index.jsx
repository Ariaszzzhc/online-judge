import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from "react";
import ReactDom from 'react-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/page/Home";
import About from "./components/page/About";
import Login from "./components/page/Login";
import ProblemSets from "./components/page/ProblemSets";
import Problems from "./components/page/Problems";

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/problemSets" render={() => <ProblemSets category="Practice"/>}/>
            <Route exact path="/problemSets/practice" render={() => <ProblemSets category="Practice"/>}/>
            <Route exact path="/problemSets/contest" render={() => <ProblemSets category="Contest"/>}/>
            <Route exact path="/problemSets/:number" component={Problems}/>
        </Switch>
    </main>
);

const App = () => (
    <div id="page-container">
        <header>
            <Navbar/>
        </header>
        <Main/>
        <Footer/>
    </div>
);

ReactDom.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
