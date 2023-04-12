export const header = [
  { header: 'No.', dataKey: 'no' },
  { header: 'Avatar', dataKey: 'avatar', width: 20, cellRenderer: renderAvatar },
  { header: 'Name', dataKey: 'name' },
  { header: 'Department', dataKey: 'department' },
  { header: 'Last Evaluation', dataKey: 'date' },
  { header: 'Evaluated By', dataKey: 'evaluatedBy' },
  { header: 'Total Evaluations', dataKey: 'totalEvaluations' },
  { header: 'Overall Performance', dataKey: 'performance' },
];

export const tableData = [
  {
    id: 1,
    no: 1,
    name: 'Mino Marina',
    department: 'UI UX Designer',
    evaluatedBy: 'Mino Marina',
    date: '22/09/2022',
    totalEvaluations: '08',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    performance: 40,
    isBadge: true,
  },
  {
    id: 2,
    no: 2,
    name: 'Mino Marina',
    department: 'UI UX Designer',
    evaluatedBy: 'Mino Marina',
    date: '22/09/2022',
    totalEvaluations: '08',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    performance: 80,
    isBadge: false,
  },
  {
    id: 3,
    no: 3,
    name: 'Mino Marina',
    department: 'UI UX Designer',
    evaluatedBy: 'Mino Marina',
    date: '22/09/2022',
    totalEvaluations: '08',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    performance: 50,
    isBadge: true,
  },
  {
    id: 4,
    no: 4,
    name: 'Mino Marina',
    department: 'UI UX Designer',
    evaluatedBy: 'Mino Marina',
    date: '22/09/2022',
    totalEvaluations: '08',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    performance: 30,
    isBadge: false,
  },
  {
    id: 5,
    no: 5,
    name: 'Mino Marina',
    department: 'UI UX Designer',
    evaluatedBy: 'Mino Marina',
    date: '22/09/2022',
    totalEvaluations: '08',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    performance: 100,
    isBadge: true,
  },
];

function renderAvatar(cellDataKey: any, cellOptions: any) {
  const img = new Image();
  img.src = cellDataKey;
  img.width = cellOptions.row.raw.avatarWidth;
  img.height = cellOptions.row.raw.avatarHeight;
  return img;
}