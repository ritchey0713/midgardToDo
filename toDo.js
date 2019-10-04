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

const featuresLeft = (projectFeatures) => {
    const incompletePara = document.createElement('p')
    const count = projectFeatures.filter((feature)=>{
        return !feature.completed
    });
    incompletePara.textContent = `You have ${count.length} features left to do!`
    document.body.appendChild(incompletePara)
};

featuresLeft(projectFeatures)


const generateobjList = (projectFeatures) => {
    projectFeatures.forEach((feature) => {
        const newPara = document.createElement('p')
        newPara.textContent = feature.featureText
        document.body.appendChild(newPara)
    });

};

generateobjList(projectFeatures)

document.querySelector("#create-feature").addEventListener("click", (e) => {
    console.log("clicked")
})

