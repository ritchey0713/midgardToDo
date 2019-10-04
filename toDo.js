const projectFeatures = [
    {
        featureText: "create Github repo",
        completed: false 
    }, 
    {
        featureText: "Build basic README.md",
        completed: true
    },
    { 
        featureText: "set up Lucid Chart",
        completed: true
    },
    { 
        featureText: "Design Models, Controllers, Views",
        completed: true
    }, 
    {
        featureText: "bootstrap Project structure",
        completed: false
    }
]

const filters = {
    searchTerm: "",
    toggle: false
}

const generateobjList = (projectFeatures, filters) => {
    const counter = document.querySelector("#feature-count")
    
    const filteredList = projectFeatures.filter((feature)=> {
        const searchTextMatch =  feature.featureText.toLowerCase().includes(filters.searchTerm.toLowerCase())
        const hideComplete = !filters.toggle || !feature.completed
        return searchTextMatch && hideComplete
    })
    
    document.querySelector("#features").innerHTML = ""
    
    filteredList.forEach((feature) => {
        const newPara = document.createElement('p')
        newPara.textContent = feature.featureText
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


