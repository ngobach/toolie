import '@/assets/styles/index.css'
import { Inter } from '@next/font/google'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="app" className={inter.className}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: inter.style.fontFamily,
          },
        }}
      >
        <StyleProvider
          ssrInline
          hashPriority="high"
        >
          <Component {...pageProps} />
        </StyleProvider>
      </ConfigProvider>
    </div>
  )
}
