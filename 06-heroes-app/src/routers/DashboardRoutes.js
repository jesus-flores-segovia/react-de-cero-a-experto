import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { HeroScreen } from '../components/heroes/HeroScreen';
import { DcScreen } from "../components/dc/DcScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { Navbar } from '../components/ui/NavBar';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <Switch>
                    <Route exact path="/marvel" component={MarvelScreen}/>
                    <Route exact path="/hero/:heroId" component={HeroScreen}/>
                    <Route exact path="/dc" component={DcScreen}/>

                    <Redirect to="/marvel"/>
                </Switch>
            </div>   
        </>
    )
}
