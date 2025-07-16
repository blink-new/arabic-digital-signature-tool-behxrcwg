import React, { useState } from 'react';
import { SignatureCanvas } from './components/SignatureCanvas';
import { Button } from './components/ui/button';
import { Download, Eraser } from 'lucide-react';

function App() {
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureCanvas, setSignatureCanvas] = useState<{
    clearCanvas: () => void;
    saveAsPNG: () => void;
    hasSignature: boolean;
  } | null>(null);



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
    <div className="min-h-screen bg-3d-gradient" dir="rtl">
      {/* Header */}
      <header className="bg-3d-gradient text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 glass-effect"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold glow-text float-animation">
            برمجية الأستاذ يعقوب للتوقيع الرقمي
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg font-medium">
            أداة حديثة وثلاثية الأبعاد لإنشاء وحفظ التواقيع الرقمية
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
        <div className="w-full max-w-4xl mx-auto">
          {/* Canvas Container */}
          <div className="card-3d p-8 md:p-10 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 float-animation">
                  منطقة التوقيع الرقمي
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  استخدم الماوس أو اللمس لرسم توقيعك في المنطقة ثلاثية الأبعاد أدناه
                </p>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-2xl">
                  {CanvasComponent.canvas}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-6 justify-center">
                <button
                  onClick={signatureCanvas?.clearCanvas}
                  className="btn-3d btn-3d-secondary flex items-center gap-3 px-8 py-4 text-lg font-bold"
                >
                  <Eraser className="w-6 h-6" />
                  امسح التوقيع
                </button>

                <button
                  onClick={signatureCanvas?.saveAsPNG}
                  disabled={!hasSignature}
                  className={`btn-3d flex items-center gap-3 px-8 py-4 text-lg font-bold ${
                    !hasSignature ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Download className="w-6 h-6" />
                  حفظ PNG
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-effect rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 glow-text">
                كيفية الاستخدام
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-white">
                <div className="flex flex-col items-center float-animation">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-2xl">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <p className="text-lg font-medium">ارسم توقيعك في المنطقة ثلاثية الأبعاد</p>
                </div>
                <div className="flex flex-col items-center float-animation" style={{animationDelay: '1s'}}>
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mb-4 shadow-2xl">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <p className="text-lg font-medium">احفظ التوقيع كملف PNG واستخدمه في مستنداتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-effect text-center py-8 px-4 mt-12 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-white text-lg font-semibold glow-text">
            جميع الحقوق محفوظة للأستاذ يعقوب © 2024
          </p>
          <p className="text-white/80 text-base mt-2">
            تم تطوير هذه الأداة ثلاثية الأبعاد باستخدام أحدث التقنيات
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;