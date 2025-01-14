import React from 'react';
import ProCard from '../src/index';

export default () => {
  return (
    <>
      <ProCard title="默认 Loading" extra="extra" loading style={{ width: 300 }}>
        内容
      </ProCard>

      <ProCard
        title="自定义 Loading"
        extra="extra"
        loading={<div>加载中</div>}
        style={{ width: 300, marginTop: 16 }}
      >
        内容
      </ProCard>
    </>
  );
};
