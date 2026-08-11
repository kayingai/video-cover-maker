import React from 'react';
import { cn } from '../CoverEditor';

const get3DShadow = (depth: number, color: string) => {
  const shadow = [];
  for (let i = 1; i <= depth; i++) {
    shadow.push(`${i}px ${i}px 0px ${color}`);
  }
  return shadow.join(', ');
};

interface TextOverlayProps {
  text: string;
  styleId: string;
  fontSize: number;
  color: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: 'left' | 'center' | 'right';
  strokeColor?: string;
  strokeWidth?: number;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({ 
  text, styleId, fontSize, color,
  fontFamily = 'sans-serif',
  fontWeight = '900',
  fontStyle = 'normal',
  textDecoration = 'none',
  textAlign = 'center',
  strokeColor = 'transparent',
  strokeWidth = 0
}) => {
  const lines = text.split('\n');
  
  const baseStyle: React.CSSProperties = {
    fontFamily,
    fontWeight,
    fontStyle,
    textDecoration,
    textAlign,
    WebkitTextStroke: strokeWidth > 0 ? `${strokeWidth}px ${strokeColor}` : undefined,
  };

  switch (styleId) {
    case 'orange-3d':
      return (
        <div 
          className="bg-[#FF5A1F]" 
          style={{ 
            ...baseStyle,
            padding: '0.3em 0.5em',
            boxShadow: get3DShadow(Math.round(fontSize * 0.35), '#C83D0E'),
            color: color,
            fontSize: `${fontSize}px`,
            lineHeight: '1.3',
            letterSpacing: '0.05em'
          }}
        >
          {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
        </div>
      );
    case 'black-quote':
      return (
        <div 
          className="bg-[#2A2A2A] relative inline-block"
          style={{ ...baseStyle, padding: '0.4em 0.6em', color, fontSize: `${fontSize}px`, lineHeight: '1.3', borderRadius: '0.1em' }}
        >
          <div className="absolute flex gap-[0.1em]" style={{ top: '-0.15em', right: '-0.15em' }}>
            <div className="bg-[#FFD700] rounded-full rotate-[30deg]" style={{ width: '0.15em', height: '0.4em' }}></div>
            <div className="bg-[#FFD700] rounded-full rotate-[30deg]" style={{ width: '0.15em', height: '0.4em' }}></div>
          </div>
          <div className="absolute flex gap-[0.1em]" style={{ bottom: '-0.15em', left: '-0.15em' }}>
            <div className="bg-[#FFD700] rounded-full rotate-[30deg]" style={{ width: '0.15em', height: '0.4em' }}></div>
            <div className="bg-[#FFD700] rounded-full rotate-[30deg]" style={{ width: '0.15em', height: '0.4em' }}></div>
          </div>
          {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
        </div>
      );
    case 'purple-yellow':
      return (
        <div 
          className="bg-[#6366F1] inline-block"
          style={{ 
            ...baseStyle,
            padding: '0.4em 0.6em', 
            color, 
            fontSize: `${fontSize}px`, 
            lineHeight: '1.3',
            boxShadow: '0.4em -0.4em 0px #FFD700'
          }}
        >
          {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
        </div>
      );
    case 'underline':
      return (
        <div 
          style={{ ...baseStyle, color, fontSize: `${fontSize}px`, lineHeight: '1.4' }}
        >
          {lines.map((line: string, i: number) => (
            <div key={i} className="inline-block border-[#FFF066]" style={{ borderBottomWidth: '0.12em', paddingBottom: '0.05em', marginBottom: '0.1em' }}>
              {line}
            </div>
          ))}
        </div>
      );
    case 'blue-glow':
      return (
        <div 
          className={cn("flex flex-col", textAlign === 'left' ? 'items-start' : textAlign === 'right' ? 'items-end' : 'items-center')}
          style={{ ...baseStyle, color, fontSize: `${fontSize}px`, lineHeight: '1.2' }}
        >
          <div style={{ textShadow: `0 0 0.2em rgba(59, 130, 246, 0.8), 0 0 0.4em rgba(59, 130, 246, 0.8)` }}>
            {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
          </div>
          <div 
            className="font-bold italic mt-[0.2em]" 
            style={{ fontSize: '0.3em', color: '#60A5FA', letterSpacing: '0.05em' }}
          >
            Have A Nice Day
          </div>
        </div>
      );
    case 'brackets':
      return (
        <div 
          className="relative flex items-stretch"
          style={{ ...baseStyle, color, fontSize: `${fontSize}px`, lineHeight: '1.3' }}
        >
          <div className="leading-none" style={{ fontSize: '1.1em', transform: 'translateY(-0.1em)' }}>「</div>
          <div style={{ padding: '0 0.1em' }}>
            {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
          </div>
          <div className="leading-none self-end" style={{ fontSize: '1.1em', transform: 'translateY(0.1em)' }}>」</div>
        </div>
      );
    case 'gold-news-title':
      return (
        <div
          style={{
            ...baseStyle,
            color: '#FFD700',
            fontSize: `${fontSize}px`,
            lineHeight: '1.25',
            letterSpacing: '0.04em',
            textAlign: 'center',
            filter: 'drop-shadow(0.04em 0.04em 0px rgba(0,0,0,0.9)) drop-shadow(0.06em 0.06em 0px rgba(0,0,0,0.7))',
            padding: '0.1em 0.15em',
          }}
        >
          {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
        </div>
      );
    case 'red-emphasis-subtitle':
      return (
        <div
          style={{
            ...baseStyle,
            color: '#FF1A1A',
            fontSize: `${fontSize}px`,
            lineHeight: '1.25',
            letterSpacing: '0.02em',
            textAlign: 'center',
            filter: 'drop-shadow(0.04em 0.04em 0px rgba(0,0,0,0.9)) drop-shadow(0.06em 0.06em 0px rgba(0,0,0,0.7))',
            padding: '0.1em 0.15em',
          }}
        >
          {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
        </div>
      );
    default:
      return (
        <div 
          style={{ ...baseStyle, color, fontSize: `${fontSize}px`, lineHeight: '1.3' }}
        >
          {lines.map((line: string, i: number) => <div key={i}>{line}</div>)}
        </div>
      );
  }
};
