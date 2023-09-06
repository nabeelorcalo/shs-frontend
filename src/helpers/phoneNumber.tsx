export const extractCountryCode = (phoneString: string) => {
  const startsWithPlusSign = phoneString.startsWith("+");

  if (startsWithPlusSign) {
    const countryCode = phoneString.substring(0, phoneString.indexOf(" "));
    return countryCode;
  } else {
    return null;
  }
}

export const extractPhoneNumber = (phoneString: string) => {
  const spaceIndex = phoneString.indexOf(" ");

  const remainingPhoneString = phoneString.substring(spaceIndex + 1);

  return remainingPhoneString;
}