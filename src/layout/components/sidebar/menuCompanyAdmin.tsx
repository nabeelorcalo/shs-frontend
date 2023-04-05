import React from 'react'
import {
  IconDashboard,
  IconCalendarTick,
  IconCalendarRemove,
  IconTimer,
  IconChart,
  IconData,
  IconEdit,
  IconProfileUsers,
  IconDocument,
  IconPeoples,
  IconClipboardTick,
  IconTaskSquare,
  IconProfileCircle,
  IconCourtHouse,
  IconLikeShapes,
  IconEmojiSad,
  IconWalletCheck,
  IconCalendar
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, CANDIDATES, INTERNSHIPS, OFFER_LETTER, CONTRACTS, INTERNS, MANAGERS, UNIVERSITIES, STRUCTURE, ATTENDANCE, LEAVES, TIMESHEET, PERFORMANCE, DOCUMENTS, PAYROLL, CASE_STUDIES, GRIEVANCES, CERTIFICATES, CALENDAR, SETTING, PERSONALISATION  } = ROUTES_CONSTANTS
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number]
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

export const itemsCompanyAdmin: MenuProps['items'] = [
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),

  // RECRUITMENT GROUP
  getItem('Recruitment', 'recruitment', null, [
    getItem('Candidates', `/${CANDIDATES}`, <IconPeoples />),
    // getItem('Internships', `/${INTERNSHIPS}`, <IconEdit />),
    getItem('Offer Letters', `/${OFFER_LETTER}`, <IconClipboardTick />),
    getItem('Contracts', `/${CONTRACTS}`, <IconTaskSquare />),
  ], 'group'),

  // PEOPLE GROUP
  getItem('People', 'people', null, [
    // getItem('Interns', `/${INTERNS}`, <IconProfileUsers />),
    // getItem('Managers', `/${MANAGERS}`, <IconProfileCircle />),
    getItem('Universities', `/${UNIVERSITIES}`, <IconCourtHouse />),
  ], 'group'),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Structure', `/${STRUCTURE}`, <IconData />),
    getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
    getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove />),
    getItem('Timesheets', `/${TIMESHEET}`, <IconTimer />),
    getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
    // getItem('Documents', `/${DOCUMENTS}`, <IconDocument />),
    // getItem('Payroll', `/${PAYROLL}`, <IconWalletCheck />),
  ], 'group'),

  // REPORTS GROUP
  getItem('Report', 'report', null, [
    getItem('Case Studies', `/${CASE_STUDIES}`, <IconLikeShapes />),
    getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad />),
    getItem('Certificates', `/${CERTIFICATES}`, <IconEmojiSad />),
  ], 'group'),

  // PERSONAL GROUP
  // getItem('Personal', 'personal', null, [
  //   getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
  // ], 'group'),

  // SETUP GROUP
  getItem('Setup', 'setup', null, [
    getItem('Settings', `/${SETTING}/location`, <IconCalendar />),
    // getItem('Personalisation', `/${PERSONALISATION}`, <IconCalendar />),
  ], 'group'),
]
