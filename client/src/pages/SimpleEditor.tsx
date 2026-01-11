import { useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Image, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code2Doc - 代码转文档</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      .no-print { display: none !important; }
    }
  </style>
</head>
<body class="bg-white p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">欢迎使用 Code2Doc</h1>
    <p class="text-gray-600 mb-4">在左侧编辑HTML，右侧实时预览，然后导出为PDF或PNG。</p>
    
    <div class="bg-gray-100 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-2">快速开始</h2>
      <ul class="list-disc list-inside space-y-2">
        <li>编辑左侧的HTML代码</li>
        <li>右侧会实时显示预览效果</li>
        <li>点击顶部的导出按钮保存为PDF或PNG</li>
      </ul>
    </div>
  </div>
</body>
</html>`;

export default function SimpleEditor() {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_HTML);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');

  const handleExport = async (format: 'pdf' | 'png') => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStatus('准备导出...');
    
    try {
      setExportProgress(20);
      setExportStatus('正在渲染页面...');

      // 检查是否在Electron环境中
      const isElectron = window.electronAPI !== undefined;
      let blob: Blob;

      if (isElectron) {
        // 使用Electron原生API
        setExportProgress(60);
        setExportStatus('正在生成文件...');

        if (format === 'pdf') {
          const pdfBuffer = await window.electronAPI!.exportPDF(htmlContent);
          blob = new Blob([pdfBuffer], { type: 'application/pdf' });
        } else {
          const pngBuffer = await window.electronAPI!.exportPNG(htmlContent);
          blob = new Blob([pngBuffer], { type: 'image/png' });
        }
      } else {
        // Web环境使用服务端API
        const response = await fetch('/api/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: htmlContent, format }),
        });

        setExportProgress(60);
        setExportStatus('正在生成文件...');

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Export failed');
        }

        blob = await response.blob();
      }

      setExportProgress(80);
      setExportStatus('正在下载...');

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setExportProgress(100);
      setExportStatus('导出完成！');
      
      setTimeout(() => {
        toast.success(`成功导出为 ${format.toUpperCase()}`);
      }, 300);
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('导出失败');
      toast.error(error instanceof Error ? error.message : '导出失败');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus('');
      }, 1000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
        <h1 className="text-lg font-semibold text-white">Code2Doc - 代码转文档</h1>
        <div className="flex gap-2 items-center">
          {isExporting && (
            <div className="flex items-center gap-3 mr-4 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-gray-300">{exportStatus}</span>
              <div className="w-32">
                <Progress value={exportProgress} className="h-2" />
              </div>
            </div>
          )}
          <Button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            导出 PDF
          </Button>
          <Button
            onClick={() => handleExport('png')}
            disabled={isExporting}
            variant="outline"
            size="sm"
          >
            <Image className="w-4 h-4 mr-2" />
            导出 PNG
          </Button>
        </div>
      </header>

      {/* Editor and Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 border-r border-gray-800">
          <Editor value={htmlContent} onChange={setHtmlContent} />
        </div>

        {/* Preview */}
        <div className="w-1/2 bg-gray-100">
          <Preview htmlContent={htmlContent} />
        </div>
      </div>
    </div>
  );
}
