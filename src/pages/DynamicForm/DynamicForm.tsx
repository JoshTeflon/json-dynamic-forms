import React, { useState } from 'react';
import { Button, CheckboxRadio, FileInput, Input, Label, Select, Textarea } from '../../components/interface';
import classnames from 'classnames';

interface OptionProps {
	id: string
	label: string
	value: string
}

interface ActionProps {
	type: string
	label: string
	message?: string
}

interface DynamicFormProps {
	className?: string
	formDefinition: any
	formData: any
}

const DynamicForm: React.FC<DynamicFormProps> = ({ className, formDefinition, formData }) => {
	const [formValues, setFormValues] = useState<any>(formData || {});
	const [currentPage, setCurrentPage] = useState<number>(0);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name } = event.target;
		
		if (event.target.type === 'checkbox') {
			const checked = (event.target as HTMLInputElement).checked;
			console.log([name], checked)
			setFormValues((prevFormValues: any) => ({
				...prevFormValues,
				[name]: checked,
			}));
		} else if (event.target.type === 'file') {
			const files = (event.target as HTMLInputElement).files;
			console.log([name], files)
			setFormValues((prevFormValues: any) => ({
				...prevFormValues,
				[name]: files,
			}));
		} else {
			const value = event.target.value;
			console.log([name], value)
			setFormValues((prevFormValues: any) => ({
				...prevFormValues,
				[name]: value,
			}));
		}
	};	  
	  
    const handleRemoveFile = (fileInputName: string) => {
        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            [fileInputName]: [],
        }));
    };

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', formValues);
		// console.log('Form submitted:', formValues?.fileName[0]?.name);
	};

	const handleButtonClick = (action: ActionProps) => {
		const isFirstPage = currentPage === 0;
		const isLastPage = currentPage === formDefinition.pages.length - 1;

		if (!isFirstPage && action?.type === 'cancel') {
			setCurrentPage((prevPage) => prevPage - 1);
		}

		if (!isLastPage && action?.type === 'continue') {
			setCurrentPage((prevPage) => prevPage + 1);
		}

		// if (isLastPage && action?.type === 'submit') {
		// 	handleFormSubmit()
		// }
	}

	const renderFormFields = (fields: any[]) => {
		return fields?.map((field: any) => {
			const value = formValues[field?.name] || '';

			switch (field?.type) {
				case 'short_text':
					return (
						<Input
							key={field?.label}
							label={field?.label}
							description={field?.description}
							name={field?.name}
							id={field?.id}
							value={value}
							onChange={handleInputChange}
						/>
					);

				case 'date_time':
					return (
						<Input
							key={field?.label}
							label={field?.label}
							description={field?.description}
							name={field?.name}
							id={field?.id}
							value={value}
							onChange={handleInputChange}
							type='datetime-local'
						/>
					);

				case 'phone':
					return (
						<Input
							key={field?.label}
							label={field?.label}
							description={field?.description}
							name={field?.name}
							id={field?.id}
							value={value}
							onChange={handleInputChange}
							type='tel'
						/>
					);

				case 'integer':
				case 'number':
					return (
						<Input
							key={field?.label}
							label={field?.label}
							description={field?.description}
							name={field?.name}
							id={field?.id}
							value={value}
							onChange={handleInputChange}
							type='number'
						/>
					);

				case 'date':
				case 'time':
				case 'email':
					return (
						<Input
							key={field?.label}
							label={field?.label}
							description={field?.description}
							name={field?.name}
							id={field?.id}
							value={value}
							onChange={handleInputChange}
							type={field?.type}
						/>
					);

				case 'long_text':
					return (
						<Textarea
							key={field?.label}
							label={field?.label}
							description={field?.description}
							name={field?.name}
							id={field?.id}
							value={value}
							onChange={handleInputChange}
						/>
					);

				case 'checkbox':
				case 'radio':
					return (
						<div key={field?.label}>
							<Label
								id={field?.id}
								label={field?.label}
								description={field?.description}
							/>
							{
								field?.options?.map((i: OptionProps) => {
									return (
										<CheckboxRadio
											key={i?.id}
											name={field?.name}
											id={i?.id}
											label={i?.label}
											onChange={handleInputChange}
											type={field?.type}
										/>
									)
								})
							}
						</div>
					);

				case 'label':
					return (
						<Label
							key={field?.label}
							id={field?.id}
							label={field?.name}
							description={field?.description}
						/>
					)

					case 'dropdown':
						return (
							<Select
								key={field?.label}
								label={field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								options={field?.options}
								onChange={handleInputChange}
							/>
						);
					
					case 'upload':
						return (
							<FileInput
								key={field?.label}
								label={field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								onChange={handleInputChange}
								file={formValues?.field?.name}
								handleRemove={() => handleRemoveFile(field?.name)}
							/>
						);

					case 'image':
					case 'audio':
					case 'video':
						return (
							<FileInput
								key={field?.label}
								label={field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								onChange={handleInputChange}
								file={formValues[field?.name] || []}
								accept={`${field.type}/*`}
								handleRemove={() => handleRemoveFile(field?.name)}
							/>
						);

				default:
					return null;
			}
		});
	};

	const renderSections = (sections: any[]) => {
		return sections.map((section: any) => {
			return (
				<div key={section.name}>
					<h2>{section.name}</h2>
					<p>{section.description}</p>
					{renderFormFields(section.fields)}
				</div>
			);
		});
	};

	const renderPages = (page: any) => {
		return (
			<div key={page.name}>
				<h2>{page.title}</h2>
				<p>{page.description}</p>
				{renderSections(page.sections)}
			</div>
		);
	};

	const renderActions = (actions: ActionProps[]) => {
		// const isLastPage = currentPage === formDefinition.pages.length - 1;
		// const isFirstPage = currentPage === 0;
	
		return (
			<div className='actions'>
				{/* {!isFirstPage && (
					<Button variant='naked' onClick={handlePreviousPage}>
						Previous
					</Button>
				)}
				{!isLastPage && (
					<Button variant="naked" onClick={handleNextPage}>
						Next
					</Button>
				)}
				{isLastPage && (
					<Button variant="primary" type="submit">
						Submit
					</Button>
				)} */}
				{actions?.map((action: ActionProps) => {
					return (
						<Button
							key={action?.label}
							className='actions-btn'
							variant={action?.type === 'submit' ? 'primary' : 'outlined'}
							type={action?.type === 'submit' ? 'submit' : 'button'}
							onClick={() => handleButtonClick(action)}
						>{action?.label}</Button>
					)
				})}
			</div>
		);
	};

	return (
		<div className={classnames('dynamic-form', className)}>
			<form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
				{renderPages(formDefinition.pages[currentPage])}
				{renderActions(formDefinition.pages[currentPage]?.actions)}
			</form>
		</div>
	);
}

export default DynamicForm;