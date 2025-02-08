import { DrawingMode } from './types/types';

type ToolbarProps = {
  drawingMode: DrawingMode;
  setDrawingMode: (mode: DrawingMode) => void;
};

export const Toolbar = ({ drawingMode, setDrawingMode }: ToolbarProps) => (
  <div className="absolute z-10 p-2 bg-white flex gap-2">
    <button
    onClick={() => setDrawingMode(drawingMode === 'diamond' ? null : 'diamond')}
    className={`px-4 py-2 ${drawingMode === 'diamond' ? 'bg-blue-200' : ''}`}
    >
      Kite
    </button>
    <button
      onClick={() => setDrawingMode(drawingMode === 'rect' ? null : 'rect')}
      className={`px-4 py-2 ${drawingMode === 'rect' ? 'bg-blue-200' : ''}`}
    >
      Rectangle
    </button>
    <button
      onClick={() => setDrawingMode(drawingMode === 'circle' ? null : 'circle')}
      className={`px-4 py-2 ${drawingMode === 'circle' ? 'bg-blue-200' : ''}`}
    >
      Circle
    </button>
    <button
      onClick={() => setDrawingMode(drawingMode === 'ellipse' ? null : 'ellipse')}
      className={`px-4 py-2 ${drawingMode === 'ellipse' ? 'bg-blue-200' : ''}`}
    >
      Ellipse
    </button>
  </div>
);