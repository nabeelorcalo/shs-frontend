import React from 'react'
import { useRecoilValue } from "recoil";
import { currentUserState } from '../../../store';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number]
import { ROUTES_CONSTANTS } from '../../../config/constants'
import {
  IconDashboard,
  IconProfileCircle,
  IconBriefcase,
  IconClipboardTick,
  IconDocumentText,
  IconTaskSquare,
  IconUserProfile,
  IconFolder,
  IconRanking,
  IconCalendar,
  IconHouse,
  IconRecipes,
  IconGift,
  IconCalendarTick,
  IconChart,
  IconTeacher,
  IconLikeShapes,
  IconProfileUsers,
  IconPeoples,
  IconCourtHouse,
  IconDelegateAgent,
  IconHeadset,
  IconActivity,
  IconClipboardText,
  IconDiscountShape,
  IconMouseSquare,
  IconCalendarRemove,
  IconTimer,
  IconData,
  IconEmojiSad,
  IconEdit,
  IconDocument,
  IconWalletCheck,
  IconEmptyWalletAdd,
  IconWithdrawal
} from '../../../assets/images'
import useCustomHook from '../../../pages/personalisation/actionHandler';


const useMenuHook = () => {
  const { sIconsColor, pIconsColor } = useCustomHook();

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { isDelegate } = useRecoilValue(currentUserState);
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

  let earnWithusItem: any;
  if (isDelegate) {
    earnWithusItem = getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />)
  }

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  // Role SystemAdmin Menu Items
  const itemsSystemAdmin: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    // USER MANAGEMENT GROUP
    getItem('User Management', 'user-management', null, [
      getItem('Students', `/${STUDENT}`, <IconTeacher />),
      getItem('Universities', `/${UNIVERSITIES}`, <IconCourtHouse />),
      getItem('Companies', `/${COMPANIES}`, <IconBriefcase />),
      getItem('Admin', `/${ADMIN}`, <IconProfileUsers />),
    ], 'group'),
    // AGENT MANAGEMENT
    getItem('Agent Management', 'agent-management', null, [
      getItem('Delegate Agent  ', `/${DELEGATE_AGENT}`, <IconDelegateAgent />),
      getItem('Property Agent', `/${PROPERTY_AGENT}`, <IconPeoples />),
    ], 'group'),
    // SUPPORT GROUP
    getItem('Support', 'support', null, [
      getItem('Help Desk', `/${HELP_DESK}`, <IconHeadset />),
      getItem('Activity Log', `/${ACTIVITY_LOG}`, <IconActivity />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />),
    ], 'group'),
  ]

  // Role CompanyAdmin Menu Items
  const itemsCompanyAdmin: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard fill={pIconsColor} second={sIconsColor} />),
    // RECRUITMENT GROUP
    getItem('Recruitment', 'recruitment', null, [
      getItem('Candidates', `/${CANDIDATES}`, <IconPeoples fill={pIconsColor} second={sIconsColor} />),
      getItem('Internships', `/${INTERNSHIPS}`, <IconEdit />),
      getItem('Offer Letters', `/${OFFER_LETTER}`, <IconClipboardTick />),
      getItem('Contracts', `/${CONTRACTS}`, <IconTaskSquare />),
    ], 'group'),
    // PEOPLE GROUP
    getItem('People', 'people', null, [
      getItem('Interns', `/${INTERNS}`, <IconProfileUsers />),
      getItem('Managers', `/${MANAGERS}`, <IconProfileCircle />),
      getItem('Universities', `/${UNIVERSITIES}`, <IconCourtHouse />),
    ], 'group'),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Structure', `/${STRUCTURE}`, <IconData />),
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
      getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove />),
      getItem('Timesheets', `/${TIMESHEET}`, <IconTimer />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
      getItem('Documents', `/${DOCUMENTS}`, <IconDocument />),
      getItem('Payroll', `/${PAYROLL}`, <IconWalletCheck />),
    ], 'group'),
    // REPORTS GROUP
    getItem('Report', 'report', null, [
      getItem('Case Studies', `/${CASE_STUDIES}`, <IconLikeShapes />),
      getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad />),
      getItem('Certificates', `/${CERTIFICATES}`, <IconEmojiSad />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
    ], 'group'),
    // SETUP GROUP
    getItem('Setup', 'setup', null, [
      getItem('Settings', `/${SETTING}/location`, <IconCalendar />),
      getItem('Personalisation', `/${PERSONALISATION}`, <IconCalendar />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />),
    ], 'group'),
  ]

  // Role Manager Menu Items
  const itemsManager: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Internships', `/${INTERNSHIPS}`, <IconEdit />),
      getItem('Interns', `/${INTERNS}`, <IconProfileUsers />),
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
      getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove />),
      getItem('Timesheets', `/${TIMESHEET}`, <IconTimer />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
      getItem('Documents', `/${DOCUMENTS}`, <IconDocument />),
      getItem('Structure', `/${STRUCTURE}`, <IconData />),
    ], 'group'),
    // REPORTS GROUP
    getItem('Report', 'report', null, [
      getItem('Case Studies', `/${CASE_STUDIES}`, <IconLikeShapes />),
      getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />),
    ], 'group'),
  ];

  // Role Student Menu Items
  const itemsStudents: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    // JOB GROUP
    getItem('Jobs', 'jobs', null, [
      getItem('Search Jobs', `/${SEARCH_JOBS}`, <IconBriefcase />),
      getItem('Applications', `/${APPLICATION}`, <IconDocumentText />),
      getItem('Offer Letters', `/${OFFER_LETTER}`, <IconClipboardTick />),
      getItem('Contracts', `/${CONTRACTS}`, <IconTaskSquare />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('Profile', `/${PROFILE}`, <IconUserProfile />),
      getItem('DigiVault', `/${DIGIVAULT}`, <IconFolder />),
      getItem('Dream Up', `/${DREAM_UP}`, <IconRanking />),
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Accommodation', `/${ACCOMMODATION}`, <IconHouse />),
      getItem('Recipes', `/${RECIPES}`, <IconRecipes />),
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />)
    ], 'group'),
  ]

  // Role Interns Menu Items
  const itemsIntern: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
      getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove />),
      getItem('Timesheet', `/${TIMESHEET}`, <IconTimer />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
      getItem('Structure', `/${STRUCTURE}`, <IconData />),
    ], 'group'),
    // REPORTS GROUP
    getItem('Report', 'report', null, [
      getItem('Self Assessment', `/${SELF_ASSESSMENT}`, <IconLikeShapes />),
      getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('DigiVault', `/${DIGIVAULT}`, <IconFolder />),
      getItem('Dream Up', `/${DREAM_UP}`, <IconRanking />),
      getItem('Payments', `/${PAYMENTS}`, <IconWalletCheck />),
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Accommodation', `/${ACCOMMODATION}`, <IconHouse />),
      getItem('Recipes', `/${RECIPES}`, <IconRecipes />),
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />)
    ], 'group'),
  ]

  // Role University Menu Items
  const itemsUniversity: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    // PEOPLE GROUP
    getItem('People', 'people', null, [
      getItem('Students', `/${STUDENT}`, <IconTeacher />),
      getItem('Companies', `/${COMPANIES}`, <IconBriefcase />),
    ], 'group'),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
      getItem('Report', `/${REPORT}`, <IconLikeShapes />),
    ], 'group'),
  ]

  // Role PropertyAgent Menu Items
  const itemsPropertyAgent: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    getItem('Listings', `/${LISTINGS}`, <IconClipboardText />),
    getItem('Offers', `/${OFFERS}`, <IconDiscountShape />),
    getItem('Reservations', `/${RESERVATIONS}`, <IconMouseSquare />),
  ]

  // Role DelegateAgent Menu Items
  const itemsDelegateAgent: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
    getItem('Delegate Members', `/${DELEGATE_MEMEBERS}`, <IconPeoples />),
    getItem('Withdrawal Request', `/${WITHDRAWAL_REQUEST}`, <IconEmptyWalletAdd />),
    getItem('Withdrawals', `/${WITHDRAWALS}`, <IconWithdrawal />),
  ]

  return {
    itemsManager,
    itemsStudents,
    itemsUniversity,
    itemsPropertyAgent,
    itemsSystemAdmin,
    itemsIntern,
    itemsDelegateAgent,
    itemsCompanyAdmin
  }

}

export default useMenuHook
