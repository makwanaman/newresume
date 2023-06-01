import React, { useState, useRef, useEffect } from "react";
import PreviewTips from "../../components/PreviewTips";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCertificationListings } from "../../redux/features/descriptionListingSlice";
import { getCertifiSubCategories } from "../../redux/features/subCategorySlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SyncLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Button } from "reactstrap";
import {
  addCertification,
  deleteCertification,
  editCertification,
} from "../../redux/features/certificationsSlice";
import { arrExtSec } from "../../redux/features/extraSectionSlice";
import { getPopularSubCategories } from "../../redux/features/popularJobTitleSlice";
import ResumeContactPreview from "../../components/ResumeContactPreview";

const AddCertification = ({ handleRemoval }) => {
  const { t } = useTranslation();
  let [time, setTime] = useState(1);

  const FinalResume = localStorage.getItem("FinalResume");
  const navigate = useNavigate();
  const location = useLocation();
  const [lvalue, setLvalue] = useState([]);
  const [skLoader, setSkLoader] = useState(true);

  const pathname = location.pathname;
  const [description, setDescription] = useState("");

  const inputRef = useRef();
  const [show, setShow] = useState(false);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const cerResData = useSelector((store) => store.certificationData.certiData);
  const certification = localStorage.getItem("resume_meta_value_certification");
  useEffect(() => {
    if (!FinalResume) {
      localStorage.setItem("en_pth", pathname);
    }
  }, [pathname, FinalResume]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  let jobData =
    JSON.parse(localStorage.getItem("resume_meta_value_workexpr"))
      ?.meta_value[0] || null;
  const [searchText, setSearchText] = useState(jobData?.jobtitle);
  const certificationListing = useSelector(
    (store) => store.ListingsData.certificationListings.data
  );
  const subCatState = useSelector((store) => store.subCategoryData);

  const resume_token = localStorage.getItem("resume_token");

  useEffect(() => {
    if (certificationListing?.length > 0) {
      setTimeout(() => {
        setSkLoader(false);
      }, 200);
    }
  }, [certificationListing]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    dispatch(getCertifiSubCategories(inputRef.current.value));
  };

  const handleClick = (id, value) => {
    setSearchText(value);
    dispatch(getCertificationListings(id));
    dispatch(getPopularSubCategories({ title: value, id: 9 }));
  };

  const handleChange = (e) => {
    let str = "";
    let descriptionString = str.concat(...description);
    let newArr = lvalue;
    if (newArr.includes(e.target.value)) {
      newArr = [...lvalue];
      const indexOfValue = newArr.indexOf(e.target.value);
      newArr.splice(indexOfValue, 1);
      // const replacedString = descriptionString.replace(
      //   `<li>${e.target.value}</li>`,
      //   ''
      // );
      const updatedString = handleRemoval(e.target.value, descriptionString);
      setLvalue(newArr);
      setDescription(updatedString);
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
    let lValueArr = JSON.parse(localStorage.getItem("CertiArr"));
    if (certification) {
      setDescription(certification);
      setLvalue(lValueArr);
    }
  };

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
    let arr = [...lvalue];
    let splArr = [];
    const skillLists = certificationListing.map((skill) => skill.description);
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
  const searchTerm = jobData?.jobtitle;
  useEffect(() => {
    const newArr =
      subCatState?.CertiSubCategories?.data?.filter(
        (el) => el.title?.toLowerCase() === searchTerm?.toLowerCase()
      ) || [];

    dispatch(getCertificationListings(newArr[0]?.id));
  }, [dispatch, searchTerm, subCatState?.CertiSubCategories?.data]);

  useEffect(() => {
    setDescriptionData();
    if (resume_token) {
      dispatch(getCertifiSubCategories());
    }
    // eslint-disable-next-line
  }, [dispatch, resume_token]);

  const handlePath = () => {
    const nameArr = JSON.parse(localStorage.getItem("ext_name_arr"));
    const filterName = nameArr.filter((ele) => ele !== "Certifications");
    let route = "";
    const pathArray = JSON.parse(localStorage.getItem("extra_section_array"));
    if (pathname !== pathArray[pathArray.length - 1]) {
      for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i] === pathname) {
          route = pathArray[i + 1];
        }
      }
    } else {
      route = "/final-resume";
    }
    if (certification === null && description !== "") {
      dispatch(addCertification({ data: description }));
      localStorage.setItem("CertiArr", JSON.stringify(lvalue));
      dispatch(arrExtSec(filterName));
      navigate(route);
    } else if (certification !== null && description !== "") {
      dispatch(
        editCertification({
          data: description,
          id: cerResData?.id || localStorage.getItem("certificationId"),
        })
      );
      localStorage.setItem("CertiArr", JSON.stringify(lvalue));

      dispatch(arrExtSec(filterName));

      navigate(route);
    } else if (description === "") {
      if (certification !== null) {
        dispatch(deleteCertification(cerResData.id));
        dispatch(arrExtSec(filterName));
        navigate(route);
      } else {
        dispatch(arrExtSec(filterName));
        navigate(route);
      }
    }
  };

  useEffect(() => {
    dispatch(getPopularSubCategories({ title: jobData?.jobtitle, id: 9 }));
  }, [dispatch, jobData?.jobtitle]);
  // eslint-disable-next-line
  const subCategoriesData = useSelector(
    (store) => store.popularSubCatData?.popularSubCategories?.data
  );
  // eslint-disable-next-line
  const handlePopularJobTitle = (id, value) => {
    setSearchText(value);
    dispatch(getCertificationListings(id));
    dispatch(getPopularSubCategories({ title: value, id: 9 }));
  };

  const certiData = useSelector(
    (store) => store.certificationData.certification
  );
  const handleBack = () => {
    let route = "";
    const pathArray = JSON.parse(localStorage.getItem("extra_section_array"));
    if (pathname !== pathArray[0]) {
      for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i] === pathname) {
          route = pathArray[i - 1];
          navigate(route);
        }
      }
    } else if (FinalResume && certiData) {
      navigate("/final-resume");
    } else {
      route = "/add-section";
      navigate(route);
    }
  };

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

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {t("This section can't be empty.")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Fill it out or it will be deleted.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t("Keep Editing")}
          </Button>
          <Button onClick={handlePath} autoFocus>
            {t("Discard Section")}
          </Button>
        </DialogActions>
      </Dialog>
      <section className="choose-template-section  pt-4 bg-double pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="editor-box mt-3">
                <h1 className="page-title-big">
                  Welche&nbsp;
                  <span style={{ color: "var(--yellow)" }}>
                    Zertifizierungen&nbsp;
                  </span>
                  haben Sie?
                </h1>
                {/* <PageHeading
                  headinglabel={t("What certifications do you have?")}
                /> */}
                <div className="mt-3">
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
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      // console.log("Editor is ready to use!", editor);
                    }}
                    onBlur={(event, editor) => {
                      // console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      // console.log("Focus.", editor);
                    }}
                  />
                </div>
              </div>
              <div className="">
                <div className="skill-list-box-outer">
                  <div className="p-4">
                    <p className="mb-3 bold">{t("Title, industry, keyword")}</p>
                    <form>
                      <div className="form-group custom-search-box">
                        <input
                          className="search-input"
                          autoComplete="off"
                          onChange={handleSearch}
                          onFocus={() => setShow(true)}
                          type="text"
                          value={searchText}
                          placeholder={t("Title, industry, keyword")}
                          name="search"
                          ref={inputRef}
                        />
                        <button type="submit" className="search-btn">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                      {show && (
                        <div>
                          <ul
                            className="search-list"
                            onClick={() => setShow(!show)}
                          >
                            <li>
                              <p className="mb-0 head-suggested">
                                {t("Suggested searches")}
                              </p>
                            </li>
                            {subCatState?.CertiSubCategories?.data?.map(
                              (data) => {
                                return (
                                  <>
                                    <hr
                                      style={{
                                        marginTop: "0.4rem",
                                        marginBottom: "0.4rem",
                                        width: "95%",
                                      }}
                                    />
                                    <li
                                      onClick={() =>
                                        handleClick(data.id, data.title)
                                      }
                                      key={data.id}
                                    >
                                      <p className="mb-0" key={data.id}>
                                        <span className="seacrch-icon">
                                          <i className="fa fa-search"></i>
                                        </span>

                                        {data.title}
                                      </p>
                                    </li>
                                  </>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      )}
                    </form>
                  </div>
                  <div className="fiter-search">
                    {/* <div className="fiter-search-left">
                      <div className="search-key-box">
                        <p>{t("Popular Job Titles")}</p>
                        <ul className="search-key-list">
                          {subCategoriesData?.length > 0
                            ? subCategoriesData?.map((data) => {
                                return (
                                  <li>
                                    <div className="key-icon">
                                      <i className=" fa fa-search"></i>
                                    </div>
                                    <div
                                      onClick={() =>
                                        handlePopularJobTitle(
                                          data.id,
                                          data.title
                                        )
                                      }
                                    >
                                      {data.title}
                                    </div>
                                  </li>
                                );
                              })
                            : `${t("NO DATA FOUND")}`}
                        </ul>
                      </div>
                    </div> */}
                    <div className="fiter-search-right">
                      <div className="list-editor skill-list-editor">
                        <div className="skill-list-box list-center">
                          {skLoader ? (
                            <div className="sync-loader no-data">
                              {time !== 5 ? (
                                <SyncLoader
                                  style={{
                                    margin: "auto",
                                    display: "block",
                                    zIndex: "10000",
                                  }}
                                  color="var(--blue)"
                                />
                              ) : (
                                `${t("No data found for this job profile")}`
                              )}
                            </div>
                          ) : (
                            <>
                              <ul>
                                {certificationListing?.map((listing) => {
                                  return (
                                    <li
                                      className="list-editor-item"
                                      key={listing.id}
                                    >
                                      <div className="item-left">
                                        <button
                                          style={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            color: " #fff",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {description?.includes(
                                            listing.description
                                          ) === false
                                            ? "+"
                                            : "-"}
                                        </button>
                                        <input
                                          className="item-right"
                                          type="checkbox"
                                          checked={
                                            lvalue.indexOf(
                                              listing.description
                                            ) > -1
                                          }
                                          value={listing.description}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div>
                                        <div className="item-right">
                                          <p className="mb-0">
                                            {listing.description}&nbsp;
                                            <span
                                              style={{ color: "var(--blue)" }}
                                            >
                                              [subject]
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-sm-6 col-4">
                  {/* <Link
                        to="/add-section"
                        className="width-btn btn site-btn border-btn"
                      >
                        Back
                      </Link> */}
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn site-btn bg-white text-black"
                  >
                    {t("Back")}
                  </button>
                </div>
                <div className="col-sm-6 col-8 text-right">
                  {/* <Link to="/final-resume"> */}
                  <button
                    type="button"
                    onClick={() => {
                      if (description) {
                        handlePath();
                      } else {
                        handleClickOpen();
                      }
                    }}
                    className="btn site-btn bg-blue text-white"
                  >
                    {localStorage.getItem("FinalResume") === "true"
                      ? `${t("SAVE AND NEXT")}`
                      : `${t("NEXT: FINALIZE")}`}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <PreviewTips />
              <ResumeContactPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCertification;
