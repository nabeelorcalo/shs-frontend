import { PhoneNumberUtil } from 'google-libphonenumber';

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

export const PhoneValidator = (phone: any, value: string) => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const isValid = isPhoneValid(phone);

  if (phone && !isValid) {
    return Promise.reject('Invalid Phone Number');
  }

  if (value === '') {
    return Promise.reject('Required Field');
  }

  return Promise.resolve();
}