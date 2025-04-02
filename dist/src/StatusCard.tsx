import React from 'react';
import { Printer, Pause, Play, Square, AlertTriangle, Clock, Layers } from 'lucide-react';
import type { PrinterStatus } from '../types';

interface Props {
  status: PrinterStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function StatusCard({ status, onStart, onPause, onStop }: Props) {
  const getStatusColor = () => {
    switch (status.status) {
      case 'printing': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'complete': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status.status) {
      case 'printing': return <Printer className="w-6 h-6" />;
      case 'paused': return <Pause className="w-6 h-6" />;
      case 'error': return <AlertTriangle className="w-6 h-6" />;
      case 'complete': return <Square className="w-6 h-6" />;
      default: return <Printer className="w-6 h-6" />;
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={getStatusColor()}>{getStatusIcon()}</span>
          <h2 className="text-xl font-semibold capitalize">{status.status}</h2>
        </div>
        <div className="flex space-x-2">
          {status.status === 'idle' || status.status === 'complete' ? (
            <button
              onClick={onStart}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={onPause}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                disabled={status.status === 'complete'}
              >
                {status.status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={onStop}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                disabled={status.status === 'complete'}
              >
                <Square className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {status.fileName && (
        <>
          <div className="mb-4">
            <p className="text-gray-600">Printing: {status.fileName}</p>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${status.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">{status.progress.toFixed(1)}% Complete</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {formatTime(status.elapsedTime || 0)} / {formatTime(status.estimatedTime || 0)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Layers className="w-4 h-4" />
              <span>
                Layer {status.layerInfo?.current} / {status.layerInfo?.total}
              </span>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Hotend Temperature</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{status.temperatures.hotend.toFixed(1)}°C</span>
            <span className="text-sm text-gray-500 ml-2">/ {status.temperatures.target.hotend}°C</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Bed Temperature</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{status.temperatures.bed.toFixed(1)}°C</span>
            <span className="text-sm text-gray-500 ml-2">/ {status.temperatures.target.bed}°C</span>
          </div>
        </div>
      </div>

      {status.materialUsage && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Material Usage</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{status.materialUsage.used.toFixed(1)}g</span>
            <span className="text-sm text-gray-500 ml-2">/ {status.materialUsage.total}g</span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(status.materialUsage.used / status.materialUsage.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}