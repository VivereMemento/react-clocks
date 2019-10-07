import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './select.scss';
import { appNewsSetFilters } from '../../store/reducers/app';
import { getSelect, selectInit } from '../../store/reducers/select';

const Select = ({ options, title }) => {
	const dispatch = useDispatch();
	const { name, isActive } = useSelector(getSelect);
	
	const activityHandler = () => {
		dispatch(selectInit({ name: title, isActive: name === title ? !isActive : true }));
	};
	
	const onOptionClick = (fitlerTitle, option) => {
		dispatch(appNewsSetFilters({ name: fitlerTitle, value: option }));
	};

	return (
		<div
			className={
				classNames({
					select: true,
					select_active: title === name && isActive
				})
			}
			onClick={activityHandler}
		>
			<span className='select__title'>{title}</span>
			<ul className='select__list'>
				{ options.map(
					(option, index) => <li key={index} className='select__item' onClick={() => onOptionClick(title, option)}>{option}</li>
				)}
			</ul>
		</div>
	);
};

export default Select;

Select.propTypes = {
	title: PropTypes.string,
	options: PropTypes.array
};
