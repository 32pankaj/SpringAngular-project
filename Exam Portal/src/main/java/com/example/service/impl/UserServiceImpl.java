package com.example.service.impl;

import com.example.model.User;
import com.example.model.UserRole;
import com.example.repo.RoleRepository;
import com.example.repo.UserRepository;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local = this.userRepository.findByUserName(user.getUserName());

        if (local != null) {

            System.out.println("User already Exist");
            throw new Exception("User already Exist");
        } else {
            //creat user
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);

        }
        return local;
    }

    @Override
    public User getUser(String userName) {
        return this.userRepository.findByUserName(userName);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);

    }

    @Override
    public User updateUser(Long userId, User user, Set<UserRole> userRoles) throws Exception {
        User exist = this.userRepository.findUserById(userId);

        if (exist != null) {
            user.setId(exist.getId());

            //creat user
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            exist = this.userRepository.save(user);

//            System.out.println("User already Exist");
//            throw  new Exception("User already Exist");
        } else {
            System.out.println("User Not exist");
            throw new Exception("User not exist");

        }
        return exist;
    }

}
