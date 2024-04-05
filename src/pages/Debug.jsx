import { useState, useEffect } from "react";
import { FcExpand, FcNext } from "react-icons/fc";
import { FiArrowRightCircle, FiCircle } from "react-icons/fi";
import { IoReload } from "react-icons/io5";

import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import surveyJson from "../survey";
import TopBar from "../web-components/TopBar";



// custom widgets
import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
import { ExamNextButton } from "../survey-components/NextButton";


export default function Debug() {
  const survey = new Model(surveyJson);

  // custom widgets
  ExamConfirmationButton(survey);
  CameraConfirmationButton(survey);
  ExamNextButton(survey);

  const ResultBox = () => {
    const [data, setData] = useState(JSON.stringify(survey.data, null, " "));

    survey.onValueChanged.add((survey, { name, question, value }) => {
      setData(JSON.stringify(survey.data, null, " "));
    });

    useEffect(() => {
      setData(JSON.stringify(survey.data, null, " "));
    }, []);

    return (
      <div>
        <button
          className="text-white text-lg "
          onClick={() => {
            setData(JSON.stringify(survey.data, null, " "));
          }}
        >
          <IoReload />
        </button>
        <div className="whitespace-pre-wrap h-64 overflow-y-scroll p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {data}
        </div>
      </div>
    );
  };

  const Pages = () => {
    const [pages, setPages] = useState(survey.pages);
    const [curPage, setCurPage] = useState(survey.currentPage);

    survey.onValueChanged.add((survey, { name, question, value }) => {
      setCurPage(survey.currentPage);
    });

    return (
      <div>
        <button
          className="text-white text-lg"
          onClick={() => {
            setCurPage(survey.currentPage);
          }}
        >
          <IoReload />
        </button>
        <ul className="dark:text-white text-sm ml-2">
          {pages
            .filter((page) => page.isVisible)
            .map((page) => (
              <li className="my-2" key={page.name}>
                {curPage === page ? (
                  <span className="float-left mr-2">
                    <FiArrowRightCircle />
                  </span>
                ) : (
                  <span className="float-left mr-2">
                    <FiCircle />
                  </span>
                )}
                {survey.visiblePages.indexOf(page) + 1}-{page.name}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const Sidebar = () => {
    // for dropdown menus
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const toggleNavigation = () => {
      setIsNavigationOpen(!isNavigationOpen);
    };
    const [isOperationsOpen, setIsOperationsOpen] = useState(false);
    const toggleOperations = () => {
      setIsOperationsOpen(!isOperationsOpen);
    };

    // next and previous page
    const nextPage = () => {
      survey.currentPageNo = survey.currentPageNo + 1;
    };
    const previousPage = () => {
      survey.currentPageNo = survey.currentPageNo - 1;
    };

    // survey operations
    const completeSurvey = () => {
      survey.doComplete();
    };
    const clearSurvey = () => {
      // Clear the survey and restart from the beginning
      survey.clear(true, false);
      survey.deleteCookie();
    };
    const restartSurvey = () => {
      survey.clear(true, true);
      survey.deleteCookie();
    };
    const [showInvisibleElements, setShowInvisibleElements] = useState(
      survey.showInvisibleElements
    );
    const toggleInvisibleElements = () => {
      setShowInvisibleElements(!showInvisibleElements);
    };

    const [isPagesExpanded, setIsPagesExpanded] = useState(false);
    const togglePages = () => {
      setIsPagesExpanded(!isPagesExpanded);
    };

    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleClick = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium list-outside">
            <li
              onClick={toggleNavigation}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="mr-2">
                {isNavigationOpen ? <FcExpand /> : <FcNext />}
              </span>
              Navigation
            </li>
          </ul>
          {isNavigationOpen && (
            <ul className="ml-4 text-sm list-inside">
              <li
                onClick={nextPage}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Next Page
              </li>
              <li
                onClick={previousPage}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Previous Page
              </li>
            </ul>
          )}

          <ul className="space-y-2 font-medium">
            <li
              onClick={toggleOperations}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="mr-2">
                {isOperationsOpen ? <FcExpand /> : <FcNext />}
              </span>
              Survey Operations
            </li>
          </ul>
          {isOperationsOpen && (
            <ul className="ml-4 text-sm">
              <li
                onClick={completeSurvey}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Complete Survey
              </li>
              <li
                onClick={clearSurvey}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Clear Survey
              </li>
              <li
                onClick={restartSurvey}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Restart Survey
              </li>
              <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <label className="link-dark rounded">
                  <input
                    id="showInvisibleElementsButton"
                    type="checkbox"
                    className="btn-check"
                    checked={showInvisibleElements}
                    onChange={toggleInvisibleElements}
                  />
                  Show Invisible Elements
                </label>
              </li>
            </ul>
          )}
          <ul className="space-y-2 font-medium">
            <li
              onClick={togglePages}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="mr-2">
                {isPagesExpanded ? <FcExpand /> : <FcNext />}
              </span>
              Pages
            </li>
            {isPagesExpanded && <Pages />}
          </ul>

          <li
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            onClick={handleClick}
            aria-expanded={!isCollapsed}
          >
            <span className="mr-2">
              {isCollapsed ? <FcExpand /> : <FcNext />}
            </span>
            Survey Results
          </li>
          {isCollapsed && <ResultBox s />}

          <h6 className="flex text-lg py-4 dark:text-white">
            <span>Survey Info</span>
          </h6>
          <div className="input-group input-group-sm mb-3 row-cols-3">
            <span
              className="input-group-text dark:text-white"
              id="debug-mode-survey-state dark:text-white"
            >
              Survey State
            </span>
            <input
              type="text"
              className="form-control col-2"
              value={survey.state}
              readOnly
              aria-label="Survey State"
              aria-describedby="debug-mode-survey-state"
            />
          </div>
          <div className="input-group input-group-sm mb-3 row-cols-3">
            <span
              className="input-group-text dark:text-white"
              id="debug-mode-survey-currentPage"
            >
              Current Page
            </span>
            <input
              type="text"
              className="form-control col-2"
              value={survey.currentPage}
              readOnly
              aria-label="Survey State"
              aria-describedby="debug-mode-survey-currentPage"
            />
          </div>
        </div>
      </aside>
    );
  };

  return (
    <>
      <TopBar />

      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Debug Mode
                  </span>
                </li>
                {/* <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Link to="..">Leave Debug Mode</Link>
              </li> */}
              </ul>
            </div>
          </div>
        </nav>

        <div className="p-4 sm:ml-64">
          <Survey model={survey} />
        </div>
        <Sidebar />
      </div>
    </>
  );
}
