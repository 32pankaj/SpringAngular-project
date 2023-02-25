package com.example.repo;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

    User findUserById(Long id);
//
//
//  public User updateUser(Long userId);
}
