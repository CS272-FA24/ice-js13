const MY_SECRET_CODE = "ENTER_YOUR_CODE";

function loadCourses() {
    const COURSES = getCourseList();
    const courseDivNode = document.getElementById("course-list");
    COURSES
        .map(c => createCourseComponent(c))
        .forEach(n => courseDivNode.appendChild(n));
}


function addFavorite(id) {
    const starNode = document.getElementById(`course-${id}-star`);
    starNode.className = "bi-star-fill";
}
    
function removeFavorite(id) {
    const starNode = document.getElementById(`course-${id}-star`);
    starNode.className = "bi-star";
}

function createCourseComponent(courseData) {
    const newColDivNode = document.createElement("div");
    newColDivNode.id = `course-${courseData.id}`;
    newColDivNode.className = "col-12 col-md-6 col-lg-4";
    
    const newCardDivNode = document.createElement("div");
    newCardDivNode.className = "card m-2 p-2";

    const newStarNode = document.createElement("span");
    newStarNode.id = `course-${courseData.id}-star`;
    newStarNode.style.float = "right";
    newStarNode.className = "bi-star";
    newStarNode.addEventListener("click", () => {
        if (newStarNode.className === "bi-star") {
            addFavorite(courseData.id);
        } else {
            removeFavorite(courseData.id);
        }
    })

    const newBadgesDivNode = document.createElement("div");
    newBadgesDivNode.style.display = "flex";
    courseData.keywords.forEach(word => {
        const newBadgeNode = document.createElement("p");
        newBadgeNode.className = "badge text-bg-secondary me-2"
        newBadgeNode.innerText = word;
        newBadgesDivNode.appendChild(newBadgeNode)
    })

    const newTitleNode = document.createElement("h2");
    newTitleNode.innerText = `${courseData.id}: ${courseData.name}`;

    const newCreditsNode = document.createElement("p");
    newCreditsNode.style.fontWeight = 200;
    newCreditsNode.innerText = `${courseData.credits} credits`

    const newDescNode = document.createElement("p");
    newDescNode.id = `course-${courseData.id}-description`;
    newDescNode.innerText = courseData.description.substring(0, 200) + "...";

    const newReadMoreNode = document.createElement("button");
    newReadMoreNode.id = `course-${courseData.id}-btn`;
    newReadMoreNode.className = "btn btn-outline-secondary";
    newReadMoreNode.innerText = "Read More"
    newReadMoreNode.addEventListener("click", () => handleReadMore(courseData));

    newTitleNode.appendChild(newStarNode);

    newCardDivNode.appendChild(newTitleNode);
    newCardDivNode.appendChild(newCreditsNode);
    newCardDivNode.appendChild(newBadgesDivNode)
    newCardDivNode.appendChild(newDescNode);
    newCardDivNode.appendChild(newReadMoreNode)

    newColDivNode.appendChild(newCardDivNode);

    return newColDivNode;
}

function handleReadMore(data) { 
    const descNode = document.getElementById(`course-${data.id}-description`);
    const toggleBtn = document.getElementById(`course-${data.id}-btn`);

    if(toggleBtn.innerText === "Read More") {
        descNode.innerText = data.description;
        toggleBtn.innerText = "Read Less";
    } else {
        descNode.innerText = data.description.substring(0, 200) + "...";
        toggleBtn.innerText = "Read More";
    }
}

loadCourses();
