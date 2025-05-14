import React from 'react';

interface ChartControlsProps {
  timeframe: string;
  chartType: string;
  interval: string;
  onTimeframeChange: (value: string) => void;
  onChartTypeChange: (value: string) => void;
  onIntervalChange: (value: string) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  timeframe,
  chartType,
  interval,
  onTimeframeChange,
  onChartTypeChange,
  onIntervalChange,
}) => {
  return (
    <div className="flex gap-4 p-2 bg-gray-100 rounded">
      <label htmlFor="timeframe-select" className="sr-only">
        Timeframe
      </label>
      <select
        id="timeframe-select"
        value={timeframe}
        onChange={(e) => onTimeframeChange(e.target.value)}
        className="p-1 border rounded"
      >
        <option value="1D">1 Day</option>
        <option value="5D">5 Days</option>
        <option value="1M">1 Month</option>
        <option value="3M">3 Months</option>
        <option value="6M">6 Months</option>
        <option value="1Y">1 Year</option>
        <option value="5Y">5 Years</option>
      </select>

      <label htmlFor="charttype-select" className="sr-only">
        Chart Type
      </label>
      <select
        id="charttype-select"
        value={chartType}
        onChange={(e) => onChartTypeChange(e.target.value)}
        className="p-1 border rounded"
      >
        <option value="line">Line</option>
        <option value="area">Area</option>
        <option value="candlestick">Candlestick</option>
      </select>

      <label htmlFor="interval-select" className="sr-only">
        Interval
      </label>
      <select
        id="interval-select"
        value={interval}
        onChange={(e) => onIntervalChange(e.target.value)}
        className="p-1 border rounded"
      >
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
    </div>
  );
};

export default ChartControls;
