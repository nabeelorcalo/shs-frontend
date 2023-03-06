import DashboardCharts from './dashboard-chart/DashboardCharts'
import GrievanceStats from './grievanceStats/grievanceStats'
import InternshipSummaryChart from './intershipSummaryChart/internshipSummaryChart'
import MonthlyPerfomanceChart from './monthly-perfomance-chart/MonthlyPerfomanceChart'
import OverAllPerfomance from './overAll-perfomance-charts/OverAllPerfomance'
import { OverAllRPerfomanceData } from './overAll-perfomance-charts/perfomance'
import PerformanceAnalytics from './performanceAnalytics/performanceAnalytics'
import TimesheetCategories from './timesheetCategories/timesheetCategories'
import WorkingStatisticesChart from './workingStatisticesChart/workingStatisticesChart'

const Charts = () => {
    return (
        <div>
            <DashboardCharts />
            <MonthlyPerfomanceChart />
            <OverAllPerfomance data={OverAllRPerfomanceData} />
            <WorkingStatisticesChart />
            <TimesheetCategories />
            <PerformanceAnalytics />
            <GrievanceStats statsHeading="Grievance Stats" />
            <InternshipSummaryChart/>
        </div>
    )
}

export default Charts