import React, { useState } from 'react';
import { FormProps } from 'antd/lib/form/Form';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import Label from '../../components/Label';
import Dropdown from '../../components/Dropdown';
import BaseForm, { CommonFormProps } from '../../BaseForm';
import './index.less';

export interface LightFilterProps extends FormProps, CommonFormProps {
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
}

const LightFilterConatiner: React.FC<{
  items: React.ReactNode[];
  prefixCls: string;
  size?: SizeType;
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
}> = (props) => {
  // TODO 确认表单级别的 disabled 要不要支持
  const { items, prefixCls, size, collapse, collapseLabel } = props;
  const outsideItems: React.ReactNode[] = [];
  const collapseItems: React.ReactNode[] = [];
  const [open, setOpen] = useState<boolean>(false);
  // TODO 国际化
  const locale = {
    more: '更多筛选',
  };

  items.forEach((item: any) => {
    // TODO 加上有 value 时显示到外面的逻辑，控件添加 secondary 属性
    const { secondary } = item.props || {};
    if (secondary || collapse) {
      collapseItems.push(item);
    } else {
      outsideItems.push(item);
    }
  });

  return (
    <div className={classNames(`${prefixCls}-lightfilter`, `${prefixCls}-lightfilter-${size}`)}>
      <div className={`${prefixCls}-lightfilter-container`}>
        {outsideItems.map((child: any) => {
          const { field } = child.props;
          return (
            <div className={`${prefixCls}-lightfilter-item`} key={field}>
              {React.cloneElement(child, {
                plain: true,
              })}
            </div>
          );
        })}
        {collapseItems.length ? (
          <div className={`${prefixCls}-lightfilter-item`} key="more">
            <Dropdown
              padding={24}
              onVisibleChange={setOpen}
              visible={open}
              label={collapseLabel || <Label size={size} label={locale.more} expanded={open} />}
              footer={{
                onConfirm: () => {
                  // TODO
                },
                onClear: () => {
                  // TODO
                },
              }}
            >
              {collapseItems.map((child: any) => {
                const { field } = child.props;
                return (
                  <div className={`${prefixCls}-lightfilter-line`} key={field}>
                    {child}
                  </div>
                );
              })}
            </Dropdown>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const LightFilter: React.FC<LightFilterProps> = (props) => {
  const { size, collapse, collapseLabel } = props;
  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const prefixCls = getPrefixCls('pro-form');
        return (
          <BaseForm
            contentRender={(items) => (
              <LightFilterConatiner
                prefixCls={prefixCls}
                items={items}
                size={size}
                collapse={collapse}
                collapseLabel={collapseLabel}
              />
            )}
            {...props}
          />
        );
      }}
    </ConfigConsumer>
  );
};

export default LightFilter;
