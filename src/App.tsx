import { Button } from './components/interface';
import { DynamicForm } from './pages';
import formData from '../src/data/forms.json'
import './App.scss';

function App() {
	const formDefinition = JSON.parse(JSON.stringify(formData));

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(formDefinition?.meta?.url);
			alert('Text Copied!');
		} catch (error) {
			alert(`Failed to copy text: ${error}`);
		}
	};

	return (
		<div style={{ margin: '1rem 0' }}>
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ color: '#39cdcc' }}>{formDefinition?.meta?.name}</h1>
				<p>{formDefinition?.meta?.Description}</p>
				<Button
					variant='link'
					onClick={handleCopy}
				>Copy Form URL</Button>
			</div>
			<DynamicForm formDefinition={formDefinition} formData={formData} />
		</div>
	);
}

export default App;
