// =========================
// BLOGGER CLONE JAVASCRIPT
// =========================

// Get saved posts
let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

// =========================
// CREATE POST
// =========================

const postForm = document.getElementById("postForm");

if (postForm) {

    postForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value;

        const newPost = {
            id: Date.now(),
            title: title,
            author: author,
            category: category,
            content: content,
            date: new Date().toLocaleDateString()
        };

        posts.push(newPost);

        localStorage.setItem("blogPosts", JSON.stringify(posts));

        alert("Your blog post has been published!");

        window.location.href = "index.html";
    });
}


// =========================
// SHOW SAVED POSTS
// =========================

const postsContainer = document.querySelector(".posts");

if (postsContainer && posts.length > 0) {

    posts.forEach(function(post) {

        const article = document.createElement("article");

        article.className = "post";

        article.innerHTML = `
            <h3>
                <a href="post.html?id=${post.id}">
                    ${post.title}
                </a>
            </h3>

            <p class="author">
                By ${post.author} | ${post.date}
            </p>

            <p>
                ${post.content.substring(0, 120)}...
            </p>

            <span class="category">
                ${post.category}
            </span>

            <br><br>

            <button onclick="deletePost(${post.id})">
                Delete
            </button>
        `;

        postsContainer.appendChild(article);
    });
}


// =========================
// DELETE POST
// =========================

function deletePost(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
        return;
    }

    posts = posts.filter(function(post) {
        return post.id !== id;
    });

    localStorage.setItem("blogPosts", JSON.stringify(posts));

    location.reload();
}


// =========================
// SEARCH POSTS
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText = searchInput.value.toLowerCase();

        const allPosts = document.querySelectorAll(".post");

        allPosts.forEach(function(post) {

            const text = post.innerText.toLowerCase();

            if (text.includes(searchText)) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }

        });

    });
}


// =========================
// COMMENTS
// =========================

const commentForm = document.getElementById("commentForm");

if (commentForm) {

    commentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("commentName").value;
        const commentText = document.getElementById("commentText").value;

        const comment = document.createElement("div");

        comment.className = "comment";

        comment.innerHTML = `
            <strong>${name}</strong>
            <p>${commentText}</p>
        `;

        document
            .getElementById("commentsList")
            .appendChild(comment);

        commentForm.reset();
    });
}
