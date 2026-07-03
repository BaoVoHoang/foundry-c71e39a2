'use client'

interface DisplayProps {
  value: string
}

export default function Display({ value }: DisplayProps): JSX.Element {
  const isError = value === 'Error'

  return (
    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 mb-4 min-h-16 flex items-center justify-end overflow-hidden">
      <div
        className={`text-right font-mono font-bold ${
          isError ? 'text-red-600' : 'text-gray-900'
        }`}
        style={{
          fontSize: value.length > 12 ? `${Math.max(16, 32 - value.length * 1.5)}px` : '32px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}
      >
        {value}
      </div>
    </div>
  )
}
