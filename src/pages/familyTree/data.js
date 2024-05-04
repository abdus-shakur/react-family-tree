export var data = {
    id: '1',
    label: 'First Name',
    spouses: [
        {
            id: "2",
            label: 'Test Name 1',
            children: [
                {
                    id: '4',
                    label: 'Child 1',
                    spouses: [{
                        id:'12',
                        label: "Child 1 Spouse",
                        children:[
                            {
                                id:'13',
                                label:"Child 1 Child",
                                spouses:[]
                            }
                        ]
                    }]
                }, {
                    id: '5',
                    label: 'Child 2',
                    spouses: []
                }, {
                    id: '8',
                    label: 'Child 3',
                    spouses: []
                }
            ]
        },
        {
            id: "3",
            label: 'Test Name 2',
            children: [
                {
                    id: '6',
                    label: '2 Child 1',
                    spouses: []
                }, {
                    id: '7',
                    label: '2 Child 2',
                    spouses: []
                }
            ]
        },
        {
            id: "9",
            label: 'Test Name 3',
            children: [
                {
                    id: '10',
                    label: '3 Child 1',
                    spouses: []
                }, {
                    id: '11',
                    label: '3 Child 2',
                    spouses: []
                }
            ]
        }

    ]
}