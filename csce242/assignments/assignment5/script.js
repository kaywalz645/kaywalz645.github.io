window.onload = ()=> {
    document.getElementById("button-show").onclick = showImage;
    document.getElementById("button-hide").onclick = hideImage;
    document.getElementById("button-animate").onclick = startAnimation;
    document.getElementById("button-comment").onclick = submitComment;
};

const hideImage= () => {
    document.getElementById("kitten").classList.add("hide");
};
const showImage= () => {
    document.getElementById("kitten").classList.remove("hide");
};

const startAnimation= () => {
    document.getElementById("heart").classList.add("heart-animate");
}

const submitComment = () => {
    const firstName = document.getElementById("txt-product-name").value;
    const commentText = document.getElementById("txt-comment").value;
    const rating = document.getElementById("txt-rating").value;
    const username = document.getElementById("txt-username").value;

    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const commentContent = document.createElement("p");
    commentContent.innerHTML = `${firstName}<br> ${rating}/5 stars, ${commentText}<br> by ${username}`;

    commentElement.appendChild(commentContent);

    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.appendChild(commentElement);

    document.getElementById("txt-product-name").value = "";
    document.getElementById("txt-comment").value = "";
    document.getElementById("txt-rating").value = "";
    document.getElementById("txt-username").value = "";

}