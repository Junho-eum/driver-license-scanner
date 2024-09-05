const example_custom_matrix_page = {

    name: "example_custom_matrix_page",
    elements: [
        {
            type: "custom-matrix",
            name: "q-usability-sus",
            repeatAfterNumberOfItems: 4,
            title:
                "Please consider your interaction with our example tool. To what extent do you agree or disagree with the following statements?",
            "columns": [{
                "value": 1,
                "text": "1 - Strongly disagree"
            }, {
                "value": 2,
                "text": "2"
            }, {
                "value": 3,
                "text": "3"
            }, {
                "value": 4,
                "text": "4"
            }, {
                "value": 5,
                "text": "5 - Strongly agree"
            }],
            "rows": [
                {
                    "value": "statement1",
                    "text": "I think that I would like to use this system frequently."
                },
                {
                    "value": "statement2",
                    "text": "I found the system unnecessarily complex."
                },
                {
                    "value": "statement3",
                    "text": "I thought the system was easy to use."
                },
                {
                    "value": "statement4",
                    "text": "I think that I would need the support of a technical person to be able to use this system."
                },
                {
                    "value": "statement5",
                    "text": "I found the various functions in this system were well integrated."
                },
                {
                    "value": "statement6",
                    "text": "I thought there was too much inconsistency in this system."
                },
                {
                    "value": "statement7",
                    "text": "I would imagine that most people would learn to use this system very quickly."
                },
                {
                    "value": "statement8",
                    "text": "I found the system very cumbersome to use."
                },
                {
                    "value": "statement9",
                    "text": "I felt very confident using the system."
                },
                {
                    "value": "statement10",
                    "text": "I needed to learn a lot of things before I could get going with this system."
                }
            ],
            alternateRows: true,
            isAllRowRequired: true,
            rowsOrder: "random",
        },
        {
            type: "html",
            name: "exam_next_button",
        },
    ]

};

export default example_custom_matrix_page;