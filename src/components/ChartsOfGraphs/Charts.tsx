import DashboardCharts from './dashboard-chart/DashboardCharts'
import MonthlyPerfomanceChart from './monthly-perfomance-chart/MonthlyPerfomanceChart'
import OverAllPerfomance from './overAll-perfomance-charts/OverAllPerfomance'
import { OverAllRPerfomanceData } from './overAll-perfomance-charts/perfomance'

const Charts = () => {
    return (
        <div>
            <DashboardCharts />
            <MonthlyPerfomanceChart />
            <OverAllPerfomance data={OverAllRPerfomanceData}  />
        </div>
    )
}

export default Charts