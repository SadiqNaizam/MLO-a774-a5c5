import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Assuming recharts for charts

// Example data - replace with actual data fetching and props
const exampleData = [
  { name: 'Jan', income: 4000, expenses: 2400, amt: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398, amt: 2210 },
  { name: 'Mar', income: 2000, expenses: 9800, amt: 2290 },
  { name: 'Apr', income: 2780, expenses: 3908, amt: 2000 },
  { name: 'May', income: 1890, expenses: 4800, amt: 2181 },
  { name: 'Jun', income: 2390, expenses: 3800, amt: 2500 },
  { name: 'Jul', income: 3490, expenses: 4300, amt: 2100 },
];

interface FinancialOverviewChartProps {
  // Props to pass data, configure chart type, etc.
  data?: typeof exampleData;
  title?: string;
  description?: string;
}

const FinancialOverviewChart: React.FC<FinancialOverviewChartProps> = ({
  data = exampleData,
  title = "Financial Overview",
  description = "Monthly income and expenses trend."
}) => {
  console.log("Rendering FinancialOverviewChart with data points:", data.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full"> {/* Set a fixed height for the chart container */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                itemStyle={{ color: '#333' }}
              />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
export default FinancialOverviewChart;