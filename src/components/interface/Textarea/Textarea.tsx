import React, { TextareaHTMLAttributes, forwardRef, ForwardedRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import classnames from 'classnames'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  placeholder?: string
  type?: string
  id?: string
  label: string
  name: string
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
    name,
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
        <span>{label}</span>
        <textarea
            placeholder={placeholder}
            id={id}
            name={name}
            rows={rows}
            ref={mergeRefs([ref, textareaRef])}
            onChange={handleOnChange}
            {...rest}
        />
    </label>
  )
})

export default Textarea
