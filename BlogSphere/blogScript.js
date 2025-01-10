// Function to get query parameters from URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        title: params.get('title'),
        content: params.get('content'),
    };
}

// Populate the blog content
const blogData = getQueryParams();
if (blogData.title && blogData.content) {
    document.querySelector('.title').textContent = decodeURIComponent(blogData.title);
    document.querySelector('.content').textContent = decodeURIComponent(blogData.content);
} else {
    // Fallback if no data is provided
    document.querySelector('.title').textContent = "No Title Provided";
    document.querySelector('.content').textContent = "No Content Available";
}


const commentBox = document.querySelector('.comments-p');

const addCommBtn = document.querySelector('.add-comment');

addCommBtn.onclick = ()=>{
    const input = document.querySelector('input');
    if(input.value){
        const p = document.createElement("p");
        p.textContent = input.value;
        commentBox.appendChild(p); 
        input.value = "";  
    }
}


