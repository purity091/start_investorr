
import React from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface FileUploadProps {
  hideTitle?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ hideTitle = false }) => {
  return (
    <div className={hideTitle ? '' : 'my-10 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm'}>
       {!hideTitle && (
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
          الهوية البصرية والملفات
        </h2>
       )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo Upload */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">شعار الشركة</label>
          <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-primary-300 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <ImageIcon size={28} strokeWidth={2} />
            </div>
            <p className="text-sm font-bold text-gray-700">اسحب الشعار هنا</p>
            <p className="text-[10px] text-gray-400 mt-2 font-bold bg-gray-100 px-3 py-1 rounded-full">PNG, SVG (Max 5MB)</p>
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">مرفقات داعمة</label>
          <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-primary-300 transition-all cursor-pointer group">
             <div className="w-16 h-16 bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors shadow-sm">
              <Upload size={28} strokeWidth={2} />
            </div>
            <p className="text-sm font-bold text-gray-700">إرفاق ملفات إضافية</p>
            <p className="text-[10px] text-gray-400 mt-2 font-bold bg-gray-100 px-3 py-1 rounded-full">PDF, DOCX, ZIP</p>
          </div>
        </div>
      </div>
    </div>
  );
};
