let postList = [
    {
        title: "Welcome to My Blog",
        content: "This is my first blog post. I'm excited to share my thoughts and experiences with you all!"
    },
    {
        title: "Learning JavaScript",
        content: "JavaScript is a powerful programming language that enables interactive web development. Today I learned about event listeners and DOM manipulation."
    },
    {
        title: "Web Development Tips",
        content: "Always write clean and maintainable code. Use meaningful variable names and comment your code when necessary."
    }
]

const checkEmpty = () => {
    const blogList = document.getElementById("blog-posts-container")
    const emptyMsg = document.getElementById("empty-msg")

    if (blogList.querySelectorAll(".post").length === 0) {
        if (!emptyMsg) {
            const msg = document.createElement("p")
            msg.setAttribute("id", "empty-msg")
            msg.className = "empty"
            msg.textContent = "No posts yet. Click \"Add Blog Post\" to write one."
            blogList.appendChild(msg)
        }
    } else if (emptyMsg) {
        emptyMsg.remove()
    }
}

const createPost = (title, content, id) => {
    const blogList = document.getElementById("blog-posts-container")
    const post = document.createElement("article")
    const postId = `post-${id}`
    post.setAttribute("id", postId)
    post.className = "post"

    // row 1: title + Edit Title button
    const titleRow = document.createElement("div")
    titleRow.className = "title-row"

    const postTitle = document.createElement("h2")
    postTitle.textContent = title

    const editTitleBtn = document.createElement("button")
    editTitleBtn.textContent = "Edit Title"
    editTitleBtn.setAttribute("onClick", `editTitle('${postId}')`)

    titleRow.appendChild(postTitle)
    titleRow.appendChild(editTitleBtn)

    // row 2: content
    const postContent = document.createElement("p")
    postContent.textContent = content

    // row 3: Edit Content + Delete Post buttons
    const actions = document.createElement("div")
    actions.className = "post-actions"

    const editContentBtn = document.createElement("button")
    editContentBtn.textContent = "Edit Content"
    editContentBtn.setAttribute("onClick", `editContent('${postId}')`)

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete Post"
    deleteBtn.setAttribute("onClick", `deletePost('${postId}')`)

    actions.appendChild(editContentBtn)
    actions.appendChild(deleteBtn)

    post.appendChild(titleRow)
    post.appendChild(postContent)
    post.appendChild(actions)
    blogList.appendChild(post)

    checkEmpty()
}

const addPost = () => {
    const title = prompt("Enter the post title:")
    // stop if the user pressed Cancel or left it empty
    if (title === null || title.trim() === "") {
        return
    }

    const content = prompt("Enter the post content:")
    if (content === null || content.trim() === "") {
        return
    }

    createPost(title.trim(), content.trim(), id)
    id++
}

const editTitle = (id) => {
    const postTitle = document.getElementById(id).querySelector("h2")
    const newTitle = prompt("Update the title:", postTitle.textContent)

    // keep the old title if the user pressed Cancel or left it empty
    if (newTitle === null || newTitle.trim() === "") {
        return
    }
    postTitle.textContent = newTitle.trim()
}

const editContent = (id) => {
    const postContent = document.getElementById(id).querySelector("p")
    const newContent = prompt("Update the content:", postContent.textContent)

    if (newContent === null || newContent.trim() === "") {
        return
    }
    postContent.textContent = newContent.trim()
}

const deletePost = (id) => {
    const postToDelete = document.getElementById(id)
    const title = postToDelete.querySelector("h2").textContent
    const toDelete = confirm(`Are you sure you want to delete "${title}"?`)

    if (toDelete) {
        postToDelete.remove()
        alert(`Post "${title}" deleted successfully`)
        checkEmpty()
    }
}

// load the starting posts
let id = 1
postList.forEach((post) => {
    createPost(post.title, post.content, id)
    id++
})

document.getElementById("add-post-btn").addEventListener("click", addPost)
