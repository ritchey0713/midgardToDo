let projectFeatures = []

const filters = {
    searchTerm: "",
    toggle: false
}

const featuresJSON = localStorage.getItem("features")
console.log(featuresJSON)
if (featuresJSON != null) {
    projectFeatures = JSON.parse(featuresJSON)
}

const generateobjList = (projectFeatures, filters) => {
    const counter = document.querySelector("#feature-count")
    const filteredList = projectFeatures.filter((feature)=> {
        const searchTextMatch =  feature.featureText.toLowerCase().includes(filters.searchTerm.toLowerCase())
        const hideComplete = !filters.toggle || !feature.completed
        return searchTextMatch && hideComplete
    });
    
    document.querySelector("#features").innerHTML = ""
    
    filteredList.forEach((feature) => {
        const newPara = document.createElement('p')
        if (feature.featureText.length > 0){
            newPara.textContent = feature.featureText
        }else {
            newPara.textContent = "TBD feature"
        }
        document.querySelector('#features').appendChild(newPara)
    });
    
    const count = projectFeatures.filter((feature)=>{
        return !feature.completed
    });
    counter.innerHTML = ""
    const incompletePara = document.createElement('p')
    incompletePara.textContent = `You have ${count.length} features left to do!`
    document.querySelector("#feature-count").appendChild(incompletePara)

};

generateobjList(projectFeatures, filters)

document.querySelector("#create-feature").addEventListener("click", (e) => {
    const form = document.createElement('form')
    const featureInput = document.createElement("input")
    const submit = document.createElement('button')
    form.id = "new-feature-form"
    featureInput.placeholder = "Create new feature"
    featureInput.class = "new-feature"
    featureInput.name = "newFeature"
    submit.textContent = "Submit!"
    form.appendChild(featureInput)
    form.appendChild(submit)

    document.querySelector("#form-wrapper").appendChild(form)
    e.target.style.visibility = "hidden" 
    document.querySelector("#new-feature-form").addEventListener('submit', (e) => {
        e.preventDefault();
        const newFeature = {
            featureText: e.target.elements.newFeature.value,
            completed: false
        }
        projectFeatures.push(newFeature)
        localStorage.setItem("features", JSON.stringify(projectFeatures))
        document.getElementById('create-feature').style = "visible"
        document.querySelector("#feature-count").textContent = ""
        form.remove()
        generateobjList(projectFeatures, filters)
    });
    
});
        

document.querySelector("#searchTerm").addEventListener("input", (e) => {
    filters.searchTerm = e.target.value
    generateobjList(projectFeatures, filters)
});

document.querySelector("#toggle-complete").addEventListener("change", (e) => {
   filters.toggle = e.target.checked
   generateobjList(projectFeatures, filters)
});


