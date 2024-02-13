package com.example.blog_app.Services;

import com.example.blog_app.Models.Post;
import com.example.blog_app.Repositorys.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PostService {
    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    private static final String RECENT_POSTS_KEY = "recent_posts";
    private static final int MAX_RECENT_POSTS = 3; // Limiting the number of recent posts to 10

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getCachedRecentPosts() {
        logger.info("Retrieve the most recent posts from the redis cache");
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        Map<String, String> recentPostsMap = hashOperations.entries(RECENT_POSTS_KEY);

        // Retrieve the most recent posts from the cache
        List<String> recentPostIds = recentPostsMap.keySet().stream()
                .sorted((key1, key2) -> -1 * key1.compareTo(key2)) // Sort keys in descending order
                .limit(MAX_RECENT_POSTS) // Limit to the maximum recent posts
                .collect(Collectors.toList());

        // Fetch the posts corresponding to the recent post IDs
        List<Post> recentPosts = recentPostIds.stream()
                .map(postIdStr -> postRepository.findById(Long.parseLong(postIdStr)).orElse(null))
                .filter(post -> post != null)
                .collect(Collectors.toList());

        return recentPosts;
    }
    public void updateRecentPostsCache(List<Post> posts) {
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();

        // Get the existing recent posts from the cache
        Map<String, String> recentPostsMap = hashOperations.entries(RECENT_POSTS_KEY);

        // Remove oldest posts if the maximum limit is reached
        int totalPostsCount = recentPostsMap.size() + posts.size();
        if (totalPostsCount > MAX_RECENT_POSTS) {
            int excess = totalPostsCount - MAX_RECENT_POSTS;
            List<String> keysToRemove = recentPostsMap.keySet().stream()
                    .filter(key -> key != null && !key.isEmpty()) // Filter out null or empty keys
                    .limit(excess)
                    .collect(Collectors.toList());

            // Logging the keys to be removed
            logger.info("Keys to be removed: {}", keysToRemove);

            keysToRemove.forEach(key -> {
                if (key != null && recentPostsMap.containsKey(key)) { // Check if key exists before deletion
                    hashOperations.delete(RECENT_POSTS_KEY, key);
                    logger.info("Deleted key: {}", key);
                }
            });
        }



        recentPostsMap.clear();
        // Update Redis cache with the recent posts map
        for (Post post : posts) {
            // Only store non-empty fields in Redis
            if (post.getId() != null && post.getTitle() != null) {
                recentPostsMap.put(String.valueOf(post.getId()), post.getTitle());
            }
        }
        hashOperations.putAll(RECENT_POSTS_KEY, recentPostsMap);
        logger.info("Updated recent posts cache: {}", recentPostsMap);
    }


}
