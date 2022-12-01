import React, { useState } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BtnCopy = ({ strArrToCopy, specialChar }) => {
  const generateCopyText = (strArr, char) => {
    console.log(strArr);
    if (typeof strArr !== "string") {
      console.log("its an array");
      if (!char) {
        console.log("no special char");
        return strArr.join(" ");
      } else {
        console.log("adding the special char", char);
        const strArrWithSpecialChar = strArrToCopy
          .map((word) => char + word)
          .join(" ");
        return strArrWithSpecialChar;
      }
    } else {
      console.log("its not an array bro");
      return strArrToCopy;
    }
  };

  const [clicked, setClicked] = useState(false);
  return (
    <>
      <button
        className="btn-copy"
        onClick={() => {
          console.log("you clicked copy");
          navigator.clipboard.writeText(
            generateCopyText(strArrToCopy, specialChar)
          );
          setClicked(true);
        }}
      >
        <FontAwesomeIcon icon={faCopy} className="icon-copy" />
      </button>
      {clicked ? <p>Copied!</p> : ""}
    </>
  );
};

export default BtnCopy;
