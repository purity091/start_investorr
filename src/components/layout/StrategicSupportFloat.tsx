import React, { useState, useEffect } from 'react';
import { MessageCircleMore, ArrowUp } from 'lucide-react';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const WHATSAPP_URL = 'https://wa.me/963936638280';

export const StrategicSupportFloat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6 flex flex-col gap-3" dir="rtl">
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="العودة للأعلى"
          title="العودة للأعلى"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'icon' }),
            'size-11 rounded-full shadow-md bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-slate-50 transition-all duration-300 mx-auto'
          )}
        >
          <ArrowUp className="size-5 text-slate-600" />
        </button>
      )}

      {/* WhatsApp Chat Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="الدردشة عبر واتساب"
        title="الدردشة عبر واتساب"
        className={cn(buttonVariants({ size: 'icon-lg' }), 'size-14 rounded-full shadow-lg')}
      >
        <MessageCircleMore className="size-6" />
      </a>
    </div>
  );
};

export default StrategicSupportFloat;
