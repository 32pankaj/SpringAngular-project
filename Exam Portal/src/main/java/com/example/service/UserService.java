package com.example.service;

import com.example.model.User;
import com.example.model.UserRole;

import java.util.Set;


public interface UserService {
    User createUser(User user, Set<UserRole> userRoles) throws Exception;

    User getUser(String userName);

    void deleteUser(Long userId);

    User updateUser(Long userId, User user, Set<UserRole> roles) throws Exception;
}
