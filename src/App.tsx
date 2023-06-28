import { DynamicForm } from './pages';
import formData from '../src/data/forms.json'
import './App.scss';

function App() {
	const formDefinition = JSON.parse(JSON.stringify(formData));

	return (
		<div style={{ margin: '1rem 0' }}>
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ color: '#39cdcc' }}>{formDefinition?.meta?.name}</h1>
				<p>{formDefinition?.meta?.Description}</p>
			</div>
			<DynamicForm formDefinition={formDefinition} formData={formData} />
		</div>
	);
}

export default App;
