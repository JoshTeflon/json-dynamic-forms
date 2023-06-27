import React, { ForwardedRef, SelectHTMLAttributes, forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import classnames from 'classnames'
import Label from '../Label';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: { id: string, label: string; value: string }[] | any
    placeholder?: string
    onChange?: (...args: any[]) => void
    className?: string
    label: string
    description?: string
    name: string
    id?: string
}

const Select: React.FC<SelectProps> = forwardRef(({
    options,
    placeholder,
    onChange,
    className,
    label,
    description,
    name,
    id,
    ...rest
    }, ref: ForwardedRef<HTMLSelectElement>) => {
    const selectRef = useRef<HTMLSelectElement>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(onChange) {
            onChange(e)
        }
        return null
    }

    return (
        <label
            htmlFor={name}
            className={classnames('select', className)}
        >
            {label && <Label label={label} description={description} />}
            <select
                id={id}
                name={name}
                onChange={handleOnChange}
                ref={mergeRefs([ref, selectRef])}
                // multiple
                {...rest}
            >
                {
                    placeholder &&
                    <option className='placeholder' value=''>
                        { placeholder }
                    </option>
                }
                {options?.map((option: { id: string, label: string; value: string } | any) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
});

export default Select