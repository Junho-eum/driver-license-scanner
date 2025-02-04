import gwusec_logo from "../assets/images/gw_monogram_wht_rev.png";
import './TopBar.css';

export default function TopBar({ children }) {
  return (
    <nav className="bg-gw-primary-blue text-color-white">
      <div
        id="top-bar"
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"
      >
        <div className="grid grid-cols-4 gap-4 w-full">
          <div className="flex items-center justify-left">
            <div className="bg-dark">
            <img
              src={gwusec_logo}
              className="max-h-16 p-2" // Add border and rounded corners
              alt="Logo of The George Washington University"
            />
            </div>
          </div>
          <div className="col-span-3 bg-dark text-right w-full">
            <p className="card-title text-white h4">
              <strong>Research Study: </strong> <em>Your Study's Name</em>
            </p>
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}