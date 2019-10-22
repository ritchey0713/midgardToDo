"use strict"

const getFeatures = () => {
    const featuresJSON = localStorage.getItem("features")
    return featuresJSON != null ? JSON.parse(featuresJSON) : []
}

const generateFeatures = (feature) => {
    const featureLabel = document.createElement("label")
    const featureDiv = document.createElement("div")
    const checkBox = document.createElement("input")
    const featureSpan = document.createElement('a')
    const deleteButton = document.createElement("button")

    featureLabel.id = "feature-label"
    featureLabel.classList.add("list-item")

    featureDiv.id = "feature-wrapper"
    featureDiv.classList.add("list-item__container")

    // checkBox.type = "checkbox"
    checkBox.setAttribute("type", "checkbox")
    checkBox.name = "completed"
    checkBox.id = "completed" 
    checkBox.checked = feature.completed
    
    featureSpan.id = "feature-span"

    deleteButton.id = "delete-feature"
    deleteButton.textContent = "Remove"
    deleteButton.classList.add("button", "button--text")

    deleteButton.addEventListener('click', (e)=> {
        removeFeature(feature.id)
        saveFeature()
        generateobjList(projectFeatures, filters)
        generateCounter()
    })

    featureSpan.addEventListener("click", (e) => {
        e.preventDefault();
        renderForm(e, feature.id)
    })
    checkBox.addEventListener("change", (e) => {
        updateCheckBox(feature.id);
        saveFeature();
        generateobjList(projectFeatures, filters)
        generateCounter()
    })

    
    if (feature.featureText.length > 0){
        featureSpan.textContent = feature.featureText
    }else {
        featureSpan.textContent = "TBD feature"
    }
    document.querySelector('#features').appendChild(featureLabel)
    featureLabel.appendChild(featureDiv)
    featureDiv.appendChild(checkBox)
    featureDiv.appendChild(featureSpan)
    featureLabel.appendChild(deleteButton)
}

const generateobjList = (projectFeatures, filters) => {
    const featureContainer = document.querySelector("#features")
    featureContainer.innerHTML = ""
    const filteredList = projectFeatures.filter((feature)=> {
        const searchTextMatch =  feature.featureText.toLowerCase().includes(filters.searchTerm.toLowerCase())
        const hideComplete = !filters.toggle || !feature.completed
        return searchTextMatch && hideComplete
    });
    
    
    if (filteredList.length > 0 ) {
        filteredList.forEach((feature) => generateFeatures(feature));

    } else {
        featureContainer.innerHTML = "There are no pending features."
    }
};

const generateCounter = () => {
    const counter = document.querySelector("#feature-count")
    const incompletePara = document.createElement('h4')
    const count = projectFeatures.filter((feature)=> !feature.completed);
    counter.innerHTML = ""
    incompletePara.classList.add("list-title")
    if (count.length > 1){
        incompletePara.textContent = `You have ${count.length} features left to do!`

    } else if (count.length === 1) {
        incompletePara.textContent = `You only have ${count.length} feature left to do!`
    } else {
        incompletePara.textContent = `You have no features to do currently.`
    }
    document.querySelector("#feature-count").appendChild(incompletePara)
}

const renderForm = (e, id=undefined) => {
    const feature = projectFeatures.find((chore) => {
        return chore.id == id
    })

    const form = generateForm()
    document.querySelector("#form-wrapper").appendChild(form)
    e.target.style.visibility = "hidden" 
    if (id === undefined){
        document.querySelector("#new-feature-form").addEventListener('submit', (e) => {
            e.preventDefault();
            const text = e.target.elements.newFeature.value.trim()
            if(text.length > 0){
                const newFeature = {
                    id: uuidv4(),
                    featureText: text,
                    completed: false
                }
                saveFeature(newFeature)
                document.getElementById('create-feature').style = "visible"
                document.querySelector("#feature-count").textContent = ""
                form.remove()
                generateobjList(projectFeatures, filters)
                generateCounter()
            }
        });
            
    } else {
        document.querySelector("#new-feature").value = feature.featureText

        document.querySelector("#new-feature-form").addEventListener('submit', (e) => {
            e.preventDefault();
            feature.featureText = e.target.elements.newFeature.value 
            saveFeature(feature, false)
            document.getElementById('create-feature').style = "visible"
            document.querySelector("#feature-count").textContent = ""
            form.remove()
            generateobjList(projectFeatures, filters)
            generateCounter()
            })

    }
}
    

const generateForm = () => {
    const form = document.createElement('form')
    const featureInput = document.createElement("input")
    const submit = document.createElement('button')
    form.id = "new-feature-form"

    featureInput.placeholder = "Create new feature"
    featureInput.id = "new-feature"
    featureInput.name = "newFeature"
    featureInput.classList.add("input")

    submit.classList.add("button")
    submit.textContent = "Submit!"

    form.appendChild(featureInput)
    form.appendChild(submit)
    return form 
}

const saveFeature = (newFeature = null) => {
    let foundFeature = null;
    if (newFeature){
        foundFeature = projectFeatures.find((feature) => feature.id === newFeature.id)
    }
    if (newFeature != null && !foundFeature ) {
        projectFeatures.push(newFeature)
    }
    localStorage.setItem("features", JSON.stringify(projectFeatures))
}

const removeFeature = (id) => {
    const featureIndex = projectFeatures.findIndex( (feature)=> feature.id === id );
    if (featureIndex > -1) {
        projectFeatures.splice(featureIndex, 1)
    }
}

const updateCheckBox = (id) => {
    const feature = projectFeatures.find((feature) => feature.id === id);
    if (feature != undefined ){
        feature.completed = !feature.completed
    }
}