import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import s from './index.module.scss';
interface VditorShowProps {
  text: string;
}
const VditorShow: React.FC<VditorShowProps> = ({ text }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Vditor.preview(editorRef.current, text, {
      mode: 'light',
      lazyLoadImage: '',
      after() {
        console.log('first');
      }
    });
  }, []);
  return <div className={s.showArea} ref={editorRef} />;
};
export default VditorShow;
