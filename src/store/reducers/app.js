import { createSelector } from 'reselect';
import { compose, prop } from '../../helpers';

const filteredSources = (sources = [], fls = {}) => {
	const filters = Object.entries(fls);

	if (!filters.length) return sources;

	const result = filters.reduce((res, [value, flts]) => {
		const a = flts.reduce((acc, el) => {
			const filteredSource = sources.filter(source => source[value] === el);
			return [...acc, ...filteredSource];
		}, []);
		return [...res, ...a];
	}, []);

	return result;
};

// actions
const APP_INIT = 'APP::INIT';
const APP_NEWS_SET_FILTERS = 'APP-NEWS::SET-FILTERS';
export const appInit = (payload = {}) => ({ type: APP_INIT, payload });
export const appNewsSetFilters = (payload = {}) => ({ type: APP_NEWS_SET_FILTERS, payload });

// reducers
const initialState = {};
const app = (state = initialState, { type, payload }) => (
	type === APP_INIT 							? { ...state, ...payload }
	: type === APP_NEWS_SET_FILTERS ? {
		...state,
		news: {
			...state.news,
			filters:
			{
				...state.news.filters,
				[payload.name]: state.news.filters[payload.name] ? [...state.news.filters[payload.name], payload.value] : [payload.value]
			}
		}
	}
	: state
);
// selecotrs
export const getApp = state => state.app;
export const getAppNews = state => compose(prop('news'), getApp)(state);
export const getAppNewsSource = state => compose(prop('sources'), getAppNews)(state);
export const getAppNewsFilters = state => compose(prop('filters'), getAppNews)(state);
export const getAppNewsError = state => compose(prop('error'), getAppNews)(state);
export const getFilteredSources = createSelector(
	[getAppNewsSource, getAppNewsFilters],
	filteredSources
);

export default app;
