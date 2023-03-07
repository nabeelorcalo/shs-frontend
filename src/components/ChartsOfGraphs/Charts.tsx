import DashboardCharts from './dashboard-chart/DashboardCharts'
import GrievanceStats from './grievanceStats/grievanceStats'
import InternshipSummaryChart from './intershipSummaryChart/internshipSummaryChart'
import MonthlyPerfomanceChart from './monthly-perfomance-chart/MonthlyPerfomanceChart'
import OverAllPerfomance from './overAll-perfomance-charts/OverAllPerfomance'
import { OverAllRPerfomanceData } from './overAll-perfomance-charts/perfomance'
import TimesheetCategories from './timesheetCategories/timesheetCategories'
import WorkingStatisticesChart from './workingStatisticesChart/workingStatisticesChart'

import { perfomanceChart } from './monthly-perfomance-chart/MonthlyPerfomance'
import { propertiesStatsData } from './chartsMockData/propertiesStats'
import { AttendanceDepartmentData } from './chartsMockData/AttendanceDepartmentData'

const Charts = () => {
    return (
        <div>
            <DashboardCharts heading={"System Storage"} usedSpace={"GB Used"} freeSpace={"GB Free"} />
            <MonthlyPerfomanceChart data={perfomanceChart} heading={"Monthly Perfomance"} />
            <OverAllPerfomance heading={"Overall Performance"} data={OverAllRPerfomanceData} />
            <WorkingStatisticesChart heading={"Work Statistices"} />
            <TimesheetCategories heading={"Categories"} />
            <MonthlyPerfomanceChart heading={"Perfomance Analytics"} data={perfomanceChart} />
            <GrievanceStats statsHeading="Grievance Stats" />
            <InternshipSummaryChart heading={"Internship Summary"} />
            <MonthlyPerfomanceChart
                heading={"Attendance By department"}
                columnWidthRatio={.5} columnStyle={{ radius: [5, 5, 0, 0] }}
                color={['#4A9D77', '#E95060', '#FFC15D']} data={AttendanceDepartmentData} />
            <MonthlyPerfomanceChart heading={"Properties Stats"} color={['#4A9D77', '#E95060', '#FFC15D']} data={propertiesStatsData} />
        </div>
    )
}

export default Charts