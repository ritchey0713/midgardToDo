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
    searchTerm: ""
}

const generateobjList = (projectFeatures, filters) => {
    const filteredList = projectFeatures.filter((feature)=> {
        return feature.featureText.toLowerCase().includes(filters.searchTerm.toLowerCase())
    });
    document.querySelector("#features").innerHTML = ""
    filteredList.forEach((feature) => {
        const newPara = document.createElement('p')
        newPara.textContent = feature.featureText
        document.querySelector('#features').appendChild(newPara)
    });

    const incompletePara = document.createElement('p')
    const count = projectFeatures.filter((feature)=>{
        return !feature.completed
    });
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
    // console.log(e.target.sty)
    e.target.style.visibility = "hidden" 
    document.querySelector("#new-feature-form").addEventListener('submit', (e) => {
        document.getElementById('create-feature').style = "visible"
        e.preventDefault();
        console.log(e.target.elements.newFeature.value)
        form.remove()
    });  
});

      


document.querySelector("#searchTerm").addEventListener("input", (e) => {
    filters.searchTerm = e.target.value
    generateobjList(projectFeatures, filters)
});




