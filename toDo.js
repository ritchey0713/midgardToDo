"use strict"

let projectFeatures = getFeatures() 

const filters = {
    searchTerm: "",
    toggle: false
}

generateobjList(projectFeatures, filters)

generateCounter()

document.querySelector("#create-feature").addEventListener("click", (e) => {
    renderForm(e)
});
        
document.querySelector("#searchTerm").addEventListener("input", (e) => {
    filters.searchTerm = e.target.value
    generateobjList(projectFeatures, filters)
});

document.querySelector("#toggle-complete").addEventListener("change", (e) => {
   filters.toggle = e.target.checked
   generateobjList(projectFeatures, filters)
});


