import React from 'react';
import { MessageCircleMore } from 'lucide-react';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const WHATSAPP_URL = 'https://wa.me/963936638280';

export const StrategicSupportFloat: React.FC = () => {
  return (
    <div className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6" dir="rtl">
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
