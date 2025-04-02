import React from 'react';
import { Clock, Printer, CheckCircle, XCircle, Weight } from 'lucide-react';
import type { PrintStats } from '../types';

interface Props {
  stats: PrintStats;
}

export function PrintStats({ stats }: Props) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Print Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Printer className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Prints</p>
            <p className="text-xl font-bold">{stats.totalPrints}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Successful</p>
            <p className="text-xl font-bold">{stats.successfulPrints}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <XCircle className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Failed</p>
            <p className="text-xl font-bold">{stats.failedPrints}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Total Time</p>
            <p className="text-xl font-bold">{formatTime(stats.totalPrintTime)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Weight className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Material Used</p>
            <p className="text-xl font-bold">{(stats.materialUsed / 1000).toFixed(2)}kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
