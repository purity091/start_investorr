import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Activity } from 'lucide-react';

interface HackathonPledgeProps {
  progress: number;
  onStartHold: () => void;
  onStopHold: () => void;
}

export const HackathonPledge: React.FC<HackathonPledgeProps> = ({ progress, onStartHold, onStopHold }) => (
  <motion.div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 px-4 backdrop-blur-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] p-5 text-center sm:p-10" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 sm:mb-8 sm:h-24 sm:w-24">
        <Fingerprint size={30} className="text-blue-400 sm:h-12 sm:w-12" />
      </div>

      <h1 className="mb-3 text-2xl font-black leading-tight tracking-tight text-white sm:mb-4 sm:text-5xl">ميثاق الالتزام الثوري</h1>
      <p className="mb-7 text-sm font-medium leading-relaxed text-slate-400 sm:mb-10 sm:text-lg">
        هذا الهاكاثون ليس للتسلية. إنه تحد لمدة 72 ساعة لتحويل "فكرة" إلى "كيان استثماري". بالتوقيع هنا، تتعهد بالالتزام بالوقت والدقة والتنفيذ.
      </p>

      <button
        onMouseDown={onStartHold}
        onTouchStart={onStartHold}
        onMouseUp={onStopHold}
        onTouchEnd={onStopHold}
        onMouseLeave={onStopHold}
        className="group relative h-14 w-full overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-500/10 transition-all sm:h-20"
      >
        <motion.div className="absolute inset-y-0 right-0 bg-blue-600/60" style={{ width: `${progress}%` }} />
        <span className="relative z-10 flex items-center justify-center gap-2 px-2 text-sm font-black text-white sm:gap-3 sm:text-xl">
          <Activity size={18} className={progress > 0 ? 'animate-pulse sm:h-6 sm:w-6' : 'sm:h-6 sm:w-6'} />
          اضغط مطولا للتوقيع والبدء (2s)
        </span>
      </button>
    </motion.div>
  </motion.div>
);
