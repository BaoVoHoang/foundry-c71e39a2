'use client'

export interface DisplayProps {
  value: string
}

export default function Display({ value }: DisplayProps) {
  return (
    <div className="w-full rounded bg-gray-800 p-4 text-right text-4xl font-bold text-white">
      {value}
    </div>
  )
}