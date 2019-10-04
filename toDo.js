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

const featuresLeft = (projectFeatures) => {
    const incompletePara = document.createElement('p')
    const count = projectFeatures.filter((feature)=>{
        return !feature.completed
    });
    incompletePara.textContent = `You have ${count.length} features left to do!`
    document.querySelector("#feature-count").appendChild(incompletePara)
};

featuresLeft(projectFeatures)


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

};

generateobjList(projectFeatures, filters)

document.querySelector("#create-feature").addEventListener("click", (e) => {
    const form = document.createElement('input')
    form.placeholder = "Create new feature"
    form.id = "new-feature-form"
    document.body.appendChild(form)

    document.querySelector("#new-feature-form").addEventListener('input', (e) => {
        console.log(e.target.value)
    })    
});

document.querySelector("#searchTerm").addEventListener("input", (e) => {
    filters.searchTerm = e.target.value
    generateobjList(projectFeatures, filters)
})




