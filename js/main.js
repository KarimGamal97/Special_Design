// Check if there is Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove('active');

        // Add active class on element with data-color === local Storage item
        if (element.dataset.color === mainColors) {
            // Add active Class
            element.classList.add("active");
        }
    });
}

// Random Background Option
let backgroundOption = true;

// Variable to control background interval
let backgroundInterval;

// Check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage is not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // Remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// Start Settings Box

document.querySelector(".toggle-settings .settings-icon").onclick = function() {

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
};

// End Settings Box

// Start Switch Colors

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});

// End Switch Colors

// Start Switch Backgrounds Option

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span => {

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }

    });

});

// End Switch Colors

// Start Changing background Images 

// Declaring Landing Page Elements
let landingPage = document.querySelector(".landing-page"),
    imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Set Time and Change Background Randomly

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + ' ")';
        }, 7500);
    }
}
randomizeImgs();

// End Changing background Images

// Start Skills Scrolling

let ourSkills = document.querySelector(".skills");

window.onscroll = function() {

    let skillsOffsetTop = ourSkills.offsetTop,
        skillsOuterHeight = ourSkills.offsetHeight,
        windowHeight = this.innerHeight,
        windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// End Skills Scrolling

// Start Popup With Gallery Images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
    });
});

document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

// End Popup With Gallery Images

// Start Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// End Bullets

// Start Select All links
const allLinks = document.querySelectorAll(".links a");
allLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// End Select All links

// Handle Active State
function handleActive(e) {

    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove('active');
    });

    // Add active class on self
    e.target.classList.add("active");

}

// Handle Active State

// Start Show and Hide Bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span"),
    bulletsContainer = document.querySelector(".nav-bullets"),
    bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem != null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }

        handleActive(e);
    });
});

// End Show and Hide Bullets

// Start Reset Button
document.querySelector(".reset-options").onclick = function() {

    // localStorage.clear();
    // >>> clear all the data of local storage

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    window.location.reload();

};

// End Reset Button


// Start Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu"),
    theLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    theLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu and Toggle Menu
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== theLinks) {
        if (theLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            theLinks.classList.toggle("open");
        }
    }
});

theLinks.onclick = function(e) {
    e.stopPropagation();
}


// End Toggle Menu