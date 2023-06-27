import React, { InputHTMLAttributes, forwardRef, ForwardedRef, useRef }  from 'react';
import { mergeRefs } from 'react-merge-refs';
import classnames from 'classnames';

interface CheckboxRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label: string
    type?: 'checkbox' | 'radio'
    id?: string
    name: string
    checked?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckboxRadio: React.FC<CheckboxRadioProps> = forwardRef(({
    className,
    label,
    type = 'checkbox',
    id,
    name,
    checked,
    onChange,
    ...rest
}, ref: ForwardedRef<HTMLInputElement>) => {
    const checkboxRadioRef = useRef<HTMLInputElement>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        }
        return null
    }

  return (
    <div className={classnames('checkbox-radio', className)}>
        <input
            type={type}
            className='checkbox-radio__input'
            id={id}
            name={name}
            ref={mergeRefs([ref, checkboxRadioRef])}
            checked={checked}
            onChange={handleOnChange}
        />
        {
            label &&
            <label
                className='checkbox-radio__label'
                htmlFor={id}
            >
                {label}
            </label>
        }
    </div>
  );
});

export default CheckboxRadio;
