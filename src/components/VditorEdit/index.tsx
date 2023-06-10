import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useRef, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import s from './index.module.scss';
interface VditorEditProps {
  onChange: (value: string) => void;
}
// 修改模式下数据不保存，原因是数据没有存在edit中
// 提交模式下数据保存，原因是数据在localstorage中
const VditorEdit: React.FC<VditorEditProps> = ({ onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { text } = useAppSelector((store) => store.articles.edit);
  useEffect(() => {
    const vditor = new Vditor(editorRef.current!, {
      input: (value) => onChange(value),
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        // 'upload',
        // 'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'fullscreen',
        'edit-mode',
        {
          name: 'more',
          toolbar: [
            'both',
            'code-theme',
            'content-theme',
            'export',
            'outline',
            'preview',
            'devtools',
            'info',
            'help'
          ]
        }
      ],
      // preview: {
      //   hljs: {
      //     style: 'github-dark'
      //   }
      // },
      cache: { id: '__vditor' },
      height: 'calc(100% - 102px)',
      counter: { enable: true },
      outline: {
        position: 'left',
        enable: true
      },
      after: () => {
        console.log('after');
        const textFromLocalStorage = window.localStorage.getItem('__vditor');
        if (text) {
          vditor.setValue(text);
        } else if (textFromLocalStorage) {
          vditor.setValue(textFromLocalStorage);
        }
      }
    });
  }, []);
  return <div ref={editorRef} className="markdownVditor" />;
};
export default VditorEdit;
