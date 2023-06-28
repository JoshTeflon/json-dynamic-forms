import React, { InputHTMLAttributes, forwardRef, ForwardedRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import classnames from 'classnames'
import Label from '../Label/Label';

type InputTypes = 'text' | 'date' | 'datetime-local' | 'time' | 'number' | 'email' | 'tel' | 'url';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
  type?: InputTypes
  id?: string
  label: string
  description?: string
  name: string
  value: string
  error?: string
  onChange?: (...args: any[]) => void
}

const Input: React.FC<InputProps> = forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    className,
    placeholder,
    type = 'text',
    id,
    label,
    description,
    name,
    value,
    error,
    onChange,
    ...rest
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    return null
  }

  return (
    <label
      className={classnames('input', className)}
      htmlFor={name}
    >
        {label && <Label label={label} description={description} />}
        <input
            placeholder={placeholder}
            type={type}
            id={id}
            name={name}
            value={value}
            ref={mergeRefs([ref, inputRef])}
            onChange={handleOnChange}
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
        />
        {error && <p className='input__error'>{error}</p>}
    </label>
  )
})

export default Input
