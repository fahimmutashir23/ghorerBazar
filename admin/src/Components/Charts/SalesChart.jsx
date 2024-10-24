import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
const chartData = [
  { month: "January", sale: 186 },
  { month: "February", sale: 305 },
  { month: "March", sale: 237 },
  { month: "April", sale: 73 },
  { month: "May", sale: 209 },
  { month: "June", sale: 214 },
  { month: "July", sale: 214 },
  { month: "August", sale: 0 },
  { month: "September", sale: 0 },
  { month: "October", sale: 0 },
  { month: "November", sale: 0 },
  { month: "December", sale: 0 },
]

const chartConfig = {
  desktop: {
    label: "Sale",
    color: "blue",
  },
}

const SalesChart = () => {
  return (
    <Card className ="bg-gray-100">
      <CardHeader>
        <CardTitle>Sales Chart</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid horizontal={true} vertical= {false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={4}
              className="font-semibold"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
              className="bg-white text-lg"
            />
            <Area
              dataKey="sale"
              type=""
              fill="blue"
              fillOpacity={0.6}
              stroke="black"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default SalesChart
