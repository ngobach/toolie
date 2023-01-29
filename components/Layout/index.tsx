import Image from "next/image"
import Link from "next/link"
import { Menu } from 'antd';
import { PropsWithChildren } from "react"
import { useRouter } from "next/router";

type Props = PropsWithChildren & {
  title?: string
}

export default function Layout({ children, title }: Props) {
  const router = useRouter();
  const path = router.pathname.replace(/^\/([a-z0-9-]+).*/i, '$1');

  return (
    <div id="layout" className="container mx-auto px-4">
      <div className="mt-1">
        <div className="flex items-center justify-start">
          <Image
            src={require('@/assets/images/logo-48x48.png')}
            alt="logo"
            width={48}
            height={48}
            quality={100}
          />

          <div>
            <Link href="/" className="leading-none uppercase font-bold text-xl text-sky-600">
              Toolie
            </Link>

            <div className="leading-none uppercase text-gray-400 text-xs">
              by ngobach.com
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex">
        <div className="w-[200px] flex-none mr-4">
          <Menu
            items={[
              { key: 'salary-calculator', label: 'Salary Calculator' },
              { key: 'interest-calculator', label: 'Loan Interest Calculator' },
            ]}
            selectedKeys={[path]}
            onClick={e => router.push(`/${e.key}`)}
          />
        </div>

        <div className="flex-1">
          {title && (
            <h1 className="mb-1 font-bold">
              {title}
            </h1>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}
