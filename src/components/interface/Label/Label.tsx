import React from 'react'

interface LabelProps {
    id?: string
    label: string
    description?: string
}

const Label: React.FC<LabelProps> = ({id, label, description}) => {
  return (
    <div className='label' key={id}>
        <h3>{label}</h3>
        <p>{description}</p>
    </div>
  )
}

export default Label