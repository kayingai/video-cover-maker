import React, { useState } from 'react';
import { Layers, Trash2, Plus, Type, ImageIcon } from 'lucide-react';
import { cn } from './CoverEditor';
import { TextLayer } from '../constants/editor';

interface LayerListSidebarProps {
  layers: TextLayer[];
  activeLayerId: string;
  onSelectLayer: (id: string) => void;
  onAddLayer: () => void;
  onDeleteLayer: (id: string) => void;
  onRenameLayer: (id: string, name: string) => void;
  bgThumbnail: string | null;
  bgColor: string;
  isBackgroundActive: boolean;
  onSelectBackground: () => void;
  t: typeof import('../constants/editor').i18n.en;
  className?: string;
}

export function LayerListSidebar({
  layers,
  activeLayerId,
  onSelectLayer,
  onAddLayer,
  onDeleteLayer,
  onRenameLayer,
  bgThumbnail,
  bgColor,
  isBackgroundActive,
  onSelectBackground,
  t,
  className
}: LayerListSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const startRename = (layer: TextLayer) => {
    setEditingId(layer.id);
    setEditingName(layer.name);
  };

  const commitRename = () => {
    if (editingId) {
      onRenameLayer(editingId, editingName.trim() || 'Untitled');
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitRename();
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditingName('');
    }
  };

  return (
    <div className={cn("hidden lg:flex w-[280px] shrink-0 bg-[#141414] border-r border-white/10 flex-col h-full z-50", className)}>
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
          <Layers size={16} />
          {t.layersTitle}
        </h2>
        <button
          onClick={onAddLayer}
          className="p-1.5 hover:bg-white/10 rounded-md text-neutral-400 hover:text-white transition-colors"
          title={t.addLayer}
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Background layer */}
        <div
          className={cn(
            "group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
            isBackgroundActive ? "bg-white/10" : "hover:bg-white/5"
          )}
          onClick={onSelectBackground}
        >
          <div className="w-10 h-10 rounded border border-white/10 overflow-hidden shrink-0 flex items-center justify-center" style={{ backgroundColor: bgColor }}>
            {bgThumbnail ? (
              <img src={bgThumbnail} alt="" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={16} className="text-neutral-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-200 truncate">
              {t.backgroundLayer}
            </div>
            <div className="text-xs text-neutral-500 mt-0.5 truncate">
              {bgThumbnail ? t.bgTab : t.solidColor}
            </div>
          </div>
        </div>

        {/* Text layers */}
        {layers.length === 0 ? (
          <div className="text-center text-sm text-neutral-500 mt-8">
            {t.noLayers}
          </div>
        ) : (
          layers.map(layer => (
            <div
              key={layer.id}
              className={cn(
                "group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                activeLayerId === layer.id ? "bg-white/10" : "hover:bg-white/5"
              )}
              onClick={() => onSelectLayer(layer.id)}
            >
              <div className="w-10 h-10 bg-black rounded border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                <Type size={16} className="text-neutral-500" />
              </div>
              <div className="flex-1 min-w-0">
                {editingId === layer.id ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full bg-transparent text-sm text-white border-b border-[#00FF66] outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div
                    className="text-sm font-medium text-neutral-200 truncate"
                    onDoubleClick={() => startRename(layer)}
                  >
                    {layer.name}
                  </div>
                )}
                <div className="text-xs text-neutral-500 mt-0.5 truncate">
                  {layer.text.replace(/\n/g, ' ') || 'Empty text'}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLayer(layer.id);
                }}
                className={cn(
                  "p-1.5 text-neutral-500 hover:text-red-400 transition-opacity",
                  layers.length > 1 ? "opacity-0 group-hover:opacity-100" : "opacity-50 cursor-not-allowed"
                )}
                disabled={layers.length <= 1}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
