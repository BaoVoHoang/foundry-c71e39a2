'use client'

import React, { useState } from 'react'
import Display from './Display'
import Button from './Button'

export default function Calculator() {
  const [currentDisplay, setCurrentDisplay] = useState<string>('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false)

  const handleDigit = (digit: string) => {
    // If display shows error, only clear button works
    if (currentDisplay === 'Error') {
      return
    }

    // If waiting for operand or display is 0 (initial state), replace display
    if (waitingForOperand || currentDisplay === '0') {
      setCurrentDisplay(digit)
      setWaitingForOperand(false)
      return
    }

    // Enforce single decimal point
    if (digit === '.') {
      if (currentDisplay.includes('.')) {
        return
      }
      setCurrentDisplay(currentDisplay + digit)
      return
    }

    // Append digit to display
    setCurrentDisplay(currentDisplay + digit)
  }

  const handleOperation = (op: string) => {
    // If display shows error, disable further operations
    if (currentDisplay === 'Error') {
      return
    }

    const inputValue = parseFloat(currentDisplay)

    // If there's a pending operation, evaluate it first (chaining)
    if (operation !== null && previousValue !== null && !waitingForOperand) {
      const result = performCalculation(previousValue, inputValue, operation)
      if (result === null) {
        // Division by zero
        setCurrentDisplay('Error')
        setOperation(null)
        setPreviousValue(null)
        setWaitingForOperand(true)
        return
      }
      setCurrentDisplay(result.toFixed(2))
      setPreviousValue(result)
    } else {
      // No pending operation, just store the current input
      setPreviousValue(inputValue)
    }

    // Store the new operation and set waiting for operand
    setOperation(op)
    setWaitingForOperand(true)
  }

  const performCalculation = (prev: number, current: number, op: string): number | null => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        if (current === 0) {
          return null // Division by zero
        }
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    // If display shows error, do nothing
    if (currentDisplay === 'Error') {
      return
    }

    // If no pending operation, do nothing
    if (operation === null || previousValue === null) {
      return
    }

    const inputValue = parseFloat(currentDisplay)
    const result = performCalculation(previousValue, inputValue, operation)

    if (result === null) {
      // Division by zero
      setCurrentDisplay('Error')
      setOperation(null)
      setPreviousValue(null)
      setWaitingForOperand(true)
      return
    }

    // Apply toFixed(2) and display result
    const displayResult = result.toFixed(2)
    setCurrentDisplay(displayResult)
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }

  const handleClear = () => {
    setCurrentDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
      <Display value={currentDisplay} />
      <div className="mt-6 grid grid-cols-4 gap-2">
        {/* Row 1: Clear, and operators */}
        <Button label="C" onClick={handleClear} variant="action" />
        <Button label="/" onClick={() => handleOperation('/')} variant="operator" />
        <Button label="*" onClick={() => handleOperation('*')} variant="operator" />
        <Button label="-" onClick={() => handleOperation('-')} variant="operator" />

        {/* Row 2: 7, 8, 9, + */}
        <Button label="7" onClick={() => handleDigit('7')} variant="number" />
        <Button label="8" onClick={() => handleDigit('8')} variant="number" />
        <Button label="9" onClick={() => handleDigit('9')} variant="number" />
        <Button label="+" onClick={() => handleOperation('+')} variant="operator" />

        {/* Row 3: 4, 5, 6 */}
        <Button label="4" onClick={() => handleDigit('4')} variant="number" />
        <Button label="5" onClick={() => handleDigit('5')} variant="number" />
        <Button label="6" onClick={() => handleDigit('6')} variant="number" />

        {/* Row 4: 1, 2, 3, = (spans 1 row) */}
        <Button label="1" onClick={() => handleDigit('1')} variant="number" />
        <Button label="2" onClick={() => handleDigit('2')} variant="number" />
        <Button label="3" onClick={() => handleDigit('3')} variant="number" />
        <Button label="=" onClick={handleEquals} variant="operator" />

        {/* Row 5: 0, . */}
        <div className="col-span-2">
          <Button label="0" onClick={() => handleDigit('0')} variant="number" />
        </div>
        <Button label="." onClick={() => handleDigit('.')} variant="number" />
      </div>
    </div>
  )
}