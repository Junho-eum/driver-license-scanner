// css
import './App.css'
import 'survey-core/defaultV2.min.css';
import gwusec_logo from "./assets/images/gwusec.svg";

// Topbar
import TopBar from './web-components/TopBar'


export default function App() {
  return (
    <>
    <TopBar />
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="mx-auto mb-4"
          src={gwusec_logo}
          alt=""
          width="72"
          height="57"
        ></img>
        <h1 className="display-5 fw-bold">Welcome to our Survey</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            When you are ready please click the button below to start.
          </p>
        </div>
        <form 
          action="?index"
          method="post"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="id"
            >
              Prolific ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="id"
              name="prolificID"
              type="text"
              placeholder="Prolific ID"
            />
          </div>
          <br />
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="submit"
              className="bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white"
            >
              Start Survey
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}