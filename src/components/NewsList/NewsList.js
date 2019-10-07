import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appInit, getAppNewsError, getFilteredSources } from '../../store/reducers/app';
import { api } from '../../store/api';

const NewsList = () => {
	const [news] = api.getNews({});
	const dispatch = useDispatch();
	const newsSources = useSelector(getFilteredSources);
	const articleListError = useSelector(getAppNewsError);

	useEffect(() => {
		const sources = news?.data?.sources;
		const error = news?.data?.error;

		dispatch(
			appInit({
				news: {
					sources,
					filters: {},
					error
				}
			})
		);
	}, [news, dispatch]);

	return (
		<ul className='news-list'>
			{ news.isLoading ? <div>Loading...</div>
			: news.isError ? <div>Error {articleListError}</div>
			: Array.isArray(newsSources)
				&& newsSources.map((
					{ category, language, country },
					index
				) => <li key={index} className='news-list__item'>{ `${category} ${language}, ${country}` }</li>)
			}
		</ul>
	);
};

export default NewsList;
