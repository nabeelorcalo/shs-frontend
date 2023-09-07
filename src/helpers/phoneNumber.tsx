import { PhoneNumberUtil } from 'google-libphonenumber';
import { useRecoilValue } from 'recoil';
import { callingCodesState } from '../store/CountryList';

const PhoneNumberHook = () => {
  const callingCodes = useRecoilValue(callingCodesState);

  // Get phone calling code like "+1", "+91", "+44"
  const extractCountryCode = (phoneString: string) => {
    const startsWithPlusSign = phoneString.startsWith("+");

    if (startsWithPlusSign) {
      const countryCode = phoneString.substring(0, phoneString.indexOf(" "));
      return countryCode;
    } else {
      return null;
    }
  }

  // Get phone number string like "+1 (111) 111-1111"
  const extractPhoneNumber = (phoneString: string) => {
    const spaceIndex = phoneString.indexOf(" ");

    const remainingPhoneString = phoneString.substring(spaceIndex + 1);

    return remainingPhoneString;
  }

  // Calling codes
  const countryFlagCode = () => {
    return callingCodes;
  }

  // Phone input field validation
  const PhoneValidator = (phone: any, value: string) => {
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

  return {
    extractCountryCode,
    extractPhoneNumber,
    countryFlagCode,
    PhoneValidator,
  }
}

export default PhoneNumberHook;