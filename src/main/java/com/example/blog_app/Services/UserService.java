package com.example.blog_app.Services;

import com.example.blog_app.Models.User;
import com.example.blog_app.Repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
