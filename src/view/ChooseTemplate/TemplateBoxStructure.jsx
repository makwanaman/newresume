import React, { useState } from "react";
import TemplateOne from "../AllTemplate";
import { useSelector, useDispatch } from "react-redux";
import { changeTemplateColor } from "../../redux/features/colorSlice";
import TemplateThreeStru from "../AllTemplate/TemplateThreeStru";
import TemplateFourStru from "../AllTemplate/TemplateFourStru";
import { Link } from "react-router-dom";
import { changeTemplateId } from "../../redux/features/resumeSlice";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import ResumeFiveStructure from "../TemplateFive/ResumeFiveStructure";
// import Temp4 from '../AllTemplate/Temp4';
const TemplateBoxStructure = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const templateColorState = useSelector((store) => store.templateColor);
  //Function for changing color of templates
  const handleChange = (e) => {
    const payload = {
      backgroundColor: e.target.value,
      fontColor: "var(--white)",
      onMouseEnterBgClor: null,
      onMouseEnterFontColor: null,
      borderColor: e.target.value,
    };
    dispatch(changeTemplateColor(payload));
  };

  const [
    // eslint-disable-next-line
    tempid,
    setTempid,
  ] = useState("");
  //Function for getting template id's
  const handleTemplateId = (id) => {
    console.log(id, "handleTemplateIdddddddddd")
    setTempid(id);
    dispatch(changeTemplateId(id));
  };
  const [isActive, setActive] = useState("");
  const [ismouseEntr, setmouseEntr] = useState(false);
  const [isId, setId] = useState(0);

  // const expValue = localStorage.getItem("selected_Exp");
  // const isStudent = localStorage.getItem("isStudent");
  const localToken = localStorage.getItem("resume_token") || null;

 const HandleSelectTemplate = () =>{
  return (
    <>
    {/* <Link className="resume-select-btn cursor-pointer" to={`/resume`}>
    <button
      onClick={() => {
        if (!localToken) {
          localStorage.setItem("resume_token", uuidv4());
        }
      }}
      className="btn site-btn bg-blue text-white"
      disabled={!tempid}
    >
      {t('Choose Template')}
    </button>
  </Link> */}
  </>
  )
 }

  return (
    <>
      <section className="choose-template-section pt-4 template-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center">
                <h1 className="chosse-page-title">
                  {/* {t('Choose from our')}&nbsp;<strong>{t('best templates')}</strong>&nbsp;{t('for')} */}
                  {t("Choose a template from")}
                  {/* <strong>
                    {expValue === "0-3" && isStudent === "No"
                        ? `${t(" less than 3 years of experience")}`
                      : expValue === "0" && isStudent === "No"
                      ? `${t(" jobseekers with little experience")}`
                      : expValue === "0" && isStudent === "Yes"
                       ? `${t(" students")}`
                      : expValue === "0-3" && isStudent === "Yes"
                       ? `${t(" students")}`
                      : expValue === "3-5"
                      ? ` 3-5 ${t('Years of Experience')}`
                      : expValue === "5-10"
                      ? ` 5-10 ${t('Years of Experience')}`
                      : expValue === "10+"
                      ? ` 10+ ${t('Years of Experience')}`
                      : " Select One"}
                  </strong> */}
                </h1>
                <div className="template-color-code">
                  <h6 className="clr-head semi-bold inline-block uppercase">
                    {t("Color")}
                  </h6>
                  <div className="inline-block">
                    <ul className="inline-block resume-color-list">
                      <li className="color-item ">
                        <label
                          className="color-selector root-color"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--blue)",
                              borderColor: "var(--blue)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value="var(--blue)"
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--rootcolor)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--success-steel)",
                              onMouseEnterFontColor: "var(--white)",
                              borderColor: "var(--success-steel)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--success-steel)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio root-color"
                            style={{ backgroundColor: "var(--success-steel)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--essential-ecru)",
                              onMouseEnterBgClor: "var(--essential-ecru)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--essential-ecru)"}
                            onClick={handleChange}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--essential-ecru)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--clever-blue)",
                              onMouseEnterBgClor: "var(--clever-blue)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: null,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--clever-blue)"}
                            onClick={handleChange}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--clever-blue)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--quality-azure)",
                              borderColor: "var(--quality-azure)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: null,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--quality-azure)"}
                            onClick={handleChange}
                          />

                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--quality-azure)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--delight-mint)",
                              onMouseEnterBgClor: "var(--delight-mint)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: null,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--delight-mint)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--delight-mint)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: "var(--standout-ruby)",
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--standout-ruby)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              borderColor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--standout-ruby)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--standout-ruby)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: "var(--savvy-salmon)",
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: "var(--savvy-salmon)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              borderColor: null,
                              fontColor: templateColorState.fontColor,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--savvy-salmon)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{ backgroundColor: "var(--savvy-salmon)" }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                      <li className="color-item">
                        <label
                          className="color-selector"
                          onMouseEnter={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: "var(--optimistic-amber)",
                              onMouseEnterBgClor: "var(--optimistic-amber)",
                              onMouseEnterFontColor: "var(--white)",
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                          onMouseLeave={() => {
                            const payload = {
                              backgroundColor:
                                templateColorState.backgroundColor,
                              fontColor: templateColorState.fontColor,
                              borderColor: null,
                              onMouseEnterBgClor: null,
                              onMouseEnterFontColor: null,
                            };
                            dispatch(changeTemplateColor(payload));
                          }}
                        >
                          <input
                            className="color-input"
                            type="radio"
                            name="radio-color"
                            value={"var(--optimistic-amber)"}
                            onClick={handleChange}
                          />
                          <span
                            className="color-selector-radio"
                            style={{
                              backgroundColor: "var(--optimistic-amber)",
                            }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-5 resume-box resume-preview-box">
            <div
              className="col-lg-4 mb-3  cursor-pointer resume-home-temp"
              onMouseOver={() => {
                setmouseEntr(true);
                setId(1);
              }}
              onMouseLeave={() => setmouseEntr(false)}
              onClick={() => handleTemplateId("1")}
            >
              {ismouseEntr && isId === 1 ? <HandleSelectTemplate /> : ""}

              <div
                className={` ${
                  isActive === "resume-one"
                    ? "active-resume-btn resume-temp"
                    : "resume-temp"
                }`}
                onClick={() => {
                  setActive("resume-one");
                }}
              >
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div className="resume-zoom">
                  <div onClick={() => handleTemplateId("1")}>
                    <TemplateOne />
                  </div>
                </div>
              </div>
            </div>

            {/* template-three */}
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              onMouseOver={() => {
                setmouseEntr(true);
                setId(2);
              }}
              onMouseLeave={() => setmouseEntr(false)}
              onClick={() => handleTemplateId("3")}
            >
              {ismouseEntr && isId === 2 ? <HandleSelectTemplate /> : ""}
              <div
                className={` ${
                  isActive === "resume-three"
                    ? "active-resume-btn resume-temp"
                    : "resume-temp"
                }`}
                onClick={() => {
                  setActive("resume-three");
                }}
              >
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div onClick={() => handleTemplateId("3")}>
                  <div className="resume-zoom">
                    <TemplateThreeStru />
                    {/* <TemplateThree /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* template-four */}
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              onMouseOver={() => {
                setmouseEntr(true);
                setId(3);
              }}
              onMouseLeave={() => setmouseEntr(false)}
              onClick={() => handleTemplateId("4")}
            >
              {ismouseEntr && isId === 3 ? <HandleSelectTemplate /> : ""}
              <div
                className={` ${
                  isActive === "resume-four"
                    ? "active-resume-btn resume-temp"
                    : "resume-temp"
                }`}
                onClick={() => {
                  setActive("resume-four");
                }}
              >
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div onClick={() => handleTemplateId("4")}>
                  <div className="resume-zoom">
                    <TemplateFourStru />
                    {/* <Temp4/> */}
                    {/* <TemplateFour /> */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mb-3 cursor-pointer"
              onMouseOver={() => {
                setmouseEntr(true);
                setId(3);
              }}
              onMouseLeave={() => setmouseEntr(false)}
              onClick={() => handleTemplateId("5")}
            >
              {ismouseEntr && isId === 3 ? <HandleSelectTemplate /> : ""}
              <div
                className={` ${
                  isActive === "resume-five"
                    ? "active-resume-btn resume-temp"
                    : "resume-temp"
                }`}
                onClick={() => {
                  setActive("resume-five");
                }}
              >
                <Link
                  className="resume-select-btn cursor-pointer"
                  to={`/resume`}
                >
                  <button
                    onMouseEnter={() => {
                      if (!localToken) {
                        localStorage.setItem("resume_token", uuidv4());
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                    // disabled={!tempid}
                  >
                    {t("Choose Template")}
                  </button>
                </Link>
                <div onClick={() => handleTemplateId("5")}>
                  <div className="resume-zoom">
                    <ResumeFiveStructure />
                    {/* <Temp4/> */}
                    {/* <TemplateFour /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-choose-btn">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-right">
                  <Link to={`/resume`}>
                    <button
                      className="btn site-btn mr-3 border-btn"
                      type="button"
                      onClick={() => handleTemplateId(1)}
                    >
                      {t("Choose Later")}
                    </button>
                  </Link>

                  {/*this button will now show on hovering over template*/}
                  {/* <Link to={`/resume`}>
                    <button
                      onClick={() => {
                        if (!localToken) {
                          localStorage.setItem("resume_token", uuidv4());
                        }
                      }}
                      className="btn site-btn bg-blue text-white"
                      disabled={!tempid}
                    >
                      {t('Choose Template')}
                    </button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TemplateBoxStructure;
