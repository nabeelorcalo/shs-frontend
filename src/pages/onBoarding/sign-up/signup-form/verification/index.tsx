import IdentityVerification from "./IdentityVerification";
import Address from "./Address";
import Documents from "./Documents";
import DbsVerification from "./DbsVerification";
import UniversityDetails from "./UniversityDetails";
import Photograph from "./Photograph";
import Video from "./Video";
import React from "react";
import { useState } from "react";

function VerificationSteps(props: any) {
  const [currentStep, setCurrentStep] = useState(4);

  switch (currentStep) {
    case 1: {
      return <IdentityVerification />;
    }
    case 2: {
      return <DbsVerification />;
    }
    case 3: {
      return <UniversityDetails />;
    }
    case 4: {
      return <Documents />;
    }
    case 5: {
      return <Address />;
    }
    case 6: {
      return <Photograph />;
    }
    case 7: {
      return <Video />;
    }
    default:
      return <p>Something went wrong!</p>;
  }
}

export default VerificationSteps;
