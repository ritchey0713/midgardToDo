const getFeatures = () => {
    const featuresJSON = localStorage.getItem("features")
    if (featuresJSON != null) {
        return JSON.parse(featuresJSON)
    }else{
        return []
    }
}

const generateFeatures = (feature) => {
    const newPara = document.createElement('p')
    
        if (feature.featureText.length > 0){
            newPara.textContent = feature.featureText
        }else {
            newPara.textContent = "TBD feature"
        }
        document.querySelector('#features').appendChild(newPara)
}

const generateobjList = (projectFeatures, filters) => {
    const filteredList = projectFeatures.filter((feature)=> {
        const searchTextMatch =  feature.featureText.toLowerCase().includes(filters.searchTerm.toLowerCase())
        const hideComplete = !filters.toggle || !feature.completed
        return searchTextMatch && hideComplete
    });
    
    document.querySelector("#features").innerHTML = ""
    
    filteredList.forEach((feature) => {
        generateFeatures(feature)
    });
};

const generateCounter = () => {
    const counter = document.querySelector("#feature-count")
    const incompletePara = document.createElement('h4')
    const count = projectFeatures.filter((feature)=>{
        return !feature.completed
    });
    counter.innerHTML = ""
    incompletePara.textContent = `You have ${count.length} features left to do!`
    document.querySelector("#feature-count").appendChild(incompletePara)
}

const renderForm = (e) => {
    const form = generateForm()
    document.querySelector("#form-wrapper").appendChild(form)
    e.target.style.visibility = "hidden" 
    document.querySelector("#new-feature-form").addEventListener('submit', (e) => {
        e.preventDefault();
        const newFeature = {
            featureText: e.target.elements.newFeature.value,
            completed: false
        }
        saveFeature(newFeature)
        document.getElementById('create-feature').style = "visible"
        document.querySelector("#feature-count").textContent = ""
        form.remove()
        generateobjList(projectFeatures, filters)
        generateCounter()
    });
}

const generateForm = () => {
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
    return form 
}

const saveFeature = (newFeature) => {
    projectFeatures.push(newFeature)
    localStorage.setItem("features", JSON.stringify(projectFeatures))
}