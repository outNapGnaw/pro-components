import React from 'react';
import { Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

/**
 * 默认的查询表单配置
 */
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export interface ActionsProps {
  submiter: React.ReactNode;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  setCollapsed: (collapse: boolean) => void;
  showCollapseButton: boolean;
  isForm?: boolean;
  span?: number | typeof defaultColConfig;
  style?: React.CSSProperties;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean,
  ) => React.ReactNode;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
}

const defaultCollapseRender = (collapsed: boolean) => {
  if (collapsed) {
    return (
      <>
        展开
        <DownOutlined
          style={{
            marginLeft: '0.5em',
            transition: '0.3s all',
            transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
          }}
        />
      </>
    );
  }
  return (
    <>
      收起
      <DownOutlined
        style={{
          marginLeft: '0.5em',
          transition: '0.3s all',
          transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
        }}
      />
    </>
  );
};

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Actions: React.FC<ActionsProps> = (props) => {
  const {
    setCollapsed,
    collapsed = false,
    showCollapseButton,
    collapseRender = defaultCollapseRender,
    submiter,
    style,
  } = props;

  return (
    <Space style={style}>
      {submiter}
      {showCollapseButton && (
        <a
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapseRender(collapsed)}
        </a>
      )}
    </Space>
  );
};

export default Actions;
