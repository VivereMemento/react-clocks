import { useState, useEffect, useReducer } from 'react';
import { curry } from 'ramda';

const fromJson = obj => obj.json();
// const toJson = obj => JSON.stringify(obj);

const FETCH_INIT = 'FETCH::INIT';
const FETCH_SUCCESS = 'FETCH::SUCCESS';
const FETCH_FAILURE = 'FETCH::FAILURE';

const dataReducer = (state = null, action) => {
	const { type, payload } = action;
	switch (type) {
		case FETCH_INIT:
			return {
				...state,
				isLoading: true,
				isError: false
			};
		case FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				isSuccess: true,
				isError: false,
				data: payload
			};
		case FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				data: payload
			};
		default:
			return state;
	}
};
const useDataApi = (
	initialUrl,
	isImmediateLoading,
	initialData,
	initialParams = { method: 'GET' }
) => {
	const [url, setUrl] = useState(initialUrl);
	const [params, setParams] = useState(initialParams);
	const [state, dispatch] = useReducer(dataReducer, {
		isLoading: isImmediateLoading,
		isSuccess: false,
		isError: false,
		data: initialData
	});
  
	useEffect(() => {
		let didCancel = false;
	
		const fetchData = async () => {
			dispatch({ type: FETCH_INIT });
			
			try {
				await fetch(url, params)
					.then((res) => {
						if (res.ok) {
							return fromJson(res);
						} else {
							throw res;
						}
					})
					.then((res) => {
						if (!didCancel) {
							setTimeout(() => {
								dispatch({ type: FETCH_SUCCESS, payload: res });
							}, 3000);
						}
					});
			} catch (error) {
				if (!didCancel) {
					dispatch({ type: FETCH_FAILURE, payload: { error: error.status } });
				}
			}
		};
		url && fetchData();
		return () => {
			didCancel = true;
		};
	}, [url, params]);
  
	return [state, setUrl, setParams];
};

const baseUrl = key => `https://www.json-generator.com/api/json/get/${key}`;
const getData = curry(
	(url, isImmediateLoading, initialData) => useDataApi(baseUrl(url), isImmediateLoading, initialData)
);
// const postData = (url, isImmediateLoad) => (params = {}) => {
// 	const [posting, setUrl, setParams] = useDataApi(null, isImmediateLoad, {}, params);
// 	const activateSendData = (data) => {
// 		setParams({ method: 'POST', ...params, body: toJson(data) });
// 		setUrl(`${baseUrl}/${url}`);
// 	};
	
// 	return [
// 		posting,
// 		activateSendData
// 	];
// };
// const notImmediateLoading = false;
const immediateLoading = true;
const getZone = getData('coDIcXOBMy?indent=2', immediateLoading);

export const api = {
	baseUrl,
	getZone
};

export default useDataApi;
