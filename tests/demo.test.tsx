import React from 'react';
import glob from 'glob';
import { render } from 'enzyme';
import MockDate from 'mockdate';
import moment from 'moment';

type CheerIO = ReturnType<typeof render>;
type CheerIOElement = CheerIO[0];
// We should avoid use it in 4.0. Reopen if can not handle this.
const USE_REPLACEMENT = false;
const testDist = process.env.LIB_DIR === 'dist';

/**
 * rc component will generate id for aria usage.
 * It's created as `test-uuid` when env === 'test'.
 * Or `f7fa7a3c-a675-47bc-912e-0c45fb6a74d9`(randomly) when not test env.
 * So we need hack of this to modify the `aria-controls`.
 */
function ariaConvert(wrapper: CheerIO) {
  if (!testDist || !USE_REPLACEMENT) return wrapper;

  const matches = new Map();

  function process(entry: CheerIOElement) {
    const { attribs, children } = entry;
    if (matches.has(entry)) return;
    matches.set(entry, true);

    // Change aria
    if (attribs && attribs['aria-controls']) {
      attribs['aria-controls'] = ''; // Remove all the aria to keep render sync in jest & jest node
    }

    // Loop children
    if (!children) return;
    (Array.isArray(children) ? children : [children]).forEach(process);
  }

  wrapper.each((_, entry) => process(entry));

  return wrapper;
}

type Options = {
  skip?: boolean;
};

function demoTest(component: string, options: Options = {}) {
  const files = glob.sync(`./packages/${component}/demos/*.tsx`);

  files.forEach((file) => {
    let testMethod = options.skip === true ? test.skip : test;
    if (Array.isArray(options.skip) && options.skip.some((c) => file.includes(c))) {
      testMethod = test.skip;
    }
    testMethod(`renders ${file} correctly`, () => {
      MockDate.set(moment('2016-11-22').valueOf());
      const Demo = require(`.${file}`).default; // eslint-disable-line global-require, import/no-dynamic-require
      const wrapper = render(<Demo />);

      // Convert aria related content
      ariaConvert(wrapper);

      expect(wrapper).toMatchSnapshot();
      MockDate.reset();
    });
  });
}

describe('demos', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        addListener() {},
        removeListener() {},
      })),
    });
  });

  beforeEach(() => {
    const mockFormatExpression = {
      format: (value: string) => `￥ ${value.toString()}`,
    };
    // @ts-ignore
    Intl.NumberFormat = jest.fn().mockImplementation(() => mockFormatExpression);
  });

  const files = glob.sync(`./packages/*`) as string[];
  files.forEach((file) => {
    const component = file.split('/').pop();
    if (!component) return;
    demoTest(component);
  });
});
