import { useRecoilValue } from "recoil";
import { postalCodeState } from "../store/CountryList";

const postalCode = () => {
  let regex: any = "";
  const postalCodes = useRecoilValue(postalCodeState);

  const makeRegex = (countryName: string) => {
    
    if (countryName === "United Kingdom") {
      regex = new RegExp(
        "(GIR 0AA)|((([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][ABCDEFGHJKSTUW])|([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][ABEHMNPRVWXY])))) [0-9][ABDEFGHJLNPQRSTUWXYZ]{2})"
      );
    } else {
      regex = postalCodes[`${countryName}`];
    }
    return regex;
  };

  return { makeRegex };
};

export default postalCode;
