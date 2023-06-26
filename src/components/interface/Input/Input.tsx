import React, { InputHTMLAttributes, ReactNode, forwardRef, useRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { mergeRefs } from 'react-merge-refs'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
  icon?: string | ReactNode
  type?: string
  border?: 'base' | 'lg'
  onChange?: (...args: any[]) => void
}

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  const {
    className,
    placeholder,
    icon = null,
    type,
    border = 'base',
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
    <label className={classnames('input', className, border)}>
        <input
            className={classnames({'icon-input': icon})}
            placeholder={placeholder}
            onChange={handleOnChange}
            type={type}
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            ref={mergeRefs([ref, inputRef])}
            {...rest}
        />
        {icon && (
          <span>
            {icon}
          </span>
        )}
    </label>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  type: PropTypes.string,
  border: PropTypes.oneOf(['base', 'lg']),
  onChange: PropTypes.func,
}

export default Input
