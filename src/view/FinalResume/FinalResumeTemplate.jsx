import React from 'react';
import { useSelector } from 'react-redux';
// import FinalReusme from "../../assets/resume-3.png";
import TemplateOne from '../AllTemplate/index';
import TemplateFourStru from '../AllTemplate/TemplateFourStru';
import TemplateThreeStru from '../AllTemplate/TemplateThreeStru';
import TemplateTwoStru from '../AllTemplate/TemplateTwoStru';
import ResumeFiveStructure from '../TemplateFive/ResumeFiveStructure';
const FinalResumeTemplate = ({statefix,setStateFix}) => {
  // console.log("props",statefix,setStateFix);
  const templateIdState = useSelector((store) => store.resumeData.template_id);
console.log(templateIdState, "templateIdState")
  return (
    <>
      {/* <img alt="" src={FinalReusme} /> */}
      {(function () {
        if (templateIdState === '1') {
          return <TemplateOne statefix={statefix} setStateFix={setStateFix}/>;
        } else if (templateIdState === '2') {
          return <TemplateTwoStru  />;
        } else if (templateIdState === '3') {
          return <TemplateThreeStru statefix={statefix} setStateFix={setStateFix} />;
        } else if (templateIdState === '4') {
          return <TemplateFourStru statefix={statefix} setStateFix={setStateFix} />;
        } else if(templateIdState==='5'){
          return <ResumeFiveStructure statefix={statefix} setStateFix={setStateFix} />;
        }
      })()}
    </>
  );
};

export default FinalResumeTemplate;
