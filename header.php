<?php
echo "<div id="header">
        <div class="menuPoint" onmouseover="hover(this)" onmouseleave="leaveHover(this)" onclick="select(this)">Profile</div>
        <div class="menuPoint" onmouseover="hover(this)" onmouseleave="leaveHover(this)" onclick="select(this)">Skills</div>
        <div class="menuPoint" onmouseover="hover(this)" onmouseleave="leaveHover(this)" onclick="select(this)">Quests</div>
</div>
<script>
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
    } 
  </script>";
?>