import { createElement } from "react";
import { ElementFactory, Question, Serializer } from "survey-core";
import { SurveyQuestionElementBase, ReactQuestionFactory } from "survey-react-ui";
import './CustomHTMLSlideShowComponent.css';
const CUSTOM_TYPE = "custom-html-slide-show";

// A model for the new question type
export class QuestionHTMLSlideShowModel extends Question {
    getType() {
        return CUSTOM_TYPE;
    }
    get slidesHtml() {
        return this.getPropertyValue("slidesHtml");
    }
    set slidesHtml(val) {
        this.setPropertyValue("slidesHtml", val);
    }
}

// Register `QuestionHTMLSlideShowModel` as a model for the `custom-html-slide-show` type
export function RegisterHTMLSlideShow(surveyModel) {
    ElementFactory.Instance.registerElement(CUSTOM_TYPE, (name) => {
        return new QuestionHTMLSlideShowModel(name);
    });

    surveyModel.onValidateQuestion.add((_, options) => {
        if (options.question.getType() === CUSTOM_TYPE) {
            if(!options.value) {
                options.error = "Please look at all the slides.";
            }
        }
    });
}

// Register an SVG icon for the question type
//const svg = ReactDOMServer.renderToString(<HTMLSlideShowIcon />);
//SvgRegistry.registerIconFromSvg(CUSTOM_TYPE, svg);

// Add question type metadata for further serialization into JSON
Serializer.addClass(
    CUSTOM_TYPE,
    [{
        name: "slidesHtml",
        type: "itemvalues",
        default: ["<div>Slide 1</div>", "<div>Slide 2</div>"],
        category: "general",
        visibleIndex: 2 // After the Name and Title
    }],
    function () {
        return new QuestionHTMLSlideShowModel("");
    },
    "question"
);

// A class that renders questions of the new type in the UI
export class SurveyQuestionHTMLSlideShow extends SurveyQuestionElementBase {

    constructor(props) {
        super(props);
        this.state = {
            value: this.question.value,
            slideIndex: 0
        };
    }
    get question() {
        return this.questionBase;
    }
    get value() {
        return this.question.value;
    }
    get slidesHTML() {
        return this.question.slidesHtml;
    }

    plusSlides(n) {
        if (n > 0 && this.state.slideIndex + 1 < this.slidesHTML.length ||
            n < 0 && this.state.slideIndex - 1 >= 0) {
            this.setSlideIndex(((this.state.slideIndex + n) % this.question.slidesHtml.length));
        }
        if(this.state.slideIndex + 1 == this.slidesHTML.length-1) {
            this.question.value = true;
        }
    }

    setSlideIndex(n) {
        this.setState({ slideIndex: n });
    }

    renderSlideShow(slidesHtml) {
        const dots = [];
        for (let i = 0; i < slidesHtml.length; i++) {
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            dots.push(
                <span key={i}
                    className={this.state.slideIndex == i ? "dot active" : "dot"}
                    onClick={() => this.setSlideIndex(i)}></span>
            );
        }


        return (
            <div>
                <div className="slideshow-container">
                    {
                        <div className="mySlides fade">
                            <div className="badge badge-primary text-wrap text-center lh-base">
                                <div dangerouslySetInnerHTML={{ __html: slidesHtml[this.state.slideIndex].value }} />
                            </div>
                        </div>
                    }
                    <a className="prev" id="prev-slide" hidden={this.state.slideIndex == 0}  onClick={() => this.plusSlides(-1)}>❮</a>
                    <a className="next" id="next-slide" hidden={this.state.slideIndex == this.slidesHTML.length - 1} onClick={() => this.plusSlides(+1)}>❯</a>
                </div>
                <div className="dots">
                    {dots}
                </div>
            </div>
        );
    }

    renderElement() {
        return (
            <div>
                {this.renderSlideShow(this.slidesHTML)}
            </div>
        );
    }
}

// Register `SurveyQuestionHTMLSlideShow` as a class that renders `custom-html-slide-show` questions 
ReactQuestionFactory.Instance.registerQuestion(CUSTOM_TYPE, (props) => {
    return createElement(SurveyQuestionHTMLSlideShow, props);
});