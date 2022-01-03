<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Helen Hinrichs - Portfolio</title>
</head>
<body>
    <?php 
    echo "HELO";
        include 'header.php';
    ?>
    <div class="flexBox">
        <div class="Box">
            <!--<div class="tabs"> <button onclick="skills()">Skills</button><button onclick="inventory()">Inventory</button><button onclick="quests()">Quests</button><button onclick="journal()">Journal</button></div>*-->
            <div class="subBox"> <img id="profileImage" src="Images/Heleen_small.svg"width= "331" alt="Helen Hinrichs"> </div>
            <div class="description">
                <div id="headline">    
                    <h1>Helen Hinrichs</h1>
                    <p>Game Programmer</p>
                </div> 
                <div id ="activeQuest" class="characterInfo">
                    <div id="activeQuestDescription">
                        <div id="activeQuestHead">Active Quest</div>
                        <h3>Symphonic Forest</h3>
                        <svg height="2" width="168">
                            <line x1="0" y1="0" x2="168" y2="0" style="stroke:#81f78599;stroke-width:2"/>
                        </svg> 
                        <p>Audio . Game</p>
                        <div class="button">View Project</div>
                    </div>
                    <div id="activeQuestImage">
                    </div>
                </div>
                <div class="characterInfo">
                    <h3>Main Skills</h3>
                    <div id="skills">
                        <div class="skill"><img class="skillImage" src="Images/keyboard_alt_black_24dp.svg"> 
                            <p>Programming<br>Languages</p>
                            <p class="skillList">C++, C#, JavaScript</p>
                        </div>
                        <div class="skill"><img class="skillImage" src="Images/sports_esports_black_24dp.svg"> 
                            <p>Game<br>Programming</p>
                            <p class="skillList">Unity, MonoGame, SFML</p>
                        </div>
                        <div class="skill"><img class="skillImage" src="Images/photo_black_24dp.svg"> 
                            <p>Graphic<br>Programming</p>
                            <p class="skillList">OpenGL(ES), OpenCV</p>
                        </div>
                    </div>
                </div>
                <div id="contact" class="characterInfo">
                    <h3>Contact</h3>
                    <div class="innerBox">
                        <div class="circle"><img class="icon" src="Images/mail.svg" alt="Mail contact"></div>
                        <div class="circle" onmousedown="clickButton(this)" onmouseup="releaseButton(this)">
                            <a href="https://github.com/helenhinrichs" target="_blank">
                                <img class="icon" src="Images/github.svg" alt="Mail contact">
                            </a>
                        </div>
                        <div class="circle" onmousedown="clickButton(this)" onmouseup="releaseButton(this)">
                            <a href="https://www.linkedin.com/in/helen-hinrichs-6200b9224/" target="_blank">
                                <img class="icon" src="Images/linkedin.svg" alt="Mail contact">
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</body>
<script>
    // window.onscroll = function() {scrollFunction()};

    // function scrollFunction() {
    //     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //         document.getElementById("header").classList.add("shrink");
    //         var children = document.getElementById("header").children;
    //         for(let i = 0; i < children.length; i++)
    //         {
    //             children[i].classList.add("brighter");
    //         }
    //     } else {
    //         document.getElementById("header").classList.remove("shrink");
    //         var children = document.getElementById("header").children;
    //         for(let i = 0; i < children.length; i++)
    //         {
    //             children[i].classList.remove("brighter");
    //         }
    //     }
    // } 

    function leaveHover(obj)
    {
        obj.parentNode.classList.remove("headerSelect");
    }
    function hover(obj)
    {
        obj.parentNode.classList.add("headerSelect");
    }
    function select(obj)
    {
        let menuPointList = document.getElementsByClassName("menuPoint");
        for (i = 0; i < menuPointList.length; i++) {
            menuPointList[i].classList.remove("selected");
        } 
        obj.classList.add("selected");
    }
    function clickButton(obj)
    {
        console.log("click");
        obj.classList.add("clickedCircle");
        obj.children[0].classList.add("iconHighlight");
    }
    function releaseButton(obj)
    {
        console.log("release");
        obj.classList.remove("clickedCircle");
        obj.children[0].classList.remove("iconHighlight");
    }
  </script>
</html>
