import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { Upload, Download, Image as ImageIcon, Type, Palette, RotateCcw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { i18n, aspectRatios, TEXT_BG_STYLES, TextLayer, FONT_GROUPS } from '../constants/editor';
import { TextOverlay } from './editor/TextOverlay';
import { LayerListSidebar } from './ProjectHistorySidebar';

const BG_MIN_SCALE = 0.2;
const BG_MAX_SCALE = 5;

interface Project {
  id: string;
  name: string;
  updatedAt: number;
  thumbnail?: string;
  config: any;
}

const useVideoFrame = (videoUrl: string | null, time: number) => {
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!videoUrl) {
      setFrameUrl(null);
      setDuration(0);
      return;
    }
    
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      setDuration(video.duration);
      video.currentTime = time;
    });

    video.addEventListener('seeked', () => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setFrameUrl(canvas.toDataURL('image/jpeg', 0.8));
      }
    });

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      videoRef.current.currentTime = time;
    }
  }, [time]);

  return { frameUrl, duration };
};

const useVideoThumbnails = (videoUrl: string | null, count: number = 8) => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!videoUrl) {
      setThumbnails([]);
      return;
    }

    let isCancelled = false;
    setIsGenerating(true);

    const generate = async () => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.playsInline = true;

      await new Promise((resolve) => {
        video.addEventListener('loadedmetadata', resolve, { once: true });
        video.addEventListener('error', resolve, { once: true });
      });

      if (isCancelled || !video.duration) {
        setIsGenerating(false);
        return;
      }

      const duration = video.duration;
      const canvas = document.createElement('canvas');
      const aspect = video.videoWidth / video.videoHeight;
      canvas.height = 60;
      canvas.width = 60 * aspect;
      const ctx = canvas.getContext('2d');
      const thumbs: string[] = [];

      for (let i = 0; i < count; i++) {
        if (isCancelled) break;
        const time = (duration / count) * i + (duration / count) / 2;
        video.currentTime = time;
        await new Promise((resolve) => {
          video.addEventListener('seeked', resolve, { once: true });
        });
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbs.push(canvas.toDataURL('image/jpeg', 0.5));
        }
      }

      if (!isCancelled) {
        setThumbnails(thumbs);
        setIsGenerating(false);
      }
    };

    generate();

    return () => {
      isCancelled = true;
    };
  }, [videoUrl, count]);

  return { thumbnails, isGenerating };
};

export default function CoverEditor() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const t = i18n[lang];

  const [activeTab, setActiveTab] = useState<'background' | 'text' | 'style'>('background');
  
  const [bgType, setBgType] = useState<'color' | 'image' | 'video'>('color');
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoTime, setVideoTime] = useState(0);
  
  const { frameUrl, duration: videoDuration } = useVideoFrame(videoUrl, videoTime);
  const { thumbnails, isGenerating: isGeneratingThumbs } = useVideoThumbnails(videoUrl, 8);

  const [ratio, setRatio] = useState<keyof typeof aspectRatios>('16:9');

  const [layers, setLayers] = useState<TextLayer[]>([
    {
      id: '1',
      name: 'Text 1',
      text: i18n.en.defaultText,
      styleId: 'none',
      fontSize: 120,
      color: '#ffffff',
      fontFamily: 'sans-serif',
      fontWeight: '900',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      strokeColor: 'transparent',
      strokeWidth: 0,
      x: 0,
      y: 0,
    },
  ]);
  const [activeLayerId, setActiveLayerId] = useState<string>('1');

  const activeLayer = layers.find(l => l.id === activeLayerId) || layers[0];

  const updateLayer = (id: string, updates: Partial<TextLayer>) => {
    setLayers(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)));
  };

  const updateActiveLayer = (updates: Partial<TextLayer>) => {
    updateLayer(activeLayerId, updates);
  };

  const createDefaultLayer = (): TextLayer => ({
    id: Math.random().toString(36).substring(2, 9),
    name: `Text ${layers.length + 1}`,
    text: i18n[lang].defaultText,
    styleId: 'none',
    fontSize: 120,
    color: '#ffffff',
    fontFamily: 'sans-serif',
    fontWeight: '900',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'center',
    strokeColor: 'transparent',
    strokeWidth: 0,
    x: 0,
    y: 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const currentBgRef = useRef<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isSelected, setIsSelected] = useState(false);
  const [showVerticalGuide, setShowVerticalGuide] = useState(false);
  const [showHorizontalGuide, setShowHorizontalGuide] = useState(false);

  const [bgPosX, setBgPosX] = useState(50);
  const [bgPosY, setBgPosY] = useState(50);
  const [bgScale, setBgScale] = useState(1);
  const [bgTransformTick, setBgTransformTick] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('opencovermaker_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse projects', e);
      }
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem('opencovermaker_projects', JSON.stringify(newProjects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage (might be too large)', e);
    }
  };

  const handleSaveCurrentProject = async () => {
    if (!exportRef.current) return;
    
    let thumbnail = '';
    try {
      thumbnail = await toPng(exportRef.current, {
        quality: 0.1,
        pixelRatio: 0.1,
        cacheBust: true,
        // @ts-ignore
        useCORS: true,
      });
    } catch (e) {
      console.warn('Failed to generate thumbnail', e);
    }

    const config = {
      bgType, bgColor, bgImage, videoUrl, videoTime,
      ratio, layers, activeLayerId,
      bgPosX, bgPosY, bgScale,
    };

    const now = Date.now();
    let updatedProjects = [...projects];
    const projectName = activeLayer?.text.slice(0, 20) || 'Untitled';
    
    if (currentProjectId) {
      const idx = updatedProjects.findIndex(p => p.id === currentProjectId);
      if (idx !== -1) {
        updatedProjects[idx] = {
          ...updatedProjects[idx],
          updatedAt: now,
          config,
          thumbnail,
          name: projectName,
        };
      } else {
        const newProject = { id: currentProjectId, name: projectName, updatedAt: now, config, thumbnail };
        updatedProjects = [newProject, ...updatedProjects];
      }
    } else {
      const newId = Math.random().toString(36).substring(2, 9);
      setCurrentProjectId(newId);
      const newProject = { id: newId, name: projectName, updatedAt: now, config, thumbnail };
      updatedProjects = [newProject, ...updatedProjects];
    }
    
    saveProjects(updatedProjects);
  };

  // Auto-save debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSaveCurrentProject();
    }, 2000);
    return () => clearTimeout(timer);
  }, [bgType, bgColor, bgImage, videoUrl, videoTime, ratio, layers, activeLayerId, bgScale, bgTransformTick]);

  const handleLoadProject = (project: Project) => {
    setCurrentProjectId(project.id);
    const c = project.config || {};
    setBgType(c.bgType || 'color');
    setBgColor(c.bgColor || '#1a1a1a');
    setBgImage(c.bgImage || null);
    setVideoUrl(c.videoUrl || null);
    setVideoTime(c.videoTime || 0);
    setRatio(c.ratio || '16:9');
    setBgPosX(c.bgPosX ?? 50);
    setBgPosY(c.bgPosY ?? 50);
    setBgScale(c.bgScale ?? 1);

    if (c.layers && Array.isArray(c.layers) && c.layers.length > 0) {
      setLayers(c.layers);
      setActiveLayerId(c.activeLayerId || c.layers[0].id);
    } else {
      const fallbackLayer: TextLayer = {
        id: '1',
        name: 'Text 1',
        text: c.text || '',
        styleId: c.textStyleId || 'none',
        fontSize: c.fontSize || 120,
        color: c.textColor || '#ffffff',
        fontFamily: c.fontFamily || 'sans-serif',
        fontWeight: c.fontWeight || '900',
        fontStyle: c.fontStyle || 'normal',
        textDecoration: c.textDecoration || 'none',
        textAlign: c.textAlign || 'center',
        strokeColor: c.strokeColor || 'transparent',
        strokeWidth: c.strokeWidth || 0,
        x: c.x || 0,
        y: c.y || 0,
      };
      setLayers([fallbackLayer]);
      setActiveLayerId('1');
    }
  };

  const handleNewProject = () => {
    setCurrentProjectId(null);
    setBgType('color');
    setBgColor('#1a1a1a');
    setBgImage(null);
    setVideoUrl(null);
    setVideoTime(0);
    setRatio('16:9');
    setLayers([
      {
        id: '1',
        name: 'Text 1',
        text: i18n[lang].defaultText,
        styleId: 'none',
        fontSize: 120,
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontWeight: '900',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center',
        strokeColor: 'transparent',
        strokeWidth: 0,
        x: 0,
        y: 0,
      },
    ]);
    setActiveLayerId('1');
    setIsSelected(false);
    setBgPosX(50);
    setBgPosY(50);
    setBgScale(1);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    if (currentProjectId === id) {
      handleNewProject();
    }
  };

  const prevRatioRef = useRef(ratio);
  useEffect(() => {
    if (prevRatioRef.current !== ratio) {
      const prevWidth = aspectRatios[prevRatioRef.current].w;
      const newWidth = aspectRatios[ratio].w;
      if (activeLayer) {
        updateActiveLayer({
          fontSize: Math.max(20, Math.round(activeLayer.fontSize * (newWidth / prevWidth))),
        });
      }
      prevRatioRef.current = ratio;
    }
  }, [ratio]);

  useEffect(() => {
    if (!activeLayer) return;
    if (lang === 'en' && activeLayer.text === i18n.zh.defaultText) {
      updateActiveLayer({ text: i18n.en.defaultText });
    }
    if (lang === 'zh' && activeLayer.text === i18n.en.defaultText) {
      updateActiveLayer({ text: i18n.zh.defaultText });
    }
  }, [lang]);

  const handleDragStart = (e: React.PointerEvent, targetLayer?: TextLayer) => {
    if (e.button !== 0) return;
    
    e.stopPropagation();
    setIsSelected(true);

    const layer = targetLayer || activeLayer;
    if (!layer) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = layer.x;
    const startPosY = layer.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = (moveEvent.clientX - startX) / scale;
      const deltaY = (moveEvent.clientY - startY) / scale;
      
      let newX = startPosX + deltaX;
      let newY = startPosY + deltaY;
      
      const SNAP_THRESHOLD = 30;
      
      if (Math.abs(newX) < SNAP_THRESHOLD) {
        newX = 0;
        setShowVerticalGuide(true);
      } else {
        setShowVerticalGuide(false);
      }
      
      if (Math.abs(newY) < SNAP_THRESHOLD) {
        newY = 0;
        setShowHorizontalGuide(true);
      } else {
        setShowHorizontalGuide(false);
      }
      
      updateLayer(layer.id, { x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setShowVerticalGuide(false);
      setShowHorizontalGuide(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleResizeStart = (e: React.PointerEvent, position: string) => {
    e.stopPropagation();
    if (!activeLayer) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startFontSize = activeLayer.fontSize;
    const startWidth = Math.max(1, activeLayer.fontSize * activeLayer.text.length * 0.6);
    const startHeight = activeLayer.fontSize * 1.3;
    const startPosX = activeLayer.x;
    const startPosY = activeLayer.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = (moveEvent.clientX - startX) / scale;
      
      let widthDelta = 0;
      if (position === 'bottom-right' || position === 'top-right') widthDelta = deltaX;
      if (position === 'bottom-left' || position === 'top-left') widthDelta = -deltaX;

      const scaleFactor = Math.max(0.1, 1 + widthDelta / startWidth);
      const newFontSize = startFontSize * scaleFactor;

      const widthDiff = startWidth * (scaleFactor - 1);
      const heightDiff = startHeight * (scaleFactor - 1);

      let newX = startPosX;
      let newY = startPosY;

      if (position === 'bottom-right') {
        newX = startPosX + widthDiff / 2;
        newY = startPosY + heightDiff / 2;
      } else if (position === 'bottom-left') {
        newX = startPosX - widthDiff / 2;
        newY = startPosY + heightDiff / 2;
      } else if (position === 'top-right') {
        newX = startPosX + widthDiff / 2;
        newY = startPosY - heightDiff / 2;
      } else if (position === 'top-left') {
        newX = startPosX - widthDiff / 2;
        newY = startPosY - heightDiff / 2;
      }

      updateActiveLayer({
        fontSize: Math.max(20, Math.round(newFontSize)),
        x: newX,
        y: newY,
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const ResizeHandle = ({ position }: { position: string }) => {
    const getCursor = () => {
      if (position === 'top-left' || position === 'bottom-right') return 'nwse-resize';
      if (position === 'top-right' || position === 'bottom-left') return 'nesw-resize';
      return 'pointer';
    };

    return (
      <div
        className={cn(
          "absolute w-6 h-6 bg-white border-[3px] border-blue-500 rounded-full shadow-md z-50",
          position === 'top-left' && "-top-3 -left-3",
          position === 'top-right' && "-top-3 -right-3",
          position === 'bottom-left' && "-bottom-3 -left-3",
          position === 'bottom-right' && "-bottom-3 -right-3",
        )}
        style={{ cursor: getCursor() }}
        onPointerDown={(e) => handleResizeStart(e, position)}
      />
    );
  };

  const resetBgTransform = () => {
    setBgPosX(50);
    setBgPosY(50);
    setBgScale(1);
    setBgTransformTick(v => v + 1);
  };

  const clampPct = (v: number) => Math.min(100, Math.max(0, v));

  const handleBgDragStart = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setIsSelected(false);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = bgPosX;
    const startPosY = bgPosY;
    const fw = aspectRatios[ratio].w;
    const fh = aspectRatios[ratio].h;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = (moveEvent.clientX - startX) / scale;
      const deltaY = (moveEvent.clientY - startY) / scale;
      setBgPosX(clampPct(startPosX - (deltaX / fw) * 100));
      setBgPosY(clampPct(startPosY - (deltaY / fh) * 100));
    };

    const handlePointerUp = () => {
      setBgTransformTick(v => v + 1);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  useEffect(() => {
    const el = exportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!currentBgRef.current) return;
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      setBgScale(prev => Math.max(BG_MIN_SCALE, Math.min(BG_MAX_SCALE, prev * factor)));
      setBgTransformTick(v => v + 1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.clientWidth;
        const parentHeight = containerRef.current.clientHeight;
        
        const targetWidth = aspectRatios[ratio].w;
        const targetHeight = aspectRatios[ratio].h;
        
        const isMobile = parentWidth < 1024;
        const padding = isMobile ? 32 : 80;
        
        const scaleX = (parentWidth - padding) / targetWidth;
        const scaleY = (parentHeight - padding) / targetHeight;
        
        setScale(Math.min(scaleX, scaleY));
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [ratio]);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    
    setIsSelected(false);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const dataUrl = await toPng(exportRef.current, {
        quality: 1,
        pixelRatio: 1,
        cacheBust: true,
        // @ts-ignore
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `cover-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
      alert(t.exportFail);
    }
  };

  const applyTextTemplate = (templateId: 'default' | 'gold-news-title' | 'red-emphasis-subtitle') => {
    if (templateId === 'default') {
      updateActiveLayer({
        text: i18n[lang].defaultText,
        styleId: 'none',
        fontSize: 120,
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontWeight: '900',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center',
        strokeColor: 'transparent',
        strokeWidth: 0,
      });
    } else if (templateId === 'gold-news-title') {
      updateActiveLayer({
        text: lang === 'zh' ? '居民躺平裁员潮蔓延' : 'Economic Concerns Rise',
        styleId: 'gold-news-title',
        fontSize: 140,
        color: '#FFD700',
        fontWeight: '900',
        textAlign: 'center',
        strokeColor: '#000000',
        strokeWidth: 6,
        fontStyle: 'normal',
        textDecoration: 'none',
        fontFamily: 'sans-serif',
      });
    } else {
      updateActiveLayer({
        text: lang === 'zh' ? '央行有点急了！' : 'Central Bank Worried!',
        styleId: 'red-emphasis-subtitle',
        fontSize: 120,
        color: '#FF1A1A',
        fontWeight: '900',
        textAlign: 'center',
        strokeColor: '#000000',
        strokeWidth: 6,
        fontStyle: 'normal',
        textDecoration: 'none',
        fontFamily: 'sans-serif',
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setBgType('video');
      setVideoUrl(url);
      setBgImage(null);
      setVideoTime(0);
      resetBgTransform();
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_SIZE = 1920;
          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            } else {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setBgType('image');
            setBgImage(dataUrl);
            setVideoUrl(null);
            resetBgTransform();
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const currentBg = bgType === 'video' ? frameUrl : bgImage;
  currentBgRef.current = currentBg;

  return (
    <div className="flex flex-col lg:flex-row flex-1 w-full bg-[#0A0A0A] text-white overflow-hidden font-sans">
      <LayerListSidebar
        layers={layers}
        activeLayerId={activeLayerId}
        onSelectLayer={(id) => { setActiveLayerId(id); }}
        onAddLayer={() => {
          const layer = createDefaultLayer();
          setLayers(prev => [...prev, layer]);
          setActiveLayerId(layer.id);
        }}
        onDeleteLayer={(id) => {
          setLayers(prev => prev.filter(l => l.id !== id));
          if (activeLayerId === id) {
            const remaining = layers.filter(l => l.id !== id);
            setActiveLayerId(remaining[0]?.id || '');
          }
        }}
        onRenameLayer={(id, name) => setLayers(prev => prev.map(l => l.id === id ? { ...l, name } : l))}
        bgThumbnail={currentBg}
        bgColor={bgColor}
        isBackgroundActive={activeTab === 'background'}
        onSelectBackground={() => setActiveTab('background')}
        t={t}
      />
      
      {/* Canvas Area */}
      <div ref={containerRef} className="flex-none h-[45vh] lg:h-auto lg:flex-1 relative flex items-center justify-center bg-[#0A0A0A] p-4 lg:p-8 overflow-hidden touch-none min-w-0">
        {/* Scale Wrapper */}
        <div 
          className="relative shadow-2xl transition-all duration-200 ease-out"
          style={{ 
            width: aspectRatios[ratio].w * scale, 
            height: aspectRatios[ratio].h * scale,
          }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{
              width: aspectRatios[ratio].w,
              height: aspectRatios[ratio].h,
              transform: `scale(${scale})`
            }}
          >
            <div ref={exportRef} className="w-full h-full relative overflow-hidden ring-1 ring-white/20" style={{ backgroundColor: bgColor }}>
              {currentBg && (
                <img
                  src={currentBg}
                  crossOrigin="anonymous"
                  draggable={false}
                  alt="Background"
                  className="w-full h-full object-cover pointer-events-auto cursor-grab active:cursor-grabbing select-none"
                  style={{
                    objectPosition: `${bgPosX}% ${bgPosY}%`,
                    transform: `scale(${bgScale})`,
                    transformOrigin: 'center',
                  }}
                  onPointerDown={handleBgDragStart}
                />
              )}
              
              {/* Center Guides */}
              {showVerticalGuide && (
                <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-dashed border-cyan-400 -translate-x-1/2 z-10 pointer-events-none shadow-[0_0_4px_rgba(0,255,255,0.5)]" />
              )}
              {showHorizontalGuide && (
                <div className="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-cyan-400 -translate-y-1/2 z-10 pointer-events-none shadow-[0_0_4px_rgba(0,255,255,0.5)]" />
              )}
              
              <div 
                className="absolute inset-0 pointer-events-none z-20"
                onPointerDown={() => setIsSelected(false)}
              >
                {layers.map(layer => (
                  <motion.div
                    key={layer.id}
                    style={{ x: layer.x, y: layer.y, willChange: isSelected && activeLayerId === layer.id ? 'transform' : 'auto' }}
                    onPointerDown={(e) => { setActiveLayerId(layer.id); handleDragStart(e, layer); }}
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-move pointer-events-auto",
                      isSelected && activeLayerId === layer.id && "ring-2 ring-blue-500 ring-offset-4 ring-offset-transparent"
                    )}
                  >
                    <div className="pointer-events-none">
                      <TextOverlay 
                        text={layer.text} 
                        styleId={layer.styleId} 
                        fontSize={layer.fontSize} 
                        color={layer.color} 
                        fontFamily={layer.fontFamily}
                        fontWeight={layer.fontWeight}
                        fontStyle={layer.fontStyle}
                        textDecoration={layer.textDecoration}
                        textAlign={layer.textAlign}
                        strokeColor={layer.strokeColor}
                        strokeWidth={layer.strokeWidth}
                      />
                    </div>
                    
                    {isSelected && activeLayerId === layer.id && (
                      <>
                        <ResizeHandle position="top-left" />
                        <ResizeHandle position="top-right" />
                        <ResizeHandle position="bottom-left" />
                        <ResizeHandle position="bottom-right" />
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Top Bar in Canvas Area */}
        <div className="absolute top-2 left-2 right-2 lg:top-4 lg:left-4 lg:right-4 flex justify-between items-center z-30 pointer-events-none">
          <div className="flex gap-2 lg:gap-4 items-center pointer-events-auto">
            <div className="bg-black/50 backdrop-blur-md px-2 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium">
              {aspectRatios[ratio].w} x {aspectRatios[ratio].h}
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="bg-black/50 backdrop-blur-md px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium hover:bg-black/70 transition-colors"
            >
              {lang === 'en' ? '中' : 'EN'}
            </button>
          </div>
          <button 
            onClick={handleDownload}
            className="bg-[#00FF66] text-black px-3 lg:px-6 py-1.5 lg:py-2 rounded-full font-bold flex items-center gap-1.5 lg:gap-2 hover:bg-[#00CC55] transition-colors pointer-events-auto shadow-[0_0_15px_rgba(0,255,102,0.3)] text-xs lg:text-base"
          >
            <Download size={16} />
            <span className="hidden sm:inline">{t.exportBtn}</span>
            <span className="sm:hidden">{lang === 'en' ? 'Export' : '导出'}</span>
          </button>
        </div>
      </div>

      {/* Controls Area */}
      <div className="w-full lg:w-[400px] lg:ml-6 bg-[#141414] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col flex-1 lg:flex-none lg:h-full shrink-0 z-20 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {[
            { id: 'background', label: t.bgTab, icon: ImageIcon },
            { id: 'text', label: t.textTab, icon: Type },
            { id: 'style', label: t.styleTab, icon: Palette }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                activeTab === tab.id ? "text-white border-b-2 border-white" : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'background' && (
            <div className="space-y-8">
              {/* Ratio Selector */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.ratio}</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(aspectRatios).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setRatio(key as any)}
                      className={cn(
                        "py-3 rounded-xl text-sm font-medium transition-colors border",
                        ratio === key ? "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]" : "bg-[#0A0A0A] text-neutral-400 border-white/10 hover:bg-white/5"
                      )}
                    >
                      {(t as any)[val.labelKey]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.uploadTitle}</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl hover:border-[#00FF66]/50 hover:bg-[#00FF66]/5 transition-colors cursor-pointer bg-[#0A0A0A]">
                  <Upload className="w-8 h-8 text-neutral-500 mb-2" />
                  <span className="text-sm text-neutral-400">{t.uploadDesc}</span>
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Video Frame Slider */}
              {bgType === 'video' && videoDuration > 0 && (
                <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/10">
                  <label className="flex justify-between text-sm font-medium text-neutral-300 mb-3">
                    <span>{t.extractFrame}</span>
                    <span className="text-neutral-500">{videoTime.toFixed(1)}s / {videoDuration.toFixed(1)}s</span>
                  </label>
                  
                  <div className="relative w-full h-14 bg-[#141414] rounded-lg overflow-hidden flex border border-white/10">
                    {isGeneratingThumbs ? (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500 animate-pulse">
                        {t.generatingThumbs}
                      </div>
                    ) : (
                      thumbnails.map((thumb, idx) => (
                        <img key={idx} src={thumb} className="flex-1 h-full object-cover opacity-60 pointer-events-none" alt="" />
                      ))
                    )}
                    
                    {/* Custom Thumb Indicator */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_2px_rgba(0,0,0,0.8)] z-10 pointer-events-none"
                      style={{ left: `${(videoTime / videoDuration) * 100}%`, marginLeft: '-1px' }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-8 bg-white rounded-sm shadow-md"></div>
                    </div>

                    <input 
                      type="range" 
                      min={0} 
                      max={videoDuration} 
                      step={0.01}
                      value={videoTime}
                      onChange={(e) => setVideoTime(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                  </div>
                </div>
              )}

              {/* Background Adjust (Pan & Zoom) */}
              {currentBg && (
                <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-300">{t.bgAdjust}</label>
                    <button
                      onClick={resetBgTransform}
                      className="flex items-center gap-1 text-xs text-neutral-400 hover:text-[#00FF66] transition-colors"
                    >
                      <RotateCcw size={12} />
                      {t.reset}
                    </button>
                  </div>
                  <div>
                    <label className="flex justify-between text-xs font-medium text-neutral-400 mb-2">
                      <span>{t.bgScale}</span>
                      <span>{Math.round(bgScale * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min={BG_MIN_SCALE}
                      max={BG_MAX_SCALE}
                      step={0.01}
                      value={bgScale}
                      onChange={(e) => setBgScale(parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{t.bgAdjustHint}</p>
                </div>
              )}
              
              {/* Background Color Fallback */}
              {bgType === 'color' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">{t.solidColor}</label>
                  <div className="flex gap-2">
                    {['#1a1a1a', '#FF5A1F', '#6366F1', '#10B981', '#F59E0B', '#EF4444'].map(c => (
                      <button
                        key={c}
                        onClick={() => setBgColor(c)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2",
                          bgColor === c ? "border-[#00FF66] scale-110" : "border-transparent hover:scale-110"
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'text' && activeLayer && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.coverText}</label>
                <textarea
                  value={activeLayer.text}
                  onChange={(e) => updateActiveLayer({ text: e.target.value })}
                  className="w-full h-32 bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF66] resize-none transition-colors"
                  placeholder={t.textPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.textTemplates}</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => applyTextTemplate('default')}
                    className={cn(
                      "h-28 rounded-xl border-2 flex flex-col items-center justify-center overflow-hidden relative transition-all bg-[#0A0A0A]",
                      activeLayer.styleId === 'none' ? "border-[#00FF66] bg-white/5" : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="scale-[0.16] origin-center pointer-events-none absolute">
                      <TextOverlay
                        text={t.templateDefault}
                        styleId="none"
                        fontSize={100}
                        color="#ffffff"
                        fontFamily="sans-serif"
                        fontWeight="900"
                        fontStyle="normal"
                        textDecoration="none"
                        textAlign="center"
                        strokeColor="transparent"
                        strokeWidth={0}
                      />
                    </div>
                    <span className="absolute bottom-2 text-xs text-neutral-400 font-medium">{t.templateDefault}</span>
                  </button>
                  <button
                    onClick={() => applyTextTemplate('gold-news-title')}
                    className={cn(
                      "h-28 rounded-xl border-2 flex flex-col items-center justify-center overflow-hidden relative transition-all bg-[#0A0A0A]",
                      activeLayer.styleId === 'gold-news-title' ? "border-[#00FF66] bg-white/5" : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="scale-[0.16] origin-center pointer-events-none absolute">
                      <TextOverlay
                        text={t.templateGoldNewsTitle}
                        styleId="gold-news-title"
                        fontSize={100}
                        color="#FFD700"
                        fontFamily="sans-serif"
                        fontWeight="900"
                        fontStyle="normal"
                        textDecoration="none"
                        textAlign="center"
                        strokeColor="#000000"
                        strokeWidth={6}
                      />
                    </div>
                    <span className="absolute bottom-2 text-xs text-neutral-400 font-medium">{t.templateGoldNewsTitle}</span>
                  </button>
                  <button
                    onClick={() => applyTextTemplate('red-emphasis-subtitle')}
                    className={cn(
                      "h-28 rounded-xl border-2 flex flex-col items-center justify-center overflow-hidden relative transition-all bg-[#0A0A0A]",
                      activeLayer.styleId === 'red-emphasis-subtitle' ? "border-[#00FF66] bg-white/5" : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="scale-[0.16] origin-center pointer-events-none absolute">
                      <TextOverlay
                        text={t.templateRedEmphasisSubtitle}
                        styleId="red-emphasis-subtitle"
                        fontSize={100}
                        color="#FF1A1A"
                        fontFamily="sans-serif"
                        fontWeight="900"
                        fontStyle="normal"
                        textDecoration="none"
                        textAlign="center"
                        strokeColor="#000000"
                        strokeWidth={6}
                      />
                    </div>
                    <span className="absolute bottom-2 text-xs text-neutral-400 font-medium">{t.templateRedEmphasisSubtitle}</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="flex justify-between text-sm font-medium text-neutral-400 mb-3">
                  <span>{t.fontSize}</span>
                  <span>{activeLayer.fontSize}px</span>
                </label>
                <input 
                  type="range" 
                  min={40} 
                  max={300} 
                  value={activeLayer.fontSize}
                  onChange={(e) => updateActiveLayer({ fontSize: parseInt(e.target.value) })}
                  className="w-full accent-[#00FF66]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.textColor}</label>
                <div className="flex gap-2">
                  {['#ffffff', '#000000', '#FF5A1F', '#FFD700', '#4F46E5', '#10B981'].map(c => (
                    <button
                      key={c}
                      onClick={() => updateActiveLayer({ color: c })}
                      className={cn(
                        "w-10 h-10 rounded-full border-2",
                        activeLayer.color === c ? "border-[#00FF66] scale-110" : "border-transparent hover:scale-110"
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.fontFamily}</label>
                <select
                  value={activeLayer.fontFamily}
                  onChange={(e) => updateActiveLayer({ fontFamily: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00FF66] transition-colors"
                >
                  {FONT_GROUPS.map(group => (
                    <optgroup key={group.labelEn} label={lang === 'zh' ? group.labelZh : group.labelEn}>
                      {group.fonts.map(font => (
                        <option key={font.value} value={font.value}>{font.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">{t.fontWeight}</label>
                  <select
                    value={activeLayer.fontWeight}
                    onChange={(e) => updateActiveLayer({ fontWeight: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00FF66] transition-colors"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">{t.fontStyle}</label>
                  <select
                    value={activeLayer.fontStyle}
                    onChange={(e) => updateActiveLayer({ fontStyle: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00FF66] transition-colors"
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">{t.textDecoration}</label>
                  <select
                    value={activeLayer.textDecoration}
                    onChange={(e) => updateActiveLayer({ textDecoration: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00FF66] transition-colors"
                  >
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="line-through">Strike</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-3">{t.textAlign}</label>
                <div className="flex gap-2">
                  {(['left', 'center', 'right'] as const).map(align => (
                    <button
                      key={align}
                      onClick={() => updateActiveLayer({ textAlign: align })}
                      className={cn(
                        "flex-1 py-2 rounded-xl border text-sm font-medium transition-colors",
                        activeLayer.textAlign === align ? "border-[#00FF66] text-[#00FF66] bg-[#00FF66]/10" : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-neutral-400 mb-3">
                  <span>{t.strokeWidth}</span>
                  <span>{activeLayer.strokeWidth}px</span>
                </label>
                <input 
                  type="range" 
                  min={0} 
                  max={20} 
                  value={activeLayer.strokeWidth}
                  onChange={(e) => updateActiveLayer({ strokeWidth: parseInt(e.target.value) })}
                  className="w-full accent-[#00FF66]"
                />
              </div>

              {activeLayer.strokeWidth > 0 && (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">{t.strokeColor}</label>
                  <div className="flex gap-2">
                    {['#000000', '#ffffff', '#FF5A1F', '#FFD700', '#4F46E5', '#10B981'].map(c => (
                      <button
                        key={c}
                        onClick={() => updateActiveLayer({ strokeColor: c })}
                        className={cn(
                          "w-10 h-10 rounded-full border-2",
                          activeLayer.strokeColor === c ? "border-[#00FF66] scale-110" : "border-transparent hover:scale-110"
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'style' && activeLayer && (
            <div className="space-y-6">
              <label className="block text-sm font-medium text-neutral-400 mb-3">{t.textBgStyle}</label>
              <div className="grid grid-cols-2 gap-4">
                {TEXT_BG_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => updateActiveLayer({ styleId: style.id })}
                    className={cn(
                      "h-32 rounded-xl border-2 flex flex-col items-center justify-center overflow-hidden relative transition-all bg-[#0A0A0A]",
                      activeLayer.styleId === style.id ? "border-[#00FF66] bg-white/5" : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="scale-[0.2] origin-center pointer-events-none absolute">
                      <TextOverlay 
                        text={t.stylePreview} 
                        styleId={style.id} 
                        fontSize={100} 
                        color="#ffffff"
                        fontFamily="sans-serif"
                        fontWeight="900"
                        fontStyle="normal"
                        textDecoration="none"
                        textAlign="center"
                        strokeColor="transparent"
                        strokeWidth={0}
                      />
                    </div>
                    <span className="absolute bottom-2 text-xs text-neutral-400 font-medium">{(t as any)[style.nameKey]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
