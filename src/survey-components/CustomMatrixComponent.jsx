/**
 * Custom Matrix Component
 * @description The Custom Matrix Component expands the basic surveyjs matrix component.
 */
import { ComponentCollection, Serializer } from "survey-core";

// Register custom component
ComponentCollection.Instance.add({
    //Unique component name. It becomes a new question type. Please note, it should be written in lowercase.
    name: "custom-matrix",
    //The text that shows on toolbox
    title: "Custom Matrix",
    //The actual question that will do the job
    questionJSON: {
        type: "matrix"
    },
    inheritBaseProps: true,
    onLoaded: (q) => {
        // Shuffle rows if rowsOrder == random
        // The problem is that although matrix implements this functionality, it doesn't work when extending the matrix question.
        // Hence, we have to do it here as a workaround.
        if (q.rowsOrder === 'random') {
            // We use Decorate-Sort-Undecorate pattern because the sort function is not stable in its behavior
            let shuffled = q.rows
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            q.rows = shuffled;
        }
    },
    onAfterRender: (q, el) => {
        // Repeat matrix header
        let tableRef = el.getElementsByTagName('table')[0];
        let theadRef = el.getElementsByTagName('thead')[0];
        if (q.repeatAfterNumberOfItems > 0) {
            for (let rowIndex = q.repeatAfterNumberOfItems + 1; rowIndex < tableRef.rows.length; rowIndex += (q.repeatAfterNumberOfItems + 1)) {
                let newRow = tableRef.insertRow(rowIndex);
                for (let childIndex = 0; childIndex < theadRef.children[0].cells.length; childIndex++) {
                    newRow.insertCell(childIndex).outerHTML = theadRef.children[0].cells[childIndex].outerHTML;
                }
            }
        }
    }
});

// Register custom property
Serializer.addProperty(
    "custom-matrix",
    {
        name: "repeatAfterNumberOfItems",
        type: 'number',
        category: 'general',
        default: 0,
        visibleIndex: 0
    }
)