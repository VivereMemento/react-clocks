import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Clocks from '../components/Clocks/Clocks';

const Routes = () => (
	<Switch>
		<Route path='/' render={() => <Clocks />} />
	</Switch>
);

export default Routes;
