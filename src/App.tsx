import React, { useState } from 'react';
import { SignatureCanvas } from './components/SignatureCanvas';
import { Button } from './components/ui/button';
import { Upload, Download, Eraser } from 'lucide-react';

function App() {
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureCanvas, setSignatureCanvas] = useState<{
    clearCanvas: () => void;
    saveAsPNG: () => void;
    hasSignature: boolean;
  } | null>(null);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`تم اختيار: ${file.name}`);
      }
    };
    input.click();
  };

  const CanvasComponent = SignatureCanvas({
    onSignatureChange: setHasSignature
  });

  React.useEffect(() => {
    setSignatureCanvas({
      clearCanvas: CanvasComponent.clearCanvas,
      saveAsPNG: CanvasComponent.saveAsPNG,
      hasSignature: CanvasComponent.hasSignature
    });
  }, [CanvasComponent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          برمجية الأستاذ يعقوب للتوقيع الرقمي
        </h1>
        <p className="mt-2 text-primary-foreground/90 text-sm md:text-base">
          أداة حديثة لإنشاء وحفظ التواقيع الرقمية
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Canvas Container */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                منطقة التوقيع
              </h2>
              <p className="text-gray-600 text-sm">
                استخدم الماوس أو اللمس لرسم توقيعك في المنطقة أدناه
              </p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-2xl">
                {CanvasComponent.canvas}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={signatureCanvas?.clearCanvas}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 text-base"
              >
                <Eraser className="w-5 h-5" />
                امسح التوقيع
              </Button>

              <Button
                onClick={signatureCanvas?.saveAsPNG}
                disabled={!hasSignature}
                className="flex items-center gap-2 px-6 py-3 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Download className="w-5 h-5" />
                حفظ PNG
              </Button>

              <Button
                onClick={handleFileUpload}
                variant="secondary"
                className="flex items-center gap-2 px-6 py-3 text-base"
              >
                <Upload className="w-5 h-5" />
                اختر ملف PDF/Word
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              كيفية الاستخدام
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-primary font-bold">1</span>
                </div>
                <p>ارسم توقيعك في المنطقة المخصصة</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <p>احفظ التوقيع كملف PNG</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-accent font-bold">3</span>
                </div>
                <p>استخدم التوقيع في مستنداتك</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 px-4 mt-8">
        <p className="text-gray-600 text-sm">
          جميع الحقوق محفوظة للأستاذ يعقوب © 2024
        </p>
        <p className="text-gray-500 text-xs mt-1">
          تم تطوير هذه الأداة باستخدام أحدث التقنيات
        </p>
      </footer>
    </div>
  );
}

export default App;