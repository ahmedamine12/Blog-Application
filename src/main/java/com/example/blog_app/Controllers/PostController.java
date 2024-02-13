package com.example.blog_app.Controllers;

import com.example.blog_app.Models.Post;
import com.example.blog_app.Models.User;
import com.example.blog_app.Services.PostService;
import com.example.blog_app.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService ;

    @GetMapping("/")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }


    @PostMapping("/{userId}")

    public ResponseEntity<Post> createPost(@RequestBody Post post, @PathVariable String userId) {
        // Fetch the user from the database using the provided userId
        User author = userService.getUserById(Long.valueOf(userId));
        if (author == null) {

            return ResponseEntity.notFound().build(); // Return 404 if user is not found
        }

        // Set the fetched user as the author of the post
        post.setAuthor(author);

        // Save the post
        Post createdPost = postService.createPost(post);

        // Update the Redis cache with the newly created post
        postService.updateRecentPostsCache(Collections.singletonList(createdPost));

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping("/recent")

    public ResponseEntity<List<Post>> getCachedRecentPosts() {
        List<Post> recentPosts = postService.getCachedRecentPosts();
        return ResponseEntity.ok(recentPosts);
    }
}
