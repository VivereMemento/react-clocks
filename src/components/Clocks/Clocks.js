import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import './clocks.scss';

const Clocks = () => {
	const tz = ['Europe/London', 'Europe/Kiev', 'America/Los_Angeles'];
	const [currentTime, setCurrentTime] = useState(moment());
	
	const handleSetTime = ({ target }) => setCurrentTime(Object.create(currentTime.add(1, `${target.id}`)));

	const toCurrentTime = () => {
		setCurrentTime(moment());
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentTime(Object.create(currentTime.add(1, 's')));
		}, 1000);

		return () => clearTimeout(timer);
	}, [currentTime]);

	return (
		<div className='clocks'>
			<div className='clocks__wrap'>
				{ tz.map(zone => (
					<div className='clocks__time'>
						{`${currentTime.tz(zone).get('hour')} : ${currentTime.tz(zone).get('minute')} : ${currentTime.tz(zone).get('second')}`}
					</div>
				))}
			</div>
			<div className='clock__options'>
				<button id='hour' type='button' onClick={handleSetTime}>set hours</button>
				<button id='minute' type='button' onClick={handleSetTime}>set minutes</button>
				<button id='second' type='button' onClick={handleSetTime}>set seconds</button>
				<button type='button' onClick={toCurrentTime}>current time</button>
			</div>
		</div>
	);
};

export default Clocks;
