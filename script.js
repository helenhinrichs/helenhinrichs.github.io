window.onscroll = function() {scrollFunction()};
window.onresize = function(){chartAnimation()};

function chartAnimation(){
    let charts = document.getElementsByClassName("partCircle");
    for(let i = 0; i < charts.length; i++)
    {
        if(isInViewport(charts[i], 100))
        {
            charts[i].style.animation = "progress 1s ease-in-out forwards";
        }
        else
        {
            charts[i].style.animation = "setZero 1s ease-in-out forwards";
        }
    }
    charts = document.getElementsByClassName("skillLine");
    for(let i = 0; i < charts.length; i++)
    {
        if(isInViewport(charts[i], 0))
        {
            charts[i].style.animation = "progress 1s ease-in-out forwards";
        }
        else
        {
            charts[i].style.animation = "setZero 1s ease-in-out forwards";
        }
    }
}

function scrollFunction() {
    chartAnimation();
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("header").classList.add("shrink");
        var children = document.getElementById("header").children;
        for(let i = 0; i < children.length; i++)
        {
            children[i].classList.add("brighter");
        }
    } else {
        document.getElementById("header").classList.remove("shrink");
        var children = document.getElementById("header").children;
        for(let i = 0; i < children.length; i++)
        {
            children[i].classList.remove("brighter");
        }
    }
} 
function isInViewport(element, offset) {
    const rect = element.getBoundingClientRect();
    return (
        (rect.bottom >= offset && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))||
        (rect.top >= offset && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    );
}
function leaveHover(obj)
{
    document.getElementById("header").classList.remove("headerSelect");
}
function hover(obj)
{
    document.getElementById("header").classList.add("headerSelect");
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