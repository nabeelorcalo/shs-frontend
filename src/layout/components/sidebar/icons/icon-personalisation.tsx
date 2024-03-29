import React from 'react';
const IconPersonalisation = ({ fillP, fillS }: any) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4303 15.0004H4.40034C2.58034 15.0004 1.42034 13.0505 2.30034 11.4505L4.63034 7.21043L6.81034 3.24043C7.72034 1.59043 10.1003 1.59043 11.0103 3.24043L13.2003 7.21043L14.2503 9.12043L15.5303 11.4505C16.4103 13.0505 15.2503 15.0004 13.4303 15.0004Z" fill={fillS ?? "#8686A3"} />
      <path d="M22 15.5C22 19.09 19.09 22 15.5 22C11.91 22 9 19.09 9 15.5C9 15.33 9.01 15.17 9.02 15H13.43C15.25 15 16.41 13.05 15.53 11.45L14.25 9.12C14.65 9.04 15.07 9 15.5 9C19.09 9 22 11.91 22 15.5Z" fill={fillP ?? "white"} />
    </svg>
  )
}

export default IconPersonalisation
