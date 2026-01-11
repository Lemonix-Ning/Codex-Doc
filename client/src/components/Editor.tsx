import Editor, { loader } from '@monaco-editor/react';
import { useEffect } from 'react';

// Configure Monaco loader to use CDN
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs',
  },
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  useEffect(() => {
    // Define custom theme if needed
    loader.init().then((monaco) => {
      monaco.editor.defineTheme('blueprint-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#1A1A1A',
        },
      });
    });
  }, []);

  return (
    <div className="h-full w-full bg-[#1A1A1A]">
      <Editor
        height="100%"
        defaultLanguage="html"
        value={value}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          wordWrap: 'on',
        }}
      />
    </div>
  );
}
