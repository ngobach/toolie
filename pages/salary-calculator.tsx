import Layout from "@/components/Layout";
import { Alert, Button, Form, Input } from "antd";
import Head from "next/head";

export default function SalaryCalculatorPage() {
  return (
    <>
      <Head>
        <title>Salary Calculator</title>
      </Head>
      <Layout title="Salary Calculator">
        <div className="mt-4">
          <Alert
            type="info"
            message="Currency used is Vietnam Dong (VND)"
            showIcon
            closable
          />
        </div>

        <div className="mt-4">
          <Form layout="inline">
            <Form.Item name="base" label="Base Salary">
              <Input placeholder="10.000.000" />
            </Form.Item>

            <Form.Item name="salaryMonths" label="Salary Months">
              <Input placeholder="14" />
            </Form.Item>

            <Form.Item>
              <Button type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  )
}
