import { useState, type MouseEvent } from 'react';
import './Folder.css';

interface FolderProps {
  color?: string;
  size?: number;
  items?: (React.ReactNode | null)[];
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  maxItems?: number;
  spreadDirection?: 'center' | 'left' | 'right';
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  isOpen = false,
  onToggle,
  maxItems = 4,
  spreadDirection = 'center'
}: FolderProps) => {
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = darkenColor('#ffffff', 0.02);
  const paper4 = '#ffffff';

  const handleClick = () => {
    if (onToggle) {
      onToggle();
    }

    // Reset offsets when closing (or whenever toggled, though resetting on open is also fine)
    if (isOpen) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (!isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (_e: MouseEvent<HTMLDivElement>, index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
    '--paper-4': paper4
  } as React.CSSProperties;

  const folderClassName = `folder ${isOpen ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  // Calculate the scaled dimensions to reserve layout space
  const baseWidth = 120;
  const baseHeight = 80;
  const scaledWidth = baseWidth * size;
  const scaledHeight = baseHeight * size;

  return (
    <div
      className={className}
      style={{
        width: scaledWidth,
        height: scaledHeight,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={scaleStyle}>
        <div className={folderClassName} style={folderStyle} onClick={handleClick}>
          <div className="folder__back">
            {papers.map((item, i) => (
              <div
                key={i}
                className={`paper paper-${i + 1}`}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                style={
                  isOpen
                    ? ({
                      '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
                      '--magnet-y': `${paperOffsets[i]?.y || 0}px`,
                      '--tx': `${spreadDirection === 'left' ? ((-i) * 110) - 50 :
                        spreadDirection === 'right' ? ((i) * 110) - 50 :
                          ((i - (maxItems - 1) / 2) * 110) - 50
                        }%`,
                      '--rot': '0deg',
                      bottom: '120%'
                    } as React.CSSProperties)
                    : {}
                }
              >
                {item}
              </div>
            ))}
            <div className="folder__front"></div>
            <div className="folder__front right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
