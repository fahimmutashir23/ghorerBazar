import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
  

const chartConfig = {
  desktop: {
    label: "Sale ",
    color: "blue",
  },
}

const BarCharts = ({monthlySale}) => {
    const chartData = [
        { month: "January", sale: monthlySale.month === 1 ? monthlySale.amount : 0 },
        { month: "February", sale: monthlySale.month === 2 ? monthlySale.amount : 0 },
        { month: "March", sale: monthlySale.month === 3 ? monthlySale.amount : 0 },
        { month: "April", sale: monthlySale.month === 4 ? monthlySale.amount : 0 },
        { month: "May", sale: monthlySale.month === 5 ? monthlySale.amount : 0 },
        { month: "June", sale: monthlySale.month === 6 ? monthlySale.amount : 0 },
        { month: "July", sale: monthlySale.month === 7 ? monthlySale.amount : 0 },
        { month: "August", sale: monthlySale.month === 8 ? monthlySale.amount : 0 },
        { month: "September", sale: monthlySale.month === 9 ? monthlySale.amount : 0 },
        { month: "October", sale: monthlySale.month === 10 ? monthlySale.amount : 0 },
        { month: "November", sale: monthlySale.month === 11 ? monthlySale.amount : 0 },
        { month: "December", sale: monthlySale.month === 12 ? monthlySale.amount : 0 },
      ]

  return (
    <Card className ="bg-gray-100 shadow-md border-2 border-red-300">
      <CardHeader>
        <CardTitle>Sales Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              className="bg-white text-lg"
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sale" fill="blue" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarCharts