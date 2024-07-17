'use client';
import styles from '@/components/dashboard/chart/chart.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'CSD',
      size: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'LC',
      size: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'SE',
      size: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'DSA',
      size: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'DC',
      size: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'CBAS',
      size: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'DE',
      size: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
const Chart = () => {
  return (
    <div className={styles.container}>
      <h2>Weekly Recap</h2> 
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="size" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer> 
    </div>
  )
}

export default Chart
