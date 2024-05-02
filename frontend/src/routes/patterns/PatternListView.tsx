import { useLoaderData } from 'react-router-dom';
import { Grid, PatternTile } from '../../components';

const PatternListView = () => {
	const data = useLoaderData() as PatternPage;

	return (
		<Grid>
			{data.results && data.results.map((p) => {
        console.log(p)
				return <PatternTile pattern={p}/>;
			})}
		</Grid>
	);
};

export { PatternListView };
