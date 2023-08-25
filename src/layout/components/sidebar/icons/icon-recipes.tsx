import React from 'react';
const IconRecipes = ({ fillP, fillS }:any) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.1517 18.698H5.51885C5.26807 18.698 5.06476 18.9013 5.06429 19.1521L5.0625 20.4775C5.06207 20.9734 5.25469 21.4395 5.60493 21.7901C5.9556 22.1413 6.42123 22.3344 6.91709 22.3344H17.7516C18.7743 22.3344 19.6062 21.5025 19.6062 20.4798V19.1525C19.6062 18.9013 19.4029 18.698 19.1517 18.698Z" fill={fillS ?? "#8686A3"} />
      <path d="M17.334 4.15218C17.0557 4.15218 16.7698 4.18014 16.467 4.23651C15.427 3.02377 13.9364 2.33398 12.334 2.33398C9.32619 2.33398 6.87945 4.78073 6.87945 7.78853C6.87945 8.03931 6.67571 8.24309 6.42489 8.24309C6.17411 8.24309 5.97033 8.03936 5.97033 7.78853C5.97033 6.80441 6.19673 5.85225 6.64328 4.95873C6.72276 4.79982 6.7023 4.60938 6.59134 4.47089C6.48037 4.33329 6.29879 4.27201 6.12659 4.3142C3.89339 4.87129 2.33398 6.86079 2.33398 9.15217C2.33398 11.0414 3.39932 12.7588 5.07191 13.6079L5.06701 17.3335C5.06701 17.4538 5.11452 17.5697 5.19975 17.6553C5.2854 17.7406 5.40084 17.7885 5.52156 17.7885H19.1522C19.4034 17.7885 19.6067 17.5852 19.6067 17.334V13.6012C21.2731 12.7499 22.334 11.0351 22.334 9.15213C22.3339 6.39515 20.091 4.15218 17.334 4.15218ZM8.98613 14.9583C8.90133 15.0275 8.79927 15.0613 8.69807 15.0613C8.56669 15.0613 8.43616 15.0045 8.34608 14.8953C8.19604 14.7119 6.87945 13.0731 6.87945 11.8794C6.87945 11.6282 7.08276 11.4249 7.33401 11.4249C7.58526 11.4249 7.78856 11.6282 7.78856 11.8794C7.78856 12.5373 8.56183 13.7243 9.0492 14.3182C9.20807 14.5126 9.18011 14.7989 8.98613 14.9583ZM12.7885 14.6067C12.7885 14.858 12.5852 15.0613 12.3339 15.0613C12.0827 15.0613 11.8794 14.858 11.8794 14.6067V11.8794C11.8794 11.6282 12.0827 11.4249 12.334 11.4249C12.5852 11.4249 12.7885 11.6282 12.7885 11.8794V14.6067H12.7885ZM16.3219 14.8953C16.2318 15.0045 16.1017 15.0613 15.9703 15.0613C15.8687 15.0613 15.7666 15.0275 15.6823 14.9583C15.4883 14.7989 15.4599 14.5126 15.6188 14.3187C16.1062 13.7234 16.8794 12.5351 16.8794 11.8794C16.8794 11.6282 17.0827 11.4249 17.334 11.4249C17.5852 11.4249 17.7885 11.6282 17.7885 11.8794C17.7885 13.0731 16.4719 14.7119 16.3219 14.8953Z" fill={fillP ?? "white"} />
    </svg>
  )
}

export default IconRecipes
