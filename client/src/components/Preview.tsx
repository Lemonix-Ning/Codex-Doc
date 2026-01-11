import { useEffect, useRef } from 'react';

interface PreviewProps {
  htmlContent: string;
}

export default function Preview({ htmlContent }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Inject CSS reset to prevent layout shift
    const style = doc.createElement('style');
    style.textContent = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
      }
    `;
    doc.head?.appendChild(style);
  }, [htmlContent]);

  return (
    <div className="h-full w-full bg-gray-100 overflow-auto">
      <iframe
        ref={iframeRef}
        title="Preview"
        className="w-full h-full border-none bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
