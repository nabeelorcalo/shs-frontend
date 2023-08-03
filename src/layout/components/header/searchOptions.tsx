import React from 'react'
import { ROUTES_CONSTANTS } from '../../../config/constants'


const useSearchOptions = () => {

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {
    DASHBOARD,
    SEARCH_JOBS,
    APPLICATION,
    OFFER_LETTER,
    CONTRACTS,
    PROFILE,
    DIGIVAULT,
    DREAM_UP,
    CALENDAR,
    ACCOMMODATION,
    RECIPES,
    EARN_WITH_US,
    STUDENT,
    COMPANIES,
    ATTENDANCE,
    PERFORMANCE,
    REPORT,
    UNIVERSITIES,
    ADMIN,
    DELEGATE_AGENT,
    PROPERTY_AGENT,
    HELP_DESK,
    ACTIVITY_LOG,
    LISTINGS,
    OFFERS,
    RESERVATIONS,
    INTERNSHIPS,
    INTERNS,
    LEAVES,
    TIMESHEET,
    DOCUMENTS,
    STRUCTURE,
    CASE_STUDIES,
    GRIEVANCES,
    SELF_ASSESSMENT,
    PAYMENTS,
    DELEGATE_MEMEBERS,
    WITHDRAWAL_REQUEST,
    WITHDRAWALS,
    CANDIDATES,
    MANAGERS,
    PAYROLL,
    CERTIFICATES,
    SETTING,
    PERSONALISATION
  } = ROUTES_CONSTANTS;


  // Role SystemAdmin Search Options
  const optionsSystemAdmin = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Students', link: `/${STUDENT}` },
    { value: 'Universities', link: `/${UNIVERSITIES}` },
    { value: 'Companies', link: `/${COMPANIES}` },
    { value: 'Admin', link: `/${ADMIN}` },
    { value: 'Delegate Agent', link: `/${DELEGATE_AGENT}` },
    { value: 'Property Agent', link: `/${PROPERTY_AGENT}` },
    { value: 'Help Desk', link: `/${HELP_DESK}` },
    { value: 'Activity Log', link: `/${ACTIVITY_LOG}` },
    { value: 'Earn With Us', link: `/${EARN_WITH_US}` },
  ]

  // Role CompanyAdmin Search Options
  const optionsCompanyAdmin = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Candidates', link: `/${CANDIDATES}` },
    { value: 'Internships', link: `/${INTERNSHIPS}` },
    { value: 'Offer Letters', link: `/${OFFER_LETTER}` },
    { value: 'Contracts', link: `/${CONTRACTS}` },
    { value: 'Interns', link: `/${INTERNS}` },
    { value: 'Managers', link: `/${MANAGERS}` },
    { value: 'Universities', link: `/${UNIVERSITIES}` },
    { value: 'Structure', link: `/${STRUCTURE}` },
    { value: 'Attendance', link: `/${ATTENDANCE}` },
    { value: 'Leaves', link: `/${LEAVES}` },
    { value: 'Timesheets', link: `/${TIMESHEET}` },
    { value: 'Performance', link: `/${PERFORMANCE}` },
    { value: 'Payroll', link: `/${PAYROLL}` },
    { value: 'Case Studies', link: `/${CASE_STUDIES}` },
    { value: 'Grievances', link: `/${GRIEVANCES}` },
    { value: 'Certificates', link: `/${CERTIFICATES}` },
    { value: 'Calendar', link: `/${CALENDAR}` },
    { value: 'Settings', link: `/${SETTING}/location` },
    { value: 'Personalisation', link: `/${PERSONALISATION}` },
    { value: 'Earn With Us', link: `/${EARN_WITH_US}` },
  ]

  // Role Manager Search Options
  const optionsManager = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Internships', link: `/${INTERNSHIPS}` },
    { value: 'Interns', link: `/${INTERNS}` },
    { value: 'Attendance', link: `/${ATTENDANCE}` },
    { value: 'Leaves', link: `/${LEAVES}` },
    { value: 'Timesheets', link: `/${TIMESHEET}` },
    { value: 'Performance', link: `/${PERFORMANCE}` },
    { value: 'Documents', link: `/${DOCUMENTS}` },
    { value: 'Structure', link: `/${STRUCTURE}` },
    { value: 'Case Studies', link: `/${CASE_STUDIES}` },
    { value: 'Grievances', link: `/${GRIEVANCES}` },
    { value: 'Calendar', link: `/${CALENDAR}` },
    { value: 'Earn With Us', link: `/${EARN_WITH_US}` },
  ]

  // Role Student Search Options
  const optionsStudents = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Search Jobs', link: `/${SEARCH_JOBS}` },
    { value: 'Applications', link: `/${APPLICATION}` },
    { value: 'Offer Letters', link: `/${OFFER_LETTER}` },
    { value: 'Contracts', link: `/${CONTRACTS}` },
    { value: 'Profile', link: `/${PROFILE}` },
    { value: 'Dream Up', link: `/${DREAM_UP}` },
    { value: 'Calendar', link: `/${CALENDAR}` },
    { value: 'Accommodation', link: `/${ACCOMMODATION}` },
    { value: 'Recipes', link: `/${RECIPES}` },
    { value: 'Earn With Us', link: `/${EARN_WITH_US}` },
  ]

  // Role Interns Search Options
  const optionsIntern = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Attendance', link: `/${ATTENDANCE}` },
    { value: 'Leaves', link: `/${LEAVES}` },
    { value: 'Timesheet', link: `/${TIMESHEET}` },
    { value: 'Performance', link: `/${PERFORMANCE}` },
    { value: 'Structure', link: `/${STRUCTURE}` },
    { value: 'Self Assessment', link: `/${SELF_ASSESSMENT}` },
    { value: 'Grievances', link: `/${GRIEVANCES}` },
    { value: 'DigiVault', link: `/${DIGIVAULT}` },
    { value: 'Dream Up', link: `/${DREAM_UP}` },
    { value: 'Payments', link: `/${PAYMENTS}` },
    { value: 'Calendar', link: `/${CALENDAR}` },
    { value: 'Accommodation', link: `/${ACCOMMODATION}` },
    { value: 'Recipes', link: `/${RECIPES}` },
    { value: 'Earn With Us', link: `/${EARN_WITH_US}` },
  ]

  // Role University Search Options
  const optionsUniversity = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Students', link: `/${STUDENT}` },
    { value: 'Companies', link: `/${COMPANIES}` },
    { value: 'Attendance', link: `/${ATTENDANCE}` },
    { value: 'Performance', link: `/${PERFORMANCE}` },
    { value: 'Report', link: `/${REPORT}` },
  ]

  // Role PropertyAgent Search Options
  const optionsPropertyAgent = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Listings', link: `/${LISTINGS}` },
    { value: 'Offers', link: `/${OFFERS}` },
    { value: 'Reservations', link: `/${RESERVATIONS}` },
  ]

  // Role DelegateAgent Search Options
  const optionsDelegateAgent = [
    { value: 'Dashboard', link: `/${DASHBOARD}` },
    { value: 'Delegate Members', link: `/${DELEGATE_MEMEBERS}` },
    { value: 'Withdrawal Request', link: `/${WITHDRAWAL_REQUEST}` },
    { value: 'Withdrawals', link: `/${WITHDRAWALS}` },
  ]

  return {
    optionsManager,
    optionsStudents,
    optionsUniversity,
    optionsPropertyAgent,
    optionsSystemAdmin,
    optionsIntern,
    optionsDelegateAgent,
    optionsCompanyAdmin
  }

}

export default useSearchOptions;
