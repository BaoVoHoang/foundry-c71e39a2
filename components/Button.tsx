'use client'

import React from 'react'

export type ButtonVariant = 'number' | 'operator' | 'action'

export interface ButtonProps {
  label: string
  onClick: () => void
  variant?: ButtonVariant
}

export default function Button({ label, onClick, variant = 'number' }: ButtonProps): React.ReactElement {
  const getVariantClasses = (variant: ButtonVariant): string => {
    switch (variant) {
      case 'number':
        return 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900'
      case 'operator':
        return 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white'
      case 'action':
        return 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
      default:
        return 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900'
    }
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-20
        text-lg font-semibold
        rounded
        border-none
        cursor-pointer
        transition-colors duration-150
        ${getVariantClasses(variant)}
      `}
    >
      {label}
    </button>
  )
}
