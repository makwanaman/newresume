import React, { useState, useRef, useEffect } from "react";
import PreviewTips from "../../components/PreviewTips";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsListings } from "../../redux/features/descriptionListingSlice";
import { getSkillsSubCategories } from "../../redux/features/subCategorySlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addSkills, getSkills } from "../../redux/features/skillsSlice";
import SnipLoader from "../../components/SnipLoader";
import { getPopularSubCategories } from "../../redux/features/popularJobTitleSlice";
// eslint-disable-next-line
import { SyncLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import ResumeContactPreview from "../../components/ResumeContactPreview";
const AddSkill = ({ handleRemoval }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const subCatState = useSelector((store) => store.subCategoryData);
  const resume_token = localStorage.getItem("resume_token");
  const pathname = window.location.pathname;
  const FinalResume = localStorage.getItem("FinalResume");
  const [skillsFlag, setSkillsFlag] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [lvalue, setLvalue] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState();
  // eslint-disable-next-line
  const [skLoader, setSkLoader] = useState(true);
  const [checkDesc, setCheckDesc ] = useState(true);
  const skills = localStorage.getItem("resume_meta_value_skills");
  let jobData =
    JSON.parse(localStorage.getItem("resume_meta_value_workexpr"))
      ?.meta_value[0] || null;

  const [searchText, setSearchText] = useState(jobData?.jobtitle);
  const searchTerm = jobData?.jobtitle;
  const skillsListing = useSelector(
    (store) => store.ListingsData.skillsListings.data
  );
  const skillsArray = useSelector(
    (store) => store.skillsData?.Skills?.resume?.meta_value
  );
  localStorage.setItem("skillsInLocal", description);

  useEffect(() => {
    if (skillsListing.length > 0) {
      setTimeout(() => {
        setSkLoader(false);
      }, 200);
    }
  }, [skillsListing]);

  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    dispatch(getSkillsSubCategories(inputRef.current.value));
  };

  const handleClick = (id, value) => {
    setSearchText(value);
    dispatch(getSkillsListings(id));
    dispatch(getPopularSubCategories({ title: value, id: 4 }));
  };

  const handleChange = (e) => {
    let str = "";
    let descriptionString = str.concat(...description);
    let newArr = lvalue;
    if (newArr.includes(e.target.value)) {
      newArr = [...lvalue];
      const indexOfValue = newArr.indexOf(e.target.value);
      newArr.splice(indexOfValue, 1);
      const updatedArray = handleRemoval(e.target.value, descriptionString);

      setLvalue(newArr);
      setDescription(updatedArray);
    } else {
      newArr.push(e.target.value);
      setLvalue(newArr);
      if (!descriptionString.includes(`<li>&nbsp;</li>`)) {
        setDescription(descriptionString.concat(`<li>${e.target.value}</li>`));
      } else {
        const replaceNBSP = descriptionString.replace("&nbsp;", e.target.value);
        setDescription(replaceNBSP);
      }
    }
  };

  const setDescriptionData = () => {
    const lValueArr = JSON.parse(localStorage.getItem("skillsArr"));
    const skills = localStorage.getItem("resume_meta_value_skills");
    if (skills && !description) {
      setDescription(skills);
      setLvalue(lValueArr);
    }
    setSkillsFlag(false);
  };

  const handleME = ()=>{
    if(!description?.length && skills === null && checkDesc ){
      setDescription("<ul><li></li></ul>")
      setCheckDesc(false);
    }
  }

  console.log("Skills meta =>", skills);
  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    console.log("CK data =>", data);
    setDescription(data);
    let arr = [...lvalue];
    let splArr = [];
    const skillLists = skillsListing.map((skill) => skill.description);
    for (let i of skillLists) {
      if (data.length === 0) {
        arr = [];
        setLvalue(arr);
      }
      if (!data.includes(i) && arr.includes(i)) {
        splArr.push(i);
        let filteredArr = arr.filter(function (val) {
          return splArr.indexOf(val) === -1;
        });

        setLvalue(filteredArr);
      } else {
        if (data.includes(i) && !arr.includes(i)) {
          arr.push(i);
          setLvalue(arr);
        }
      }
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const newArr =
        subCatState?.SkillsSubCategories?.data?.filter(
          (el) => el.title.toLowerCase() === searchTerm.toLowerCase()
        ) || [];

      if (newArr.length > 0) {
        dispatch(getSkillsListings(newArr[0]?.id));
      }
    }
  }, [dispatch, searchTerm, subCatState?.SkillsSubCategories?.data]);

  useEffect(() => {
    if (skillsFlag) {
      setDescriptionData();
    }
    if (resume_token) {
      dispatch(getSkillsSubCategories());

      if (skillsArray) {
        dispatch(getSkills(resume_token));
      }
    }
    // eslint-disable-next-line
  }, [dispatch, resume_token, skillsArray, skillsFlag]);

  const saveSkills = () => {
    // console.log("description",description)
    if (description !== "") {
      calcSkillPerc();

      dispatch(addSkills({ data: description, resume_token }));
      localStorage.setItem("skillsArr", JSON.stringify(lvalue));
      if (localStorage.getItem("FinalResume") === "true") {
        navigate("/final-resume");
      } else {
        navigate("/summary");
      }
    } else {
      localStorage.setItem("skiStr", 0);

      localStorage.removeItem("resume_meta_value_skills");
      localStorage.removeItem("skillsInLocal");
      localStorage.setItem("skillsArr", JSON.stringify(lvalue));
      if (localStorage.getItem("FinalResume") === "true") {
        navigate("/final-resume");
      } else {
        navigate("/summary");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 2000);
  }, []);

  const fArray = skillsListing
    .filter((skill) => skill.recommended === 1)
    .map((skill) => skill.description);

  const [style, setStyle] = useState(false);
  const addAutoSkills = () => {
    setModalOpen(false);
    setStyle(true);
    const filteredArr = skillsListing
      .filter((skill) => skill.recommended === 1)
      .map((skill) => skill.description);
    let sum = "";
    for (let i of filteredArr) {
      sum += `<li>${i}</li>`;
    }
    setDescription(sum);
    // setTimeout(() => {
    //   setStyle(false);
    // }, 2000);
  };

  useEffect(() => {
    if (!skills && skillsListing.length > 0) {
      setModalOpen(true);
    }
  }, [skills, skillsListing]);

  useEffect(() => {
    dispatch(getPopularSubCategories({ title: jobData?.jobtitle, id: 4 }));
  }, [dispatch, jobData?.jobtitle]);
  // eslint-disable-next-line
  const subCategoriesData = useSelector(
    (store) => store.popularSubCatData?.popularSubCategories?.data
  );
  // eslint-disable-next-line
  const handlePopularJobTitle = (id, value) => {
    setSearchText(value);
    dispatch(getPopularSubCategories({ title: value, id: 4 }));
    dispatch(getSkillsListings(id));
  };
  const handleBack = () => {
    if (FinalResume) {
      navigate("/final-resume");
    } else navigate("/skill");
  };

  const calcSkillPerc = () => {
    let perc = 0;
    if (!description && !lvalue) {
      perc = 0;
    } else if (lvalue.length >= 6) {
      perc += 20;
    } else if (description.length >= 240 && lvalue.length === 0) {
      perc += 7;
    } else if (description.length >= 240 && lvalue.length < 6) {
      perc = 7;
    } else if (lvalue.length < 6 && lvalue.length > 0) {
      perc += 12;
    } else if (
      lvalue.length === 0 &&
      description.length > 10 &&
      description.length < 240
    ) {
      perc += 7;
    }
    localStorage.setItem("skiStr", perc);
  };
  let [time, setTime] = useState(1);
  const getTime = () => {
    setInterval(() => {
      if (time <= 5) {
        setTime(time++);
      }
    }, 1000);
  };
  useEffect(() => {
    getTime();
    // eslint-disable-next-line
  }, []);
  console.log("DESC =>", description);
  return (
    <>
      <section className="choose-template-section summary-box pt-4 bg-double pb-5">
        <div className="container">
          <div className="pd-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="">
                  <div className="editor-box mt-3">
                    <h1 className="page-title-big">
                      Wählen Sie nun Ihre&nbsp;
                      <span style={{ color: "var(--yellow)" }}>
                        Kernkompetenzen&nbsp;
                      </span>
                      aus
                    </h1>

                    <div className="mt-3 skill-editor" onClick={handleME}>
                      <CKEditor
                        config={{
                          toolbar: [
                            "bold",
                            "italic",
                            "bulletedList",

                            "undo",
                            "redo",
                            "underline",
                          ],
                        }}
                        editor={ClassicEditor}
                        data={description}
                        onChange={handleCkeditorState}
                        onReady={(editor) => {}}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                    </div>
                  </div>
                </div>
             
                <div className="row mt-4">
                  <div className="col-sm-6 col-3">
                    <button
                      onClick={handleBack}
                      className="width-btn btn site-btn border-btn"
                    >
                      {t("Back")}
                    </button>
                  </div>
                  <div className="col-sm-6 col-9 text-right">
                    <button
                      className="btn site-btn bg-blue text-white"
                      type="button"
                      onClick={saveSkills}
                    >
                      {localStorage.getItem("FinalResume") === "true"
                        ? `${t("SAVE AND NEXT")}`
                        : `${"WEITER"}`}{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <PreviewTips />
                <ResumeContactPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
      {jobData?.jobtitle && (
        <Modal
          toggle={() => setModalOpen(!modalOpen)}
          isOpen={modalOpen}
          className="modal-dialog-recom resume-pre-dialog "
        >
          <div className="pb-2 pb-4">
            <span
              aria-hidden={true}
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
              className="cursor-pointer close-btn"
            >
              <span className="close">&times;</span>
            </span>
          </div>
          <div className="modal-content-box pb-3">
            <div className="modal-body">
              <div>
                {loading ? (
                  <div className="recom-loder">
                    <SnipLoader />
                  </div>
                ) : (
                  <div>
                    <h3>{t("Expert recommendations for")}</h3>
                    <h3 className="bold">{searchText}</h3>
                    <p>{t("You can edit these in next step.")}</p>
                    <div className="list-wrap">
                      <ul className="list-ttc-recommend">
                        {/* <li className="list-ttc-recommend-item">
                      Onboarded new temps by entering employee information
                      into systems.
                    </li> */}
                        {fArray.map((item) => {
                          return (
                            <li className="list-ttc-recommend-item">{item}</li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="row mt-4 pr-1 pl-1">
                      <div className="col-sm-5 col-12">
                        <Link
                          to=""
                          className="w-100 btn site-btn border-btn mt-2"
                          onClick={() => setModalOpen(false)}
                        >
                          {t("NO THANKS")}
                        </Link>
                      </div>
                      <div className="col-sm-7 col-12 text-right mt-2">
                        <Link to="" onClick={addAutoSkills}>
                          <button
                            className="w-100 btn site-btn bg-blue text-white"
                            type="button"
                          >
                            {t("ADD RECOMMENDATIONS")}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddSkill;
