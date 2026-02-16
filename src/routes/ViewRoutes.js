
import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { dataRoutes } from './dataRoutes';

// TODO - consider transition between routes
// import {
//     TransitionGroup,
//     CSSTransition
//   } from 'react-transition-group';


export default function ViewRoutes () {

    let location = useLocation();
    let currKeyIndex = 0;

    const getRoutes = () => {
        const routes = [];
        let currRoute;
        let currSubRoute;
        for (let i = 0; i < dataRoutes.length; i++) {
            currRoute = dataRoutes[i];
            if (currRoute.routes === undefined) { //if there's no sub routes, no need to go down to get sub routes
                routes.push(
                    getRouteComponent(currRoute)
                );
            } else {  //otherwise loop through the sub routes to retrieve
                for (let j = 0; j < currRoute.routes.length; j++) {
                    currSubRoute = currRoute.routes[j];
                    routes.push(
                        getRouteComponent(currSubRoute)
                    );
                }
            }
        }
        return routes;
    }

    const getRouteComponent = (route) => {
        currKeyIndex++;
        return (
            <Route key={ currKeyIndex } path={ route.path }>
                {
                route.data === undefined
                ? <route.component />
                : <route.component data={ route.data } />
                }
                <Helmet>
                    <title>{ route.title + ' - Koya App' }</title>
                    <meta name='description' content={ route.title + ' - Koya App' } />
                </Helmet>
            </Route>
        );
    }


    return (
        <Switch location={ location }>
            { getRoutes() }
        </Switch>
    );

}