import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import './clocks.scss';
import { api } from '../../store/api';

const Clocks = () => {
	const [zones] = api.getZone([]);
	const [timeZone, setTimeZone] = useState([]);
	const [currentTime, setCurrentTime] = useState(moment());
	const isLoading = [zones.isLoading].find(loading => loading);
	
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

	useEffect(() => {
		setTimeZone(zones.data);
	}, [zones]);

	return (
		<div className='clocks'>
			{isLoading
				? <div className='clocks__loader'>Loading...</div>
				: <>
					<div className='clocks__time-wrap'>
						{	Array.isArray(timeZone) && timeZone.map(obj => (
							<div key={obj.city} className='clocks__time'>
								<span>{obj.city}</span>
								<span>
									{
										`${currentTime.tz(obj.zone).get('hour')} : 
										${currentTime.tz(obj.zone).get('minute')} : 
										${currentTime.tz(obj.zone).get('second')}`
									}
								</span>
							</div>
						))}
					</div>
					<div className='clock__options'>
						<button id='hour' type='button' onClick={handleSetTime}>set hours</button>
						<button id='minute' type='button' onClick={handleSetTime}>set minutes</button>
						<button id='second' type='button' onClick={handleSetTime}>set seconds</button>
						<button type='button' onClick={toCurrentTime}>current time</button>
					</div>
				</>
			}
		</div>
	);
};

export default Clocks;
