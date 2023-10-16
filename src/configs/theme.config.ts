import { Open_Sans } from 'next/font/google';
import type { ThemeConfig } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

const openSans = Open_Sans({
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export interface TokenCustom extends AliasToken {
  siderWidth: number;
  collapseSiderWidth: number;
  headerHeight: number;
  bgColor: string;
}

interface ThemeConfigCustom extends ThemeConfig {
  token?: Partial<TokenCustom>;
}
const THEME_CONFIG: ThemeConfigCustom = {
  token: {
    fontFamily: `${openSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    siderWidth: 240,
    collapseSiderWidth: 60,
    headerHeight: 60,
    bgColor: '#38475F',
  },
};

export { THEME_CONFIG };
