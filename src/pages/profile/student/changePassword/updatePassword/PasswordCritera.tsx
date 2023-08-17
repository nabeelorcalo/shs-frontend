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
  const [hasNoSpace, setHasNoSpace] = useState(true);

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
    {
      id: hasNoSpace,
      error: "cannot include a space",
    },
  ];

  useEffect(() => {
    setMinLength(value.length >= 8);
    setHasDot(!dot.test(value));
    setHasUpper(capitalLetter.test(value));
    setHasLower(smallLetter.test(value));
    setHasSpecial(specialChar.test(value));
    setHasNumber(number.test(value));
    setHasNoSpace(!/\s/.test(value));
  }, [value]);

  return (
    <div className="password-criteria">
      <p style={{ color: "#343A40", fontSize: "16px", fontWeight: 600 }}>
        Password must have:
      </p>

      {stateArray.map((e, index) => {
        return (
          <div key={index} className="flex items-center gap-x-2">
            {!e.id && <CheckCircleFilled className="gray-color" />}
            {e.id && <CheckCircleFilled className="teriary-color" />}
            <span className="font-normal text-sm text-secondary-color">{e.error}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordCritera;
