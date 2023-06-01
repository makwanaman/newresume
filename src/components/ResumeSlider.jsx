import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import Slider from "react-slick";
import { changeTemplateId } from "../redux/features/resumeSlice";
import TemplateThreeStru from "../view/AllTemplate/TemplateThreeStru";
import TempaleOneStructure from "../view/AllTemplate/TempaleOneStructure";
import TemplateFourStru from "../view/AllTemplate/TemplateFourStru";
const ResumeSlider = () => {
  // eslint-disable-next-line
  const settings = {
    // className: 'center',
    // centerMode: true,
    centerPadding: "60px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    loop: true,
    controls: false,
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(changeTemplateId(id));
  };
  const [isActive, setActive] = useState("");
  return (
    <>
      <div>
        {/* <Slider {...settings}> */}
        <div>
          <div
            className={` ${
              isActive === "1"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("1");
            }}
          >
            <div className="resume-zoom" onClick={() => handleClick("1")}>
              <TempaleOneStructure />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "2"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("2");
            }}
          >
            <div className="resume-zoom" onClick={() => handleClick("3")}>
              <TemplateThreeStru />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "3"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("3");
            }}
          >
            <div className="resume-zoom" onClick={() => handleClick("4")}>
              <TemplateFourStru />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "4"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("4");
            }}
          >
            <div className="resume-zoom" onClick={() => handleClick("3")}>
              <TemplateThreeStru />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "5"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("5");
            }}
          >
            <div className="resume-zoom" onClick={() => handleClick("1")}>
              <TempaleOneStructure />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "6"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("6");
            }}
          >
            <div className="resume-zoom" onClick={() => handleClick("4")}>
              <TemplateFourStru />
            </div>
          </div>
        </div>
        {/* </Slider> */}
      </div>
    </>
  );
};

export default ResumeSlider;
