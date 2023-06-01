import React from "react";

const TitleName = ({preview}) => {
  const pathname = window.location.pathname;

  const headingValues = JSON.parse(
    localStorage.getItem("resume_meta_value_heading")
  );
  return (
    <>
      <h1 className={`${preview===true?'title-name':'name-title'}`}>
        {headingValues === null || pathname === "/choose-template"
          ? "Your Name"
          : !headingValues?.fname
          ? "Your Name"
          : headingValues?.fname && headingValues?.lname
          ? `${headingValues?.fname} ${headingValues?.lname}`
          : `${headingValues?.fname}`}
      </h1>
    </>
  ); 
};

export default TitleName;
