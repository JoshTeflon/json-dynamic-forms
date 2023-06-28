import React, { TextareaHTMLAttributes, forwardRef, ForwardedRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import classnames from 'classnames'
import Label from '../Label'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  placeholder?: string
  type?: string
  id?: string
  label: string
  description?: string
  name: string
  value: string
  error?: string
  rows?: number
  onChange?: (...args: any[]) => void
}

const Textarea: React.FC<TextareaProps> = forwardRef((props, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const {
    className,
    placeholder,
    type,
    id,
    label,
    description,
    name,
    value,
    error,
    rows = 4,
    onChange,
    ...rest
  } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e)
    }
    return null
  }

  return (
    <label
      className={classnames('textarea', className)}
      htmlFor={name}
    >
        {label && <Label label={label} description={description} />}
        <textarea
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
            rows={rows}
            ref={mergeRefs([ref, textareaRef])}
            onChange={handleOnChange}
            {...rest}
        />
        {error && <p className='input__error'>{error}</p>}
    </label>
  )
})

export default Textarea
