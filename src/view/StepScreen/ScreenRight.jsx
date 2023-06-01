
import { useTranslation } from "react-i18next";
import React from 'react';
import FlowIcon from '../../assets/work-flow.png';
import { useNavigate } from 'react-router-dom';

const ScreenRight = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  // const localToken = localStorage.getItem("resume_token") || null;
  const en_pth = localStorage.getItem('en_pth');
  const FinalResume = localStorage.getItem('FinalResume');
  const routeChange = () => {
    // if(localToken === null){
    //   // localStorage.setItem("resume_token", token);
    // }
    if (!FinalResume) {
      if (en_pth) navigate(en_pth);
      else {
        navigate('/experience-level');
        // navigate('/choose-template');
      }
    }
    if (FinalResume) {
      navigate('/final-resume');
    }
    else {
      navigate("/experience-level");
    }
  };

  // const routeChange = (token) => {
  //   if (localToken === null) {
  //     localStorage.setItem("resume_token", token);
  //     navigate("/experience-level");
  //   } else if (!JSON.parse(localStorage.getItem("resume_meta_value_heading"))) {
  //     navigate("/experience-level");
  //   } else {
  //     navigate("/final-resume");
  //   }
  // };

  return (
    <>
      <div className="screen-right">
        <div className="right-box-screen">
          <div>
            <div className="flow-icon">
              <img alt="" src={FlowIcon} />
              <div className="mt-4">
                <button
                  className="custm-btn home-btn"
                  onClick={() => routeChange()}
                >
                   {t("CREATE MY RESUME")}
                </button>
              </div>
            </div>
            {/* <p className="pt-3 text-center" style={{ fontSize: "10px" }}>
              {t("By clicking Create My Resume, you agree to our")}&nbsp;
              <a
                target="_blank"
                rel="noreferrer"
                href="https://newcareerbusiness.com/terms-condition/"
              >
                 {t("Terms of Use")}
              </a>
              &nbsp;{t("and")} &nbsp;
              <a
                target="_blank"
                rel="noreferrer"
                href="https://newcareerbusiness.com/privacy-policy/"
              >
                {t("Privacy Policy")}
              </a>{' '}
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenRight;
