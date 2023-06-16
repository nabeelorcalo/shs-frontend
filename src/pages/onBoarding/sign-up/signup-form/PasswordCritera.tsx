import { useState, useEffect } from "react";
import { CheckCircleOutlined, CheckCircleFilled } from "@ant-design/icons";

const dot = new RegExp(/[.]/);
const smallLetter = new RegExp(/[a-z]/);
const capitalLetter = new RegExp(/[A-Z]/);
const number = new RegExp(/\d/);
const specialChar = new RegExp(/[*/@!#%&()$`',?";:-=+_|><^~{}\]]/);

const PasswordCritera = (props: any) => {
  const { value } = props;
  const [minLength, setMinLength] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasDot, setHasDot] = useState(true);

  const stateArray = [
    {
      id: minLength,
      error: "at least 8 characters",
    },
    {
      id: hasUpper,
      error: "one upper case letter",
    },
    {
      id: hasLower,
      error: "one lower case letter",
    },
    {
      id: hasSpecial,
      error: " one special character",
    },
    {
      id: hasNumber,
      error: "one number",
    },
    {
      id: hasDot,
      error: "cannot include a period",
    },
  ];

  useEffect(() => {
    setMinLength(value.length >= 8);
    setHasDot(!dot.test(value));
    setHasUpper(capitalLetter.test(value));
    setHasLower(smallLetter.test(value));
    setHasSpecial(specialChar.test(value));
    setHasNumber(number.test(value));
  }, [value]);

  return (
    <div className="password-criteria">
      <p className="teriary-light text-base font-semibold">
        Password must have:
      </p>

      {stateArray.map((e, index) => {
        return (
          <div key={index}>
            {!e.id && <CheckCircleFilled className="text-success-placeholder-color" />}
            {e.id && <CheckCircleFilled className="teriary-color" />}
            <span className="text-[#4E4B66] text-sm font-normal ml-3">
              {e.error}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordCritera;
