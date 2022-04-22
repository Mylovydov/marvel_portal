import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const Page404 = () => {
	return (
		<div>
			<Helmet>
				<meta
					name="description"
					content="Page 404"
				/>
				<title>Page 404</title>
			</Helmet>
			<ErrorMessage/>
			<p>
				Page doesn't exist
			</p>
			<Link
				to="/"
			>
				Back to main page
			</Link>
		</div>
	);
};

export default Page404;