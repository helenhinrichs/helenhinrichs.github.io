window.onscroll = function() {scrollFunction()};

function scrollFunction() {
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
    let charts = document.getElementsByClassName("partCircle");
    for(let i = 0; i < charts.length; i++)
    {
        if(isInViewport(charts[i]))
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
        if(isInViewport(charts[i]))
        {
            charts[i].style.animation = "progress 1s ease-in-out forwards";
        }
        else
        {
            charts[i].style.animation = "setZero 1s ease-in-out forwards";
        }
    }
} 
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        (rect.bottom >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))||
        (rect.top>= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    );
}
function hoverCircle(obj)
{
    console.log("hello");
    obj.children[1].style.animation = "none";
}
function leaveCircle(obj)
{
    console.log("bye");
    obj.children[1].style.animation = "progress 1s ease-in-out forwards";
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