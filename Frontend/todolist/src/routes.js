import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import TasksList from './pages/TasksList';


export default function Routes(){
    return(        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TasksList}/>
                

            </Switch>
        </BrowserRouter>
    )
}