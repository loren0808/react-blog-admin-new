import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
interface VditorShowProps {
  text: string;
}
const VditorShow: React.FC<VditorShowProps> = ({ text }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Vditor.preview(editorRef.current, text, {
      mode: 'dark',
      lazyLoadImage: '',
      after() {
        console.log('first');
      }
    });
  }, []);
  return <div ref={editorRef} />;
};
export default VditorShow;
