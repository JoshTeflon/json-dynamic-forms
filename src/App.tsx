import { useState } from 'react';
import { Button, Input, Textarea } from './components/interface';
import './App.scss';



function App() {
	const [formValues, setFormValues] = useState({});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		console.log([name], value)
		setFormValues((prevFormValues) => ({
		...prevFormValues,
		[name]: value,
		}));
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', formValues);
	};

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
		>
			<form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
				<Input
					label='Input Label'
					name='inputName'
					id='inputId'
					onChange={handleInputChange}
				/>
				<Textarea
					label='Textarea Label'
					name='textareaName'
					id='textareaId'
					onChange={handleInputChange}
				/>
				<Button
					variant='primary'
					size='base'
					type='submit'
				>Primary-base</Button>
			</form>
			<Button
				variant='primary'
				size='lg'
			>Primary-lg</Button>
			<Button
				variant='outlined'
				size='base'
			>Outlined-base</Button>
			<Button
				variant='outlined'
				size='lg'
			>Outlined-lg</Button>
			<Button
				variant='naked'
			>Naked</Button>
			<Button
				variant='link'
			>Link</Button>
		</div>
	);
}

export default App;