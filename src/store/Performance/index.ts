import { atom } from 'recoil';


export const allPerformanceState = atom({
  key: 'allPerformanceState',
  default: [],
});

export const allPerformancesfilterParamsState = atom({
  key: 'allPerformancesfilterParamsState',
  default: {
    page: 1,
    limit: 5
  },
});

const data = {
  evalDate: 'June 18, 2019',
  evaluatedBy: {
    name: 'Calvin Grayson',
    role: 'Manager',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png'
  },
  learningObjectives: {
    percentage: '74',
    questions: [
      {
        title: 'Works to full potential',
        value: 2
      },
      {
        title: 'Quality of work',
        value: 3
      },
      {
        title: 'Work Consistency',
        value: 4
      },
      {
        title: 'Independency in work',
        value: null
      },
      {
        title: 'Business skills',
        value: 3
      },
      {
        title: 'Technical skills',
        value: 4
      }
    ]
  },
  discipline: {
    percentage: '80',
    questions: [
      {
        title: 'Punctuality',
        value: null
      },
      {
        title: 'Attendance',
        value: 4
      },
      {
        title: 'Coworker relationship',
        value: 3
      },
      {
        title: 'Team work',
        value: 2
      },
    ]
  },
  personal: {
    percentage: '80',
    questions: [
      {
        title: 'Creativity',
        value: 2
      },
      {
        title: 'Honesty',
        value: 4
      },
      {
        title: 'Integrity',
        value: 3
      },
      {
        title: 'Communication skills',
        value: 2
      },
      {
        title: 'Task Initiatives',
        value: 3
      },
    ]
  },
  comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
}

export const evaluationState = atom({
  key: 'evaluationState',
  default: data
});