import React, { InputHTMLAttributes, forwardRef, ForwardedRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import classnames from 'classnames'
import Button from '../Button';
import Label from '../Label';

type FileAcceptFormats = '.doc,.docx,.pdf' | 'image/*' | 'audio/*' | 'video/*';

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label: string
    description?: string
    file?: FileList
    name: string
    id?: string
    type?: string
    accept?: FileAcceptFormats | any
    error?: string
    onChange?: (...args: any[]) => void
    handleRemove?: () => void; 
}

const FileInput: React.FC<FileInputProps> = forwardRef(({
    className,
    label,
    description,
    file,
    name,
    id,
    type = 'file',
    accept = '.doc,.docx,.pdf',
    error,
    onChange,
    handleRemove,
    ...rest
}, ref: ForwardedRef<HTMLInputElement>) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        }
        return null
    }

    return (
        <div className={classnames(className, 'file-input')}>
            {label && <Label label={label} description={description} />}
            <label
                htmlFor={name}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type={type}
                    accept={accept}
                    id={id}
                    name={name}
                    onChange={handleOnChange}
                    ref={mergeRefs([ref, fileInputRef])}
                    {...rest}
                />
                {!file || file?.length === 0 ? (
                    <div>Click to upload a file</div>
                ) : (
                    <div className="image-preview">{file?.[0]?.name}</div>
                )}
            </label>
            {
                (file && file?.length > 0) &&
                <Button
                    variant='link'
                    onClick={handleRemove}
                >
                    Remove
                </Button>
            }
            {error && <p className='input__error'>{error}</p>}
        </div>
    )
})

export default FileInput