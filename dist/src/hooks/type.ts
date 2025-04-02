export interface PrinterStatus {
  status: 'idle' | 'printing' | 'paused' | 'complete' | 'error';
  progress: number;
  fileName?: string;
  timeRemaining?: number;
  temperatures: {
    hotend: number;
    bed: number;
    target: {
      hotend: number;
      bed: number;
    };
  };
  estimatedTime?: number;
  elapsedTime?: number;
  materialUsage?: {
    total: number;
    used: number;
  };
  layerInfo?: {
    current: number;
    total: number;
    height: number;
  };
}

export interface TemperatureDataPoint {
  time: number;
  hotend: number;
  bed: number;
}

export interface PrintStats {
  totalPrints: number;
  successfulPrints: number;
  failedPrints: number;
  totalPrintTime: number;
  materialUsed: number;
}
