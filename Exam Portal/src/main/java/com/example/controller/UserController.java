package com.example.controller;

import com.example.model.Role;
import com.example.model.User;
import com.example.model.UserRole;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController

@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserService userService;

    //creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
//       encoding password with bcryptEncoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        roles.add(userRole);
        User user1 = this.userService.createUser(user, roles);
        System.out.println(user1.toString());
        return user1;
    }

    @GetMapping("/{userName}")
    public User getUser(@PathVariable("userName") String userName) {
        return this.userService.getUser(userName);
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable("userId") Long userId) {
        this.userService.deleteUser(userId);
        return "Deleted";
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable("userId") Long userId, @RequestBody User user) throws Exception {
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(44L);
        role.setRoleName("ADMIN");
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        roles.add(userRole);
        System.out.println("------=======" + user.getFirstName());
        User user1 = this.userService.updateUser(userId, user, roles);


//        Set<UserRole> roles = new HashSet<>();
//        Role role = new Role();
//        role.setRoleId(45L);
//        role.setRoleName("NORMAL");
//        UserRole userRole = new UserRole();
//        userRole.setUser(user);
//        userRole.setRole(role);
//        roles.add(userRole);
//        User user1 = this.userService.createUser(user, roles);
//        System.out.println(user1.toString());
//        return user1;
        return user1;
    }
}
