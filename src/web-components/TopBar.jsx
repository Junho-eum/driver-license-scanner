import React from "react";

import gwusec_logo from "../assets/gw_monogram_wht_rev.png";

export default function TopBar() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <nav className="bg-gw-primary-blue text-color-white ">
      <div
        id="top-bar"
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="place-self-center">
            <img src={gwusec_logo} className="max-h-16 p-2"></img>
          </div>
          <div className="place-self-center">
            <span className="text-2xl font-bold underline text-white">
              Exam Proctoring
            </span>
          </div>

          <div className="place-self-center">
            <span className="opt-out">Opt-Out</span>
            &nbsp;&nbsp;
            <a
              className="opt-out"
              onClick={() => setOpen((open) => !open)}
              tabIndex="3"
            >
              {isOpen ? "About" : "About"}
            </a>
          </div>
        </div>
        <div>
          {isOpen && (
            <div className="card card-body alert-success alert-dismissible">
              <div className="bg-dark p-4">
                <h5 className=" card-title text-white h4">
                  <strong>Research Study:</strong>{" "}
                  <em>Exam Proctoring Software</em>
                </h5>
                <hr></hr>
                <h4 className="text-white h4">
                  <strong>Principle Investigator:</strong> Dr. Adam J. Aviv, The
                  George Washington University
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
