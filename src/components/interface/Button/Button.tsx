import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classnames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    variant?: 'primary' | 'outlined' | 'naked' | 'link'
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean | any
    size?: 'base' | 'lg'
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, className, variant = 'primary', type = 'button', disabled, size = 'base', ...rest } = props

    const buttonStyles = `${variant} ${variant !== 'naked' && variant !== 'link' ? size : ''}`

    return (
        <button
            className={classnames(className, buttonStyles)}
            type={type}
            disabled={disabled}
            {...rest}
        >
            { children}
        </button>
    )
}

export default Button;