'use client';

import { useState } from 'react';

export default function FuturisticCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'default' 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: 'default' | 'operator' | 'equals' | 'clear';
  }) => {
    const baseClasses = "relative overflow-hidden rounded-xl font-medium text-lg transition-all duration-200 active:scale-95 hover:scale-105";
    
    const variantClasses = {
      default: "bg-gradient-to-b from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border border-slate-600 shadow-lg hover:shadow-cyan-500/20",
      operator: "bg-gradient-to-b from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white border border-cyan-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40",
      equals: "bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white border border-emerald-400 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40",
      clear: "bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white border border-red-400 shadow-lg shadow-red-500/30 hover:shadow-red-400/40"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none" />
        <span className="relative z-10">{children}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700/50 max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text">
            NEXUS CALC
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mt-2" />
        </div>

        {/* Display */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-6 mb-6 border border-slate-600/50 shadow-inner">
          <div className="text-right">
            <div className="text-4xl font-mono text-white font-light tracking-wider break-all">
              {display}
            </div>
            {operation && (
              <div className="text-sm text-cyan-400 mt-1 opacity-70">
                {previousValue} {operation}
              </div>
            )}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="clear" className="col-span-2 h-14">
            CLEAR
          </Button>
          <Button onClick={clearEntry} variant="clear" className="h-14">
            CE
          </Button>
          <Button onClick={() => inputOperation('÷')} variant="operator" className="h-14">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber('7')} className="h-14">7</Button>
          <Button onClick={() => inputNumber('8')} className="h-14">8</Button>
          <Button onClick={() => inputNumber('9')} className="h-14">9</Button>
          <Button onClick={() => inputOperation('×')} variant="operator" className="h-14">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber('4')} className="h-14">4</Button>
          <Button onClick={() => inputNumber('5')} className="h-14">5</Button>
          <Button onClick={() => inputNumber('6')} className="h-14">6</Button>
          <Button onClick={() => inputOperation('-')} variant="operator" className="h-14">
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber('1')} className="h-14">1</Button>
          <Button onClick={() => inputNumber('2')} className="h-14">2</Button>
          <Button onClick={() => inputNumber('3')} className="h-14">3</Button>
          <Button onClick={() => inputOperation('+')} variant="operator" className="h-14">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber('0')} className="col-span-2 h-14">
            0
          </Button>
          <Button onClick={inputDecimal} className="h-14">.</Button>
          <Button onClick={performCalculation} variant="equals" className="h-14">
            =
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>QUANTUM PRECISION</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

