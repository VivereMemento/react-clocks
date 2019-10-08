import React from 'react';
import './footer.scss';
import PageLayout from '../PageLayout/PageLayout';

const { Container } = PageLayout;
const FooterContent = () => (
	<Container>
		<div className='footer__content'>
			© Kuznetsov Alexandr { new Date().getFullYear()}
		</div>
	</Container>
);
export default FooterContent;
