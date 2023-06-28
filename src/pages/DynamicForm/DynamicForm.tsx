import React, { useEffect, useState } from 'react';
import { Button, CheckboxRadio, FileInput, Input, Label, Modal, Select, Textarea } from '../../components/interface';
import { appendFullStop, getMediaDuration } from '../../data/utils';
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
	const [formValues, setFormValues] = useState<any>({});
	const [formErrors, setFormErrors] = useState<any>({});
	const [hasErrors, setHasErrors] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [openModal, setOpenModal] = useState<boolean>(false);

	useEffect(() => {
		setHasErrors(Object.values(formErrors).some((errors: any) => errors.length > 0))
	}, [formErrors])

	const getFieldDefinition = (fieldName: string) => {
		const { pages } = formDefinition;
		for (const page of pages) {
			const fields = page.sections.flatMap((section: any) => section.fields);
			const field = fields.find((field: any) => field.name === fieldName);
			if (field) {
				return field;
			}
		}
		
		return null;
	};

	// Validate Form Fields  
	const validateField = (field: any, value: any) => {
		const errors: string[] = [];
	  
		//String Validation
		if (!(field?.type === 'checkbox' || field?.type === 'radio')) {
			if (field?.validation?.required && value?.trim() === '') {
				errors.push('This field is required');
			}
		}

		// Text Input Length Validation
		if (field?.type === 'short_text' || field?.type === 'long_text') {
			if (field?.validation?.minimum && value?.length < parseInt(field.validation.minimum)) {
				errors.push(`Minimum length is ${field.validation.minimum}`);
			}
			if (field?.validation?.maximum && value?.length > parseInt(field.validation.maximum)) {
				errors.push(`Maximum length is ${field.validation.maximum}`);
			}
		}

		// DateTime Validation
		if (value && (field?.type === 'date' || field?.type === 'date_time')) {
			const currentDate = new Date();
    		const valueDate = new Date(value);

			if (field?.validation?.minimum) {
				const minimumDate = new Date();
				minimumDate.setFullYear(currentDate.getFullYear() - parseInt(field?.validation?.minimum));
				if (valueDate < minimumDate) {
				  errors.push(`Date can't be ${field?.validation?.minimum}`);
				}
			}
			if (field?.validation?.maximum) {
				const maximumDate = new Date();
				maximumDate.setFullYear(currentDate.getFullYear() - parseInt(field?.validation?.maximum));
				if (valueDate > maximumDate) {
				  errors.push(`Date must be ${field?.validation?.maximum}`);
				}
			}
		}

		//Time Validation
		if (value && field?.type === 'time') {
			const currentTime = new Date();
			const enteredTimeParts = value.split(':').map((part: string) => parseInt(part, 10));
			const enteredTime = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth(),
				currentTime.getDate(),
				enteredTimeParts[0],
				enteredTimeParts[1]
			);

			if (field?.validation?.minimum) {
				const minimumTime = new Date();
				minimumTime.setMinutes(currentTime.getMinutes() - parseInt(field?.validation?.minimum));
				if (enteredTime < minimumTime) {
					errors.push(`Time should be at least ${field?.validation?.minimum}`);
				}
			}
			if (field?.validation?.maximum) {
				const maximumTime = new Date();
				maximumTime.setHours(currentTime.getHours() + parseInt(field?.validation?.maximum));
				if (enteredTime > maximumTime) {
					errors.push(`Time should be at most ${field?.validation?.maximum}`);
				}
			}
		}

		// Integer/Number Validation
		if (value && (field?.type === 'integer' || field?.type === 'number')) {
			if (parseInt(value) < parseInt(field?.validation?.minimum)) {
				errors.push(`value shouldn't be less than ${field?.validation?.minimum}`);
			}
			if (parseInt(value) > parseInt(field?.validation?.maximum)) {
				errors.push(`value shouldn't be more than ${field?.validation?.maximum}`);
			}
		}

		//Email Validation
		if (value && field?.type === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				errors.push('Invalid email address');
			}
		}

		//Checkbox Validation
		if (field?.type === 'checkbox' || field?.type === 'radio') {
			if (field?.validation?.required && !value) {
				errors.push(`${field?.name} is required`);
			}
		}

		return errors;
	};

	const validateFiles = (field: any, value: FileList | null) => {
		const errors: string[] = [];

		// File Input Validation
		if (field?.type === 'upload' || field?.type === 'image' || field?.type === 'audio' || field?.type === 'video') {
			if (field?.validation?.required && !value?.length) {
			  	errors.push(`Please upload ${field?.name}`);
			}
		}

		if (field?.type === 'upload' && value?.length) {
			if (field?.validation?.maximum) {
				const maxSizeInBytes = parseInt(field?.validation?.maximum);
				if (value[0].size > (maxSizeInBytes) * 1024 * 1024) {
					errors.push(`File size exceeds the maximum limit of ${field?.validation?.maximum}`);
				}
			}
		}

		if (value?.length && (field?.type === 'audio' || field?.type === 'video')) {
			const duration = getMediaDuration(value[0])
			if (field?.validation?.minimum && duration < field?.validation?.minimum) {
				errors.push(`${field?.type} should be at least ${field?.validation?.minimum}`)
			}
			if (field?.validation?.maximum && duration > field?.validation?.maximum) {
				errors.push(`${field?.type} should be at most ${field?.validation?.maximum}`)
			}
		}

		return errors;
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name } = event.target;
		const fieldDefinition = getFieldDefinition(name);
		
		if (event.target.type === 'checkbox') {
			const checked = (event.target as HTMLInputElement).checked;

			const errors = validateField(fieldDefinition, checked);
			setFormValues((prevFormValues: any) => ({
				...prevFormValues,
				[name]: checked,
			}));

			setFormErrors((prevFormErrors: any) => ({
				...prevFormErrors,
				[name]: errors,
			}));
		} else if (event.target.type === 'file') {
			const files = (event.target as HTMLInputElement).files;
			const errors = validateFiles(fieldDefinition, files);
			setFormValues((prevFormValues: any) => ({
				...prevFormValues,
				[name]: files,
			}));

			setFormErrors((prevFormErrors: any) => ({
				...prevFormErrors,
				[name]: errors,
			}));
		} else {
			const value = event.target.value;
			const errors = validateField(fieldDefinition, value);

			setFormValues((prevFormValues: any) => ({
				...prevFormValues,
				[name]: value,
			}));

			setFormErrors((prevFormErrors: any) => ({
				...prevFormErrors,
				[name]: errors,
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
		
		if (hasErrors) {
			alert('Form has errors. Please fix them before submitting.');
			return;
		}

		console.log('Form submitted:', formValues);
		setOpenModal(true)
	};

	// Control page views
	const handleButtonClick = (action: ActionProps) => {
		const isFirstPage = currentPage === 0;
		const isLastPage = currentPage === formDefinition.pages.length - 1;

		if (!isFirstPage && action?.type === 'cancel') {
			setCurrentPage((prevPage) => prevPage - 1);
		}

		if (!isLastPage && action?.type === 'continue') {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	}

	// Render views
	const renderFormFields = (fields: any[]) => {
		return fields?.map((field: any) => {
			const value = formValues[field?.name] || '';
			const errors = formErrors[field?.name] || [];

			switch (field?.type) {
				case 'short_text':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Input
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								value={value}
								onChange={handleInputChange}
								error={errors.length > 0 ? errors[0] : ''}
								required={field?.validation?.required}
							/>
						</div>
					);

				case 'date_time':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Input
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								value={value}
								onChange={handleInputChange}
								type='datetime-local'
								error={errors.length > 0 ? errors[0] : ''}
								required={field?.validation?.required}
							/>
						</div>
					);

				case 'phone':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Input
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								value={value}
								onChange={handleInputChange}
								type='tel'
								error={errors.length > 0 ? errors[0] : ''}
								required={field?.validation?.required}
							/>
						</div>
					);

				case 'integer':
				case 'number':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Input
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								value={value}
								onChange={handleInputChange}
								type='number'
								error={errors.length > 0 ? errors[0] : ''}
								required={field?.validation?.required}
							/>
						</div>
					);

				case 'date':
				case 'time':
				case 'email':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Input
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								value={value}
								onChange={handleInputChange}
								type={field?.type}
								error={errors.length > 0 ? errors[0] : ''}
								required={field?.validation?.required}
							/>
						</div>
					);

				case 'long_text':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Textarea
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
								name={field?.name}
								id={field?.id}
								value={value}
								onChange={handleInputChange}
								rows={field?.validation?.number_of_lines || 4}
								error={errors.length > 0 ? errors[0] : ''}
								required={field?.validation?.required}
							/>
						</div>
					);

				case 'checkbox':
				case 'radio':
					return (
						<div
							className='dynamic-form__page__section--input'
							key={field?.label}
						>
							<Label
								id={field?.id}
								label={field?.validation?.required ? `${field?.label}*` : field?.label}
								description={field?.description}
							/>
							{
								field?.options?.map((option: OptionProps) => {
									return (
										<CheckboxRadio
											key={option?.id}
											name={field?.name}
											id={option?.id}
											label={option?.label}
											onChange={handleInputChange}
											type={field?.type}
											checked={value === option?.id || value === true}
										/>
									)
								})
							}
							{errors.length > 0 && <p className='input__error'>{errors[0]}</p>}
						</div>
					);

				case 'label':
					return (
						<div
							key={field?.label}
							className='dynamic-form__page__section--input'
						>
							<Label
								key={field?.label}
								id={field?.id}
								label={field?.name}
								description={field?.description}
							/>
						</div>
					)

					case 'dropdown':
						return (
							<div
								key={field?.label}
								className='dynamic-form__page__section--input'
							>
								<Select
									label={field?.validation?.required ? `${field?.label}*` : field?.label}
									description={field?.description}
									name={field?.name}
									id={field?.id}
									options={field?.options}
									value={value}
									onChange={handleInputChange}
									error={errors.length > 0 ? errors[0] : ''}
									required={field?.validation?.required}
								/>
							</div>
						);
					
					case 'upload':
						return (
							<div
								key={field?.label}
								className='dynamic-form__page__section--input'
							>
								<FileInput
									key={field?.label}
									label={field?.validation?.required ? `${field?.label}*` : field?.label}
									description={field?.description}
									name={field?.name}
									id={field?.id}
									onChange={handleInputChange}
									file={formValues[field?.name] || []}
									accept={appendFullStop(field?.validation?.allowed)}
									handleRemove={() => handleRemoveFile(field?.name)}
									error={errors.length > 0 ? errors[0] : ''}
									required={field?.validation?.required}
								/>
							</div>
						);

					case 'image':
					case 'audio':
					case 'video':
						return (
							<div
								key={field?.label}
								className='dynamic-form__page__section--input'
							>
								<FileInput
									key={field?.label}
									label={field?.validation?.required ? `${field?.label}*` : field?.label}
									description={field?.description}
									name={field?.name}
									id={field?.id}
									onChange={handleInputChange}
									file={formValues[field?.name] || []}
									accept={`${field.type}/*`}
									handleRemove={() => handleRemoveFile(field?.name)}
									error={errors.length > 0 ? errors[0] : ''}
									required={field?.validation?.required}
								/>
							</div>
						);

				default:
					return null;
			}
		});
	};

	const renderSections = (sections: any[]) => {
		return sections.map((section: any) => {
			return (
				<div className='dynamic-form__page__section' key={section.name}>
					<div className='dynamic-form__page__section--header'>
						<h2>{section.name}:</h2>
						<p>{section.description}</p>
					</div>
					{renderFormFields(section.fields)}
				</div>
			);
		});
	};

	const renderPages = (page: any) => {
		return (
			<div className='dynamic-form__page' key={page.name}>
				<div className='dynamic-form__page--header'>
					<h2 style={{ fontSize: '1.75rem'}}>{page.title}</h2>
					<p>{page.description}</p>
				</div>
				{renderSections(page.sections)}
			</div>
		);
	};

	const renderActions = (actions: ActionProps[]) => {
		return (
			<div className='actions'>
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
			<Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
				{Object.entries(formValues).map(([key, value]) => (
					<div style={{ display: 'flex', alignItems: 'center', margin: '0.25rem 0' }} key={key}>
						<span>{key}: </span>
						<span style={{ fontWeight: 'medium', marginLeft: '0.25rem' }}>{String(value)}</span>
					</div>
				))}
			</Modal>
		</div>
	);
}

export default DynamicForm;