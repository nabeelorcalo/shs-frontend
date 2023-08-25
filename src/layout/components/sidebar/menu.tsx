import React from 'react'
import { useRecoilValue } from "recoil";
import { currentUserState, IconPColorState, IconSColorState } from '../../../store';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number]
import { ROUTES_CONSTANTS } from '../../../config/constants'
import {
  IconTeacher,
  IconDelegateAgent,
  IconHeadset,
  IconActivity,
  IconClipboardText,
  IconDiscountShape,
  IconMouseSquare,
  IconEmptyWalletAdd,
  IconWithdrawal,
} from '../../../assets/images';
import {
  IconDashboard,
  IconPeoples,
  IconEdit,
  IconClipboardTick,
  IconTaskSquare,
  IconProfileUsers,
  IconProfileCircle,
  IconCourtHouse,
  IconData,
  IconCalendarTick,
  IconCalendarRemove,
  IconTimer,
  IconChart,
  IconDocument,
  IconWalletCheck,
  IconLikeShapes,
  IconEmojiSad,
  IconCertificate,
  IconCalendar,
  IconSettings,
  IconPersonalisation,
  IconGift,
  IconFolder,
  IconRanking,
  IconHouse,
  IconRecipes,
  IconBriefcase,
  IconDocumentText,
  IconUserProfile
} from './icons'


const useMenuHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const currentUser = useRecoilValue(currentUserState);
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
  if (currentUser?.isDelegate) {
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
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    // RECRUITMENT GROUP
    getItem('Recruitment', 'recruitment', null, [
      getItem('Candidates', `/${CANDIDATES}`, <IconPeoples fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Internships', `/${INTERNSHIPS}`, <IconEdit fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Offer Letters', `/${OFFER_LETTER}`, <IconClipboardTick fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Contracts', `/${CONTRACTS}`, <IconTaskSquare fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // PEOPLE GROUP
    getItem('People', 'people', null, [
      getItem('Interns', `/${INTERNS}`, <IconProfileUsers fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Managers', `/${MANAGERS}`, <IconProfileCircle fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Universities', `/${UNIVERSITIES}`, <IconCourtHouse fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Structure', `/${STRUCTURE}`, <IconData fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Timesheet', `/${TIMESHEET}`, <IconTimer fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Documents', `/${DOCUMENTS}`, <IconDocument fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Payroll', `/${PAYROLL}`, <IconWalletCheck fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // REPORTS GROUP
    getItem('Report', 'report', null, [
      getItem('Case Studies', `/${CASE_STUDIES}`, <IconLikeShapes fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Certificates', `/${CERTIFICATES}`, <IconCertificate fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // SETUP GROUP
    getItem('Setup', 'setup', null, [
      getItem('Settings', `/${SETTING}/location`, <IconSettings fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Personalisation', `/${PERSONALISATION}`, <IconPersonalisation fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
  ]

  // Role Manager Menu Items
  const itemsManager: MenuProps['items'] = [
    getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Internships', `/${INTERNSHIPS}`, <IconEdit fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Interns', `/${INTERNS}`, <IconProfileUsers fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Timesheet', `/${TIMESHEET}`, <IconTimer fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Documents', `/${DOCUMENTS}`, <IconDocument fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Structure', `/${STRUCTURE}`, <IconData fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // REPORTS GROUP
    getItem('Report', 'report', null, [
      getItem('Case Studies', `/${CASE_STUDIES}`, <IconLikeShapes fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
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
    getItem('Dashboard', `/${DASHBOARD}`,<IconDashboard fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    // ORGANIZATION GROUP
    getItem('Organisation', 'organisation', null, [
      getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Timesheet', `/${TIMESHEET}`, <IconTimer fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Performance', `/${PERFORMANCE}`, <IconChart fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Structure', `/${STRUCTURE}`, <IconData fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // REPORTS GROUP
    getItem('Report', 'report', null, [
      getItem('Self Assessment', `/${SELF_ASSESSMENT}`, <IconLikeShapes fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // PERSONAL GROUP
    getItem('Personal', 'personal', null, [
      getItem('DigiVault', `/${DIGIVAULT}`, <IconFolder fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Dream Up', `/${DREAM_UP}`, <IconRanking fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Payments', `/${PAYMENTS}`, <IconWalletCheck fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Calendar', `/${CALENDAR}`, <IconCalendar fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
    ], 'group'),
    // DISCOVER GROUP
    getItem('Discover', 'discover', null, [
      getItem('Accommodation', `/${ACCOMMODATION}`, <IconHouse fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Recipes', `/${RECIPES}`, <IconRecipes fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />),
      getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift fillP={currentUser?.company?.sideMenuIconPrimaryColor} fillS={currentUser?.company?.sideMenuIconSecondaryColor} />)
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
