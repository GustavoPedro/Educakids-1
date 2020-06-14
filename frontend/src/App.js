import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';

import Header from './components/Header';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Home from './pages/home';

import Activities from './pages/activity/list'
import Discipline from './pages/discipline/select';
import DisciplineDetails from './pages/discipline/details';
import Profile from './pages/profile';

import Admin from './pages/admin';

import Route from './services/routes';
import DisciplineDetailsAluno from './pages/discipline/detailsAluno';

function App() {
    return (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route component={Signin} exact path="/in" />
            <Route component={Signup} exact path="/up" />

            <Route component={Home} exact path="/" isPrivate />

            <Route component={Profile} exact path="/profile" isPrivate/>

            <Route component={Discipline} exact path="/disciplines" isPrivate AdmRoute/>
            <Route component={DisciplineDetails} exact path="/disciplines/details" isPrivate AdmRoute/>
            <Route component={Activities} exact path="/activities" isPrivate AdmRoute/>
            <Route component={DisciplineDetailsAluno} exact path="/disciplinadetailsaluno" isPrivate />

            <Route component={Admin} exact path="/admin" isPrivate />
            <Route component={NotFound} />
        </Switch>
        <Footer/>
    </BrowserRouter>
    )
}

function NotFound() {
    return (
        <div className="container">
            <div className="row">
                <h5>A página solicitada não foi encontrada.</h5>
            </div>
        </div>
    )
}

function Footer() {
    return (
    <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3 text-muted">© 2020 Copyright
            <div>Educa Kids</div>
        </div>
    </footer>
    )
}
export default App;