class projectPage{
    constructor(imagePath, description)
    {
        this.imagePath = imagePath;
        this.description = description;
    }
}
class projectData{
    constructor(imagePath, description, projectID){
        this.pages = new Array();
        this.projectID = projectID;
        this.imagePath = imagePath;
        this.description = description;
        this.tags = "";
    }
    addInfo(info)
    {
        let splittedInfo = info.split('\n');
        this.title = splittedInfo[0];
        let tagData = splittedInfo[1].split(", ");
        for(let i = 0; i < tagData.length; i++)
        {
            this.tags += tagData[i];
            if(i < tagData.length - 1)
            {
                this.tags += " ∙ ";
            }
        }
        this.timeLine = splittedInfo[2];
        this.genre = splittedInfo[3];
        this.team = splittedInfo[4];
        this.languages = splittedInfo[5];
        this.role = splittedInfo[6];
        this.engine = splittedInfo[7];
    }
}
let projects = new Array();

function hoverArrow(obj)
{
    obj.classList.add("arrowSelect");
}
function leaveArrow(obj)
{
    obj.classList.remove("arrowSelect");
}
async function loadProjectData(folderName)
{
    console.log(sessionStorage.getItem("projects"));
    if(!sessionStorage.getItem("projects"))
    {
        let success = true;
        for(let i = 0; success; i++)
        {
            success = false;
            let description = folderName + '/' + i +'/description.txt';
            let title = folderName + '/' + i +'/title.txt';
            let imagePath = folderName + '/' + i +'/preview.png';
                await fetch(description)
                .then(function(response) {
                    if (response.ok) {
                        success = true;
                        response = response.text()
                        .then(data => {
                                projects.push(new projectData(imagePath, data, i));
                            });
                    }
                });
                if(success)
                {
                    await fetch(title)
                    .then(function(response)
                    {
                        if (response.ok) 
                        {
                            success = true;
                            response = response.text()
                            .then(data => {
                                    projects[i].addInfo(data);
                                });
                        }
                    });
                    let pageSuccess = true;
                    for(let j = 0; pageSuccess; j++)
                    {
                        pageSuccess = false;
                        let description = folderName + '/' + i +'/' + j + '/text.txt';
                        let pageImagePath = folderName + '/' + i +'/' + j + '/image.png';
                        console.log(pageImagePath);
                        await fetch(description)
                            .then(function(response) {
                            if (response.ok) {
                                pageSuccess = true;
                                response = response.text()
                                .then(data => {
                                        projects[i].pages.push(new projectPage(pageImagePath, data));
                                    });
                            }
                        });
                    }
                }
        }
        projects.forEach(element => console.log(element.title));
        console.log("store session");
        sessionStorage.setItem("projects", JSON.stringify(projects));
    }
    else{
        projects = JSON.parse(sessionStorage.getItem("projects"));
        console.log("already stored")
    }
}
async function displayProjectPreviews(isStartPage){
    // if(sessionStorage.getItem("projects"))
    // {

    //     projects = sessionStorage.getItem("projects");
    // }
    if(projects.length == 0)
    {
        await loadProjectData("Projects");
        console.log("load projects");
    }
    if(!isStartPage)
    {
        console.log("load quest page");
        let box = document.getElementById("questContainer");
        box.innerHTML = "";
        for(let i = projects.length-1; i >= 0; i--)
        {
            if(i == projects.length-1)
            {
    
                box.innerHTML +=
                        `<div class='quest greyBox' id='firstQuestBox' onmouseover="wrap(this)" onmouseleave="unwrap(this)">
                        <div class='imageParent firstQuestImage'>
                        <div class='questImage' style= "background-image: url(`+projects[i].imagePath +`);">
                        </div>
                    </div>
                    <div class='questDescription'>
                        <div class='questHeadContainer'>
                            <div class='questHead active'>Active Quest</div>
                            <h3>`+ projects[i].title + `</h3>
                            <svg height='2' width='50%'>
                                <line x1='0' y1='0' x2='50%' y2='0' class='active'/>
                            </svg> 
                        </div>
                        <div class='genre'>`+projects[i].tags+`</div>
                        <p class="clamp">` + projects[i].description +
                        `</p>
                        <a href="galery.html?index=`+i+`"><div class='button'>View Project</div></a>
                    </div>
                    </div>`;
            }
            else
            {
                box.innerHTML +=
                    `<div class="quest greyBox">
                        <div class="questDescription">
                            <div class="questHeadContainer">
                                <div class="questHead">Completed Quest</div>
                                <h3>`+ projects[i].title + `</h3>
                                <svg height="2" width="50%">
                                    <line x1="0" y1="0" x2="50%" y2="0"/>
                                </svg> 
                            </div>
                            <div class='genre'>`+projects[i].tags+`</div>
                            <p class="clamp">` + projects[i].description +
                            `</p>
                            <a href="galery.html?index=`+i+`"><div class="button">View Project</div></a>
                        </div>
                        <div class="imageParent">
                            <div class="questImage" style= "background-image: url(`+projects[i].imagePath +`);">
                            </div>
                        </div>
                    </div>`
            }
        }
    }
    else
    {
        let project = projects[projects.length-1];
        console.log("load start page");
        let headline = document.getElementById("headline");
        projectPreview = document.createElement("div");
        projectPreview.classList.add("greyBox");
        projectPreview.setAttribute("id", 'activeQuest');
        projectPreview.innerHTML =
            `<div id="activeQuestDescription">
                <div id="activeQuestHead">Active Quest</div>
                <h3>`+ project.title + `</h3>
                <svg height="2" width="168">
                    <line x1="0" y1="0" x2="168" y2="0" style="stroke:#81f78599;stroke-width:2"/>
                </svg> 
                <p>`+ project.tags + `</p>
                <a href="galery.html?index=`+(projects.length-1)+`"><div class="button">View Project</div></a>
            </div>
            <div class="imageParent">
                <div class="questImage" style="background-image: url(`+project.imagePath +`) !important;">
                </div>
            </div>`
        headline.after(projectPreview);
        console.log("preview image path: " + project.imagePath )
    }
}
async function displayProjectPage(pageIndex){
    if(projects.length == 0)
    {
        await loadProjectData("Projects");
        console.log("load projects");
    }
        console.log("load galery");
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        let index =  urlParams.get("index");//sessionStorage.getItem("projectIndex");
        console.log(projects[index].pages.length + " pages");
        console.log("project index is " + index);
        let box = document.getElementById("galeryContainer");
        console.log(projects[index].pages[pageIndex].imagePath);
        box.innerHTML =
        `<div id="galeryHead">
                <div id="headline">    
                    <h1>`+projects[index].title+`</h1>
                    <div class="genre">`+projects[index].tags+`</div>
                </div>
            </div> 
            <img class="arrow"`+ ((pageIndex > 0 )? `onmouseover="hoverArrow(this)" onmouseleave="leaveArrow(this)" onclick="displayProjectPage(`+(pageIndex-1)+`)"`:``) +`src="Images/arrow_back_black_24dp.svg"> 
            <img class="galeryImage" src="`+ projects[index].pages[pageIndex].imagePath+`" alt="Symphonic Forest"> 
            <img class="arrow flipped"`+ ((pageIndex < projects[index].pages.length -1 )? `onmouseover="hoverArrow(this)" onmouseleave="leaveArrow(this)"onclick="displayProjectPage(`+(pageIndex+1)+`)"`:``) +`src="Images/arrow_back_black_24dp.svg"> 
            <div class="greyBox projectPageText">
                <div>`+ projects[index].pages[pageIndex].description +`</div>
            </div>
            <div class="greyBox propertyBox">
                <div class="property"><div class="propertyName">Timeline:</div><div>`+projects[index].timeLine+`</div></div>
                <div class="property"><div class="propertyName">Genre:</div><div>`+projects[index].genre+`</div></div>
                <div class="property"><div class="propertyName">Team:</div><div>`+projects[index].team+`</div></div>
                <div class="property"><div class="propertyName">Languages:</div><div>`+projects[index].languages+`</div></div>
                <div class="property"><div class="propertyName">My role:</div><div>`+projects[index].role+`</div></div>
                <div class="property"><div class="propertyName">Engine:</div><div>`+projects[index].engine+`</div></div>
            </div>`
            
}
function wrap(element)
{
    
}
function unwrap(element)
{

}