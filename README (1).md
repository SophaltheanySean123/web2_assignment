## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and all the CSS (inside the `<style>` tag) |
| `file.js` | Starting posts and all the logic for creating, editing, and deleting posts |

Keep both files in the same folder, then open `index.html` in a browser.

## Features

- **Add Blog Post** asks for a title, then the content, using two `prompt()` pop-ups. If you press Cancel or leave either one empty, nothing is added.
- **Edit Title** opens a prompt with the current title filled in. An empty answer or Cancel keeps the old title.
- **Edit Content** works the same way for the post's text.
- **Delete Post** asks for confirmation, removes the post, and shows a success alert.
- When the last post is deleted, a "No posts yet" message appears. It disappears again once you add a post.

## Page structure

Each post is built by `createPost()` and looks like this in the DOM:

```html
<article id="post-1" class="post">
    <div class="title-row">
        <h2>Post title</h2>
        <button onclick="editTitle('post-1')">Edit Title</button>
    </div>
    <p>Post content</p>
    <div class="post-actions">
        <button onclick="editContent('post-1')">Edit Content</button>
        <button onclick="deletePost('post-1')">Delete Post</button>
    </div>
</article>
```

Every post gets a unique id (`post-1`, `post-2`, ...) from the `id` counter. The buttons pass that id to their function, and the function uses `document.getElementById(id)` to find the right post.

## Functions in `file.js`

| Function | Purpose |
| --- | --- |
| `createPost(title, content, id)` | Builds one post card and adds it to `#blog-posts-container` |
| `addPost()` | Asks for a title and content, then calls `createPost()` and increases `id` |
| `editTitle(id)` | Updates the `<h2>` of the post with that id |
| `editContent(id)` | Updates the `<p>` of the post with that id |
| `deletePost(id)` | Confirms, then removes the whole `<article>` |
| `checkEmpty()` | Shows or hides the "No posts yet" message |

At the bottom of the file, a `forEach` loop creates the starting posts from `postList`, and the Add button is connected with `addEventListener`.

## Layout (CSS)

- `#blog-posts-container` uses CSS Grid with `grid-template-columns: 1fr 1fr` to show two posts per row.
- `.title-row` uses Flexbox so the title and the Edit Title button sit on the same line.
- Below 700px wide, a media query switches the grid to one column.

## Bugs fixed along the way

> **AI assistance:** The bugs below were identified with help from Claude (Anthropic's AI assistant) on October 2, 2026. Claude explained the cause of each error and suggested the fixes, which I then reviewed, applied, and tested in the browser. Claude also suggested the CSS layout used to match the target design and drafted this README.

These are worth remembering because they are easy to repeat:

1. **Function name mismatch.** The function was defined as `createContent` but called as `createPost`, which caused `ReferenceError: createPost is not defined`.
2. **`textContent` is a property, not a function.** Write `el.textContent = "text"`, not `el.textContent("text")`.
3. **Broken `onClick` strings.** `postId` already contains `post-`, so `'post${postId}'` became `postpost-1`. The delete handler was also missing its parentheses and quotes. The correct form is `` `deletePost('${postId}')` ``.
4. **Buttons appended to the wrong parent.** Appending the buttons to the `<p>` mixed their text into the content and removed them when the `<p>` was replaced.
5. **Undefined ids.** The objects in `postList` have no `id` property, so `post.id` was `undefined` and every post got the same id. Use the counter instead.
6. **Event object vs. element.** A function passed to `addEventListener` receives an **Event**, not the element. Use `event.target` to get the element that was clicked, then `.parentElement` to move up to its container.

