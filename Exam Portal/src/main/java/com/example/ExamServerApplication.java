package com.example;

import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserService userService;

    public static void main(String[] args) {

        SpringApplication.run(ExamServerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting code");
//        try {
//
//
//            User user=new User();
//            user.setFirstName("rahul");
//            user.setLastName("Pak1");
//            user.setEmail("rahul@gmail.com");
//            user.setPassword(this.bCryptPasswordEncoder.encode("pankaj"));
//            user.setProfile("hi");
//            user.setUserName("32pankaj");
//
//            Role role1=new Role();
//            role1.setRoleId(44L);
//            role1.setRoleName("ADMIN");
//            UserRole userRole=new UserRole();
//            userRole.setRole(role1);
//            userRole.setUser(user);
//
//            Set<UserRole> userRoleSet=new HashSet<>();
//
//            userRoleSet.add(userRole);
//            user.setUserRoles(userRoleSet);
//
//            User user1=this.userService.createUser(user,userRoleSet);
//            System.out.println(user1.getUserName());
//        }catch (Exception e)
//        {
//            e.printStackTrace();
//        }
    }
}
