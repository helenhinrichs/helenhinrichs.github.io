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
        this.isVideo = false;
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
                        let isVideo = false;
                        let description = folderName + '/' + i +'/' + j + '/text.txt';
                        if(imageExists(description))
                        {
                            let pageImagePath = folderName + '/' + i +'/' + j + '/image.png';
                            if(!imageExists(pageImagePath)){
                                pageImagePath = folderName + '/' + i +'/' + j + '/video.mp4';
                                isVideo = true;
                            }
                            await fetch(description)
                                .then(function(response) {
                                if (response.ok) {
                                    pageSuccess = true;
                                    response = response.text()
                                    .then(data => {
                                            projects[i].pages.push(new projectPage(pageImagePath, data));
                                            projects[i].pages[j].isVideo = isVideo;
                                        });
                                    }
                            });
                        }
                    }
                }
        }
        sessionStorage.setItem("projects", JSON.stringify(projects));
    }
    else{
        projects = JSON.parse(sessionStorage.getItem("projects"));
    }
}
//stolen from here: https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}
async function displayProjectPreviews(isStartPage){
    // if(sessionStorage.getItem("projects"))
    // {

    //     projects = sessionStorage.getItem("projects");
    // }
    if(projects.length == 0)
    {
        await loadProjectData("Projects");
    }
    if(!isStartPage)
    {
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
    }
}
async function displayProjectPage(pageIndex){
    if(projects.length == 0)
    {
        await loadProjectData("Projects");
    }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        let index =  urlParams.get("index");//sessionStorage.getItem("projectIndex");
        let box = document.getElementById("galeryContainer");
        box.innerHTML =
        `<div id="galeryHead">
                <div id="headline">
                    <a href="galery.html?index=`+((index>0)?(index-1) : (projects.length-1))+`">
                        <img class="arrow" onmouseover="hoverArrow(this)" onmouseleave="leaveArrow(this)" src="Images/arrow_back_black_24dp.svg">
                    </a>
                    <h1>`+projects[index].title+`</h1>
                    <a href="galery.html?index=`+((index<projects.length-1)? (parseInt(index,10)+1) : 0) +`">
                        <img class="arrow flipped" onmouseover="hoverArrow(this)" onmouseleave="leaveArrow(this)" src="Images/arrow_back_black_24dp.svg">
                    </a>
                </div>
                <div class="genre">`+projects[index].tags+`</div>
            </div>`;
            for(i = 0; i < projects[index].pages.length; i++)
            { 
                if( projects[index].pages[i].isVideo)
                {
                    box.innerHTML +=`<video controls class="galeryImage"> <source src="`+ projects[index].pages[i].imagePath+`" type="video/mp4">
                    Your browser does not support the video tag.
                    </video>`;
                }
                else
                {
                    box.innerHTML +=`<img class="galeryImage" src="`+ projects[index].pages[i].imagePath+`" alt="Symphonic Forest">`;
                }
                box.innerHTML += `<div class="greyBox projectPageText">
                                <div>`+ projects[index].pages[i].description +`</div>`
                
            }
            box.innerHTML += `</div>`;

            // `+ ((index > 0 )? `<img class="arrow" onmouseover="hoverArrow(this)" onmouseleave="leaveArrow(this)" onclick="displayProjectPage(`+(pageIndex-1)+`)" src="Images/arrow_back_black_24dp.svg"> `:``)
            // + ((index < projects.length -1 )? `<img class="arrow flipped" onmouseover="hoverArrow(this)" onmouseleave="leaveArrow(this)"onclick="displayProjectPage(`+(pageIndex+1)+`)"src="Images/arrow_back_black_24dp.svg"> `:``)
            
}
function wrap(element)
{
    
}
function unwrap(element)
{

}