import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "assets/images";

export const avtarUsers = [
    { id: 1, name: 'Dipesh Mali', image: avatar1 },
    { id: 2, name: 'Mahesh', image: avatar2 },
    { id: 3, name: 'Foram', image: avatar3 },
    { id: 4, name: 'Pratik', image: avatar4 },
    { id: 5, name: 'Priyal', image: avatar5 },
]


// ApplicationAddEdit.js

export const applicationType = [{
    value: "Web",
    label: "Web",
}, {
    value: "Mobile",
    label: "Mobile",
}, {
    value: "API",
    label: "API",
}, {
    value: "Thick Client",
    label: "Thick Client",
},
]

export const assessmentType = [{
    value: "Default1",
    label: "Default 1",
}, {
    value: "Default2",
    label: "Default 2",
}, {
    value: "Default3",
    label: "Default 3",
}]

export const commonForAppDropDown = [{
    value: "Foram Sankhavara",
    label: "Foram Sankhavara",
}, {
    value: "Dipesh Mali",
    label: "Dipesh Mali",
}, {
    value: "Mahesh Trapasiya",
    label: "Mahesh Trapasiya",
}, {
    value: "Pratik Shah",
    label: "Pratik Shah",
}]

export const tamplateAppData = [{
    value: "Default Template",
    label: "Default Template",
},
{
    value: "ABC Template",
    label: "ABC Template",
},
{
    value: "DEF Template",
    label: "DEF Template",
}]

export const statusApp = [{
    value: "Active",
    label: "Active",
}, {
    value: "Deactive",
    label: "Deactive",
}]


//add finding 


export const statusFinding = [{
    value: "Open",
    label: "Open",
}, {
    value: "Close",
    label: "Close",
}]

export const severityFinding = [{
    value: "Critical",
    label: "Critical"
}, {
    value: "High",
    label: "High"
}, {
    value: "Medium",
    label: "Medium"
}]


//add Finding page => Button Groups data

export const attackVectorFinding = [{
    id: "btn1",
    labelName: "Network (N)",

}, {
    id: "btn2",
    labelName: "Adjacent (A)",

}, {
    id: "btn3",
    labelName: "Local (L)",

}, {
    id: "btn4",
    labelName: "Physical (P)",

}]

export const scopeFinding = [{
    id: "btn5",
    labelName: "Unchanged (U)",
}, {
    id: "btn6",
    labelName: "High (H)",
}]

export const attackComplexityFinding = [{
    id: "btn7",
    labelName: "Low (L)",
}, {
    id: "btn8",
    labelName: "High (H)",
},]

export const confidentialityFinding = [{
    id: "btn9",
    labelName: "None (N)",
}, {
    id: "btn10",
    labelName: "Low (L)",
}, {
    id: "btn11",
    labelName: "High (H)",
}]

export const privilegesRequiredFinding = [{
    id: "btn12",
    labelName: "None (N)",

}, {
    id: "btn13",
    labelName: "Low (L)",


}, {
    id: "btn14",
    labelName: "High (H)",

}]

export const integrityFinding = [{
    id: "btn15",
    labelName: "None (N)",
}, {
    id: "btn16",
    labelName: "Low (L)",
}, {
    id: "btn17",
    labelName: "High (H)",
}]

export const userInteractionFinding = [{
    id: "btn18",
    labelName: "None (N)",
}, {
    id: "btn19",
    labelName: "Required (R)",
}]

export const availabilityFinding = [{
    id: "btn20",
    labelName: "None (N)",
}, {
    id: "btn21",
    labelName: "Low (L)",
}, {
    id: "btn22",
    labelName: "High (H)",
}]