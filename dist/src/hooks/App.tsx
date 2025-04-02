import React from 'react';
import { Printer } from 'lucide-react';
import { StatusCard } from './components/StatusCard';
import { TemperatureGraph } from './components/TemperatureGraph';
import { PrintStats } from './components/PrintStats';
import { usePrinterData } from './hooks/usePrinterData';

function App() {
  const { status, tempHistory, stats, startPrint, pausePrint, stopPrint } = usePrinterData();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Printer className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">3D Printer Dashboard</h1>
          </div>
        </div>
      </header>
