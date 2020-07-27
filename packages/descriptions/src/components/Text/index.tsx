import { Descriptions } from 'antd';
import React from 'react';

import { ProDescriptionsFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input
 * @param
 */
const ProDescriptionsText: ProDescriptionsFC<{
  text: string;
  label: string;
}> = ({ text, label, render, formItemProps }) => {
  const dom = (
    <Descriptions>
      <Descriptions.Item label={label}>{text || '-'}</Descriptions.Item>
    </Descriptions>
  );
  if (render) {
    return render(text, { ...formItemProps }, dom);
  }
  return dom;
};

export default ProDescriptionsText;