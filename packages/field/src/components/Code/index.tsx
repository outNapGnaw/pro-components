import { Input } from 'antd';
import React from 'react';

import { FieldFC } from '../../index';

const languageFormat = (text: string, language: string) => {
  if (typeof text !== 'string') {
    return text;
  }
  try {
    if (language === 'json') {
      return JSON.stringify(JSON.parse(text), null, 2);
    }
  } catch (error) {
    // console.log(error)
  }
  return text;
};

/**
 * 代码片段组件
 * 这个组件为了显示简单的配置，复杂的请使用更加重型的组件
 * @param
 */
const FieldCode: FieldFC<{
  text: string;
  language?: 'json' | 'text';
}> = ({ text, mode, render, language = 'text', renderFormItem, plain, formItemProps }) => {
  const code = languageFormat(text, language);
  if (mode === 'read') {
    const dom = (
      <pre
        style={{
          padding: 16,
          overflow: 'auto',
          fontSize: '85%',
          lineHeight: 1.45,
          backgroundColor: '#f6f8fa',
          borderRadius: 3,
        }}
        {...formItemProps}
      >
        <code>{code}</code>
      </pre>
    );
    if (render) {
      return render(code, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom = <Input.TextArea rows={5} {...formItemProps} defaultValue={code} />;
    if (plain) {
      dom = <Input {...formItemProps} defaultValue={code} />;
    }
    if (renderFormItem) {
      return renderFormItem(code, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldCode;
