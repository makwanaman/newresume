import React from 'react';
import './ResumeFive.css';

function ResumeFiveStructure() {
    return (
        <div>
            <div className="container mb-2">
        <div className="row">
          <div className="col-md-4 left-side">
            <div className="resume-img">
              <img src="./photo.jpeg" alt="profile" className="py-4" />
            </div>
            <div className="competencies text-start px-4">
              <h3>Competencies</h3>
              <ul className="ps-4 fw-light">
                <li>Logisch-analytisches Denken</li>
                <li>Entwurf von Anwendungsschnittstellen</li>
                <li>Programmtest-Software</li>
                <li>HTML und XML</li>
                <li>JavaScript</li>
              </ul>
              <hr />
            </div>

            <div className="training px-4">
              <h3>Training </h3>
              <p className="m-0 p-1">2019-2022 </p>
              <p className="fw-light m-0 p-1">
                <i className="fw-normal">DAVV University</i> Indore
              </p>
              <p className="fw-light m-0 p-1">
                <span className="fw-normal">Bachelor of Science : </span>{" "}
                Computer Science{" "}
              </p>
              <hr />
            </div>

            <div className="languages px-4">
              <h3>Languages</h3>
              <p className="fw-light m-0 p-1">
                <i className="fw-normal">Hindi:</i> &nbsp; Mother tongue
              </p>
              <p className="fw-light m-0 p-1">
                <i className="fw-normal">English:</i>
              </p>
            </div>
          </div>
          <div className="col-md-8 right-side ps-4">
            <div className="name pt-5">
              <h1 className="fw-bold" style={{ fontSize: "50px" }}>
                Aman Makwan
              </h1>
            </div>
            <div className="my-info">
              <p className="m-0 ">1234567890 </p>
              <p className="m-0 ">amanmakwan@gmail.com</p>
              <p className="m-0 "> m-39 nanda nagar, 452011, Indore </p>
              <p className="fw-bold m-0">
                Born:{" "}
                <span className="fw-normal"> March 23 1998, in India</span>{" "}
              </p>
              <p className="fw-bold m-0">
                Marital status: <span className="fw-normal">Single</span>
              </p>
              <p className="fw-bold m-0">
                Social Network:{" "}
                <span className="fw-normal">Aman.Makwan@vkaps.com</span>
              </p>
            </div>
            <div className="experiences pt-3">
              <h3> Experience</h3>
              <p className="m-0">
                <i>05/2023-Current</i>
              </p>
              <p className="m-0">
                <span className="fw-bold">IT</span> | Indore
              </p>
              <p className="m-0">Software designer Trainee</p>
              <ul>
                <li>
                  Anpassen der Standardsoftware an die kommunizierten
                  Anforderungen.
                </li>
                <li>
                  Genaues Dokumentieren aller Informationen zur Installation,
                  Nutzung und Wartung.
                </li>
              </ul>
              <p className="m-0">
                <i>04/2023-05/2023</i>
              </p>
              <p className="m-0">
                <span className="fw-bold">IT</span> | Indore
              </p>
              <p className="m-0">Software designer Intern</p>
              <ul>
                <li>
                  Anpassen der Standardsoftware an die kommunizierten
                  Anforderungen.
                </li>
                <li>
                  Genaues Dokumentieren aller Informationen zur Installation,
                  Nutzung und Wartung.
                </li>
              </ul>
            </div>
            <div className="summary ">
              <h3>Summary</h3>
              <div className="paragraph">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
              <div className="sign pt-5">
            <p className="fw-bold fs-5 m-0"> Aman Makwan</p>
            <span>aman makwan, India on 06/06/2023</span>
            </div>
            </div>
            
          </div>
        </div>
      </div>
        </div>
    );
}

export default ResumeFiveStructure;