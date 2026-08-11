import React from 'react';
import { Palette } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-white/10 mt-auto shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#FF5A1F]" />
            <span className="text-sm font-bold text-[#00FF66] tracking-tight">OpenCoverMaker</span>
          </div>
          <span className="text-xs text-neutral-500 hidden sm:inline-block">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-xs text-neutral-500">
            <a href="#" className="hover:text-[#00FF66] transition-colors">Templates</a>
            <a href="#" className="hover:text-[#00FF66] transition-colors">Tutorials</a>
            <a href="#" className="hover:text-[#00FF66] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#00FF66] transition-colors">Terms</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-neutral-500 hover:text-[#00FF66] transition-colors">
              <span className="sr-only">X (Twitter)</span>
              <XIcon className="w-4 h-4" />
            </a>
            <a href="https://github.com/hengtuibabai/video-cover-maker" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-[#00FF66] transition-colors">
              <span className="sr-only">GitHub</span>
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
