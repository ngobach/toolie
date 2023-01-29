import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Toolie
        </title>
      </Head>

      <Layout title="Toolie">
        <div className="text-sm">
          A collection of tools.
        </div>
      </Layout>
    </>
  )
}
