const menu = document.querySelector("#menu-bars");
const navbar = document.querySelector(".navbar");

const searchIcon = document.querySelector("#search-icon");
const searchForm = document.querySelector(".search-form");

const mapSmallToDetail = {};

const categoryImageMap = {
    "web dev": "./images/web dev image.jpg",
    "blockchain": "./images/blockchain-image.jpg",
    "ai": "./images/ai-image.webp",
    "cloud": "./images/cloud-image.jpg",
};

searchIcon.onclick = ()=>{
    searchIcon.classList.toggle('fa-times');
    searchForm.classList.toggle('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

menu.onclick = ()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    searchIcon.classList.remove('fa-times');
    searchForm.classList.remove('active');
}
window.onscroll = ()=>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    searchIcon.classList.remove('fa-times');
    searchForm.classList.remove('active');
}

function truncateText(selector, wordLimit) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        const words = element.textContent.split(" ");
        if (words.length > wordLimit) {
            const small = words.slice(0, wordLimit).join(" ") + " ...";
            mapSmallToDetail[small] = element.textContent;
            element.textContent = small;
        }
    });
}




// Apply truncation to elements with the class 'content'
truncateText(".text", 20);

const readMoreBtns = document.querySelectorAll('.read-more');
let editPost = null;

readMoreBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const post  = e.target.parentNode.parentNode;
        const children = post.children;
        const title = children[2].textContent;
        const content = mapSmallToDetail[children[3].textContent];
        const blogTitle = encodeURIComponent(title);
        const blogContent = encodeURIComponent(content);
        const url = `blog.html?title=${blogTitle}&content=${blogContent}`;
        window.location.href = url;
    })
})

const createPost = (title,content,category)=>{
    const post = document.createElement("div");
    post.setAttribute("class","post");
    post.innerHTML = `
        <img src="${getCategoryImage(category)}" alt="blog-image" class="image">
                <div class="date">
                    <i class="far fa-clock"></i>
                    <span>1st May, 2021</span>
                </div>    
                <h3 class="title">${title}</h3>
                <p class="text">${content}
                </p>
                <div class="post-btns">
                    <button class="read-more">read more</button>
                    <button class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
                <div class="links">
                    <a href="#" class="user">
                        <i class="far fa-user"></i>
                        <span>by admin</span>
                    </a>
                    <a href="#" class="icon">
                        <i class="far fa-comment"></i>
                        <span>(45)</span>
                    </a>
                    <a href="#" class="icon">
                        <i class="far fa-share-square"></i>
                        <span>(29)</span>
                    </a>
                </div>
    `
    const readMore = post.children[4].children[0];

    readMore.addEventListener('click',(e)=>{
        const post  = e.target.parentNode.parentNode;
        const children = post.children;
        const title = children[2].textContent;
        const content = mapSmallToDetail[children[3].textContent];
        const blogTitle = encodeURIComponent(title);
        const blogContent = encodeURIComponent(content);
        const url = `blog.html?title=${blogTitle}&content=${blogContent}`;
        window.location.href = url;
    });
    const edit = post.children[4].children[1].children[0];

    edit.addEventListener('click',(e)=>{
        const post = e.target.parentNode.parentNode.parentNode;
        editPost = post;
        const children = post.children;
        const title = children[2].textContent;
        const content = mapSmallToDetail[children[3].textContent];
        form[0].value = title;
        form[1].value = content;
        form.style.right = 0;
    });

    truncateText(".text", 20);
    return post;
}

const form = document.querySelector(".form");
const formCross = document.querySelector(".form-cross");


const editBtns = document.querySelectorAll(".edit");
const postContainer = document.querySelector(".posts-container");


formCross.onclick = ()=>{
    form.style.right = "-100%";
    form.reset();
}

// Function to dynamically select an image based on the category
function getCategoryImage(category) {
    return categoryImageMap[category.toLowerCase()] || "./images/banner1.avif";
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(editPost){
        const title = editPost.children[2];
        const content = editPost.children[3];
        title.textContent = form[0].value;
        content.textContent = form[1].value;
        editPost=null;
    }
    else{
        const newPost = createPost(form[0].value,form[1].value,form[2].value);
        postContainer.appendChild(newPost);
    }
    truncateText(".text", 20);

    form.reset();
})



editBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const post = e.target.parentNode.parentNode.parentNode;
        editPost = post;
        const children = post.children;
        const title = children[2].textContent;
        const content = mapSmallToDetail[children[3].textContent];
        form[0].value = title;
        form[1].value = content;
        form.style.right = 0;
    })
})


const newPostBtn = document.querySelector('.new-post');

newPostBtn.onclick = ()=>{
    form.reset();
    form.style.right = 0;
}
