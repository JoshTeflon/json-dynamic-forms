import { DynamicForm } from './pages';
import formData from '../src/data/forms.json'
import './App.scss';

function App() {
	const formDefinition = JSON.parse(JSON.stringify(formData));

	console.log(formDefinition)

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Dynamic Form</h1>
			<DynamicForm formDefinition={formDefinition} formData={formData} />
		</div>
	);
}

export default App;
