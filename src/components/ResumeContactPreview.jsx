import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import TemplateOne from "../view/AllTemplate/index";
import TemplateFourStru from "../view/AllTemplate/TemplateFourStru";
import TemplateThreeStru from "../view/AllTemplate/TemplateThreeStru";
import TemplateTwoStru from "../view/AllTemplate/TemplateTwoStru";
import ResumeFiveStructure from "../view/TemplateFive/ResumeFiveStructure";
// import { useTranslation } from "react-i18next";
const ResumeContactPreview = () => {
  // const {t} = useTranslation()
  const [modalOpen, setModalOpen] = useState(false);

  const templateIdState = useSelector((store) => store.resumeData.template_id);
  const [preview,setPreview]=useState(false);
  return (
    <>
    {console.log(templateIdState, "templateIdState")}
      <div className="resume-preview text-right py-5 pl-5 ">
        <div className="resume-zoom pl-3 preview-box">
          {(function () {
            if (templateIdState === "1") {
              return <TemplateOne />;
            } else if (templateIdState === "2") {
              return <TemplateTwoStru />;
            } else if (templateIdState === "3") {
              return <TemplateThreeStru />;
            } else if (templateIdState === "4") {
              return <TemplateFourStru />;
            }else if (templateIdState === "5") {
              return <ResumeFiveStructure />;
            }
          })()}
        </div>
      </div>
      {/* <div className="pre-btn text-center mt-4 pl-5">
        <button
          className="prev-btn uppercase"
          onClick={() => {setModalOpen(!modalOpen)
          setPreview(true)
          }}
        >
          <span className="mr-2">
            <i className="fa fa-eye" aria-hidden="true"></i>
          </span>
        
          {t("Preview")}
        </button>
      </div> */}

      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog resume-pre-dialog"
      >
        <div className="top-fix-bar">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpen(!modalOpen);
              setPreview(false);
            }}
            className="cursor-pointer close-btn"
          >
            <span className="close">&times;</span>
          </span>
        </div>
        <div className="modal-content ">
          <div className="modal-body">
            {(function () {
              if (templateIdState === "1") {
                return (
                  <TemplateOne preview={preview} setPreview={setPreview} />
                );
              } else if (templateIdState === "2") {
                return (
                  <TemplateTwoStru preview={preview} setPreview={setPreview} />
                );
              } else if (templateIdState === "3") {
                return (
                  <TemplateThreeStru
                    preview={preview}
                    setPreview={setPreview}
                  />
                );
              } else if (templateIdState === "4") {
                return (
                  <TemplateFourStru preview={preview} setPreview={setPreview} />
                );
              }
            })()}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResumeContactPreview;
