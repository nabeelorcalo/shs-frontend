import React from 'react';
const IconWalletCheck = ({ fillP, fillS }: any) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 15C2.79 15 1 16.79 1 19C1 19.75 1.21 20.46 1.58 21.06C2.27 22.22 3.54 23 5 23C6.46 23 7.73 22.22 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15ZM6.97 18.67L4.84 20.64C4.7 20.77 4.51 20.84 4.33 20.84C4.14 20.84 3.95 20.77 3.8 20.62L2.81 19.63C2.52 19.34 2.52 18.86 2.81 18.57C3.1 18.28 3.58 18.28 3.87 18.57L4.35 19.05L5.95 17.57C6.25 17.29 6.73 17.31 7.01 17.61C7.29 17.91 7.27 18.39 6.97 18.67Z" fill={fillS ?? "#8686A3"} />
      <path d="M17.7475 7.04997C17.5075 7.00997 17.2575 6.99998 16.9975 6.99998H6.9975C6.7175 6.99998 6.4475 7.01998 6.1875 7.05998C6.3275 6.77998 6.5275 6.52001 6.7675 6.28001L10.0175 3.02C11.3875 1.66 13.6075 1.66 14.9775 3.02L16.7275 4.78996C17.3675 5.41996 17.7075 6.21997 17.7475 7.04997Z" fill={fillS ?? "#8686A3"} />
      <path d="M22 12V17C22 20 20 22 17 22H7.63C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15C3.8 15 2.73 15.53 2 16.36V12C2 9.28 3.64 7.38 6.19 7.06C6.45 7.02 6.72 7 7 7H17C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12Z" fill={fillP ?? "white"}/>
      <path d="M22 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H22" fill={fillS ?? "#8686A3"} />
    </svg>
  )
}

export default IconWalletCheck
