var template = [{//Fir
    label: 'file',
    submenu: [{
        label: 'Info',
        role: 'create'
    },
        {
            label: 'Open',
            role: 'open',
        },

        {
            label: 'Save',
            role: 'save'
        },
        {
            label: 'Save as',
            role: 'save as'

        },
        {
            label: 'New',
            role: 'New'

        },
        {
            label: 'Define Title',
            role: 'Define title'

        },
        {
            label: 'Setup Photo',
            role: 'Setup'

        },
        {
            label: 'Print Photo',
            role: 'Print'

        },
        {
            label: 'Create Report',
            role: 'Create re'

        },
        {
            label: 'Quit',
            role: 'Quit'

        },
    ]


},

    {//Sec
        label: 'View',
        submenu: [{
            label: 'Dynamic Zoom',
            accelerator: 'CmdOrCtrl+Z',
            role: 'Dynamic zoom'
        },
            {
                label: 'Dynamic Rotate',
                accelerator: 'CmdOrCtrl+R',
                role: 'Dynamic rotate'
            },
            {
                label: 'Dynamic Pan',
                accelerator: 'CmdOrCtrl+P',
                role: 'Dynamic pan'
            },
            {
                label: 'Zoom Box',
                //accelerator: 'Shift+CmdOrCtrl+O',
                role: "zoom box"
            },

            {
                label: 'Center',
                // accelerator: 'CmdOrCtrl+R',
                role: 'center'
            },
            {
                label: 'Fit',
                accelerator: 'CmdOrCtrl+F',
                role: 'Fit'
            },
            {
                label: "Pan/Zoom",
                //accelerator: 'CmdOrCtrl+Alt+S',
                role: 'Pan or zoom'
            },
            {
                label: 'Rotate',
                //accelerator: 'CmdOrCtrl+Alt+S',
                role: 'rotate',
            },
            { laber: "Defined Views",
                role: "Defined Views",
            },
            {
                label: 'Labels',
                //accelerator: 'CmdOrCtrl+Alt+S',
                role: 'labels',
            },

            {label: "Display Setting",
                role: "Dis Set",
            },
        ]


    },

    {//Thr
        label: 'Geometry',
        submenu: [{
            label: 'Define Node',
            role: 'Define node'
        },
            {
                label: 'Move Node(s)',
                role: 'move node'
            },
            {
                label: 'Duplicate Node(s)',
                role: 'Duplicate node'

            },
            {
                label: 'Remove Node(s)',
                role: 'Remove node'

            },
            {
                label: 'Renumber Nodes',
                role: 'Renumber node'

            },
            {
                label: 'Define Element',
                role: 'Define element'

            },
            {
                label: 'Remove Element(s)',
                role: 'Remove element'

            },
            {
                label: 'Subdivide Element(s)',
                role: 'Subdivide element'

            },
            {
                label: 'Re-orient Element(s)',
                role: 'Re-orient element'

            },
            {
                label: 'Define Connections',
                role: 'Define connection',

            },
            {
                label: 'Define Frame',
                role: 'Define frame'

            },
            {
                label: 'Information',
                role: 'Information'

            },
        ]},

    {//thu
        label: 'Properties',
        submenu: [{
            label: 'Define Section',
            role: 'Define Section'
        },
            {
                label: 'Modify Section',
                role: 'Modify Section'
            },

            {
                label: 'Remove Section',
                role: 'Remove Section'
            },
            {
                label: 'Attach Section',
                role: 'Attach Section'

            },
            {
                label: 'Yield Surface Control',
                role: 'Yield Surface Control'

            },
            {
                label: 'Define Material',
                role: 'Define Material'

            },
            {
                label: 'Modify Material',
                role: 'Modify Material'

            },
            {
                label: 'Remove Material',
                role: 'Remove Material'

            },
            {
                label: 'Attach Material',
                role: 'Attach Material'

            },
            {
                label: 'Information',
                role: 'Information'

            },
        ]},


    {//Fri
        label: 'Conditions',
        submenu: [{
            label: 'Define Fixities',
            role: 'Define Fixities'
        },
            {
                label: 'Define Forces',
                role: 'Define Forces'
            },

            {
                label: 'Define Moments',
                role: 'Define Moments'
            },
            {
                label: 'Define Uniform Loads',
                role: 'Define Uniform Loads'

            },
            {
                label: 'Define Disp. Settlements',
                role: 'Define Disp. Settlements'

            },
            {
                label: 'Define Rot. Settlements',
                role: 'Define Rot. Settlements'

            },
            {
                label: 'Define Temperature Effects',
                role: 'Define Temperature Effects'

            }
        ]},


    {//Six
        label: 'Analysis',
        submenu: [{
            label: '1st-Order Elastic',
            role: '1st-Order Elastic'
        },
            {
                label: '2nd-Order Elastic',
                role: '2nd-Order Elastic'
            },

            {
                label: '1st-Order lnelastic',
                role: '1st-Order lnelastic'
            },
            {
                label: '1st-Order lnelastic',
                role: '1st-Order lnelastic'

            },
            {
                label: 'Elastic Critical Load',
                role: 'Elastic Critical Load'

            },
            {
                label: 'lnelastic Critical Load',
                role: 'lnelastic Critical Load'

            },
            {
                label: 'Natural Period',
                role: 'Natural Period'

            },
            {
                label: 'Setting',
                role: 'Setting'

            },
            {
                label: 'User Defined',
                role: 'User Defined'

            }
        ]},


    {//Seven
        label: 'Results',
        submenu: [{
            label: 'Diagrams',
            role: 'Diagrams'
        },
            {
                label: 'Node Displacements',
                role: 'Node Displacements'
            },

            {
                label: 'Node Reactions',
                role: 'Node Reactions'
            },
            {
                label: 'Elements Forces',
                role: 'Elements Forces'

            },
            {
                label: 'Plastic Deformations',
                role: 'Plastic Deformations'

            },
            {
                label: 'Update Geometry',
                role: 'Update Geometry'

            },
            {
                label: 'MSAPlot',
                role: 'MSAPlot'

            }
        ]}
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)