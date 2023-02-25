package com.example.repo;

import com.example.model.exam.Category;
import com.example.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepositotry extends JpaRepository<Quiz, Long> {
    public List<Quiz> findBycategory(Category category);
    public List<Quiz> findByActive(Boolean b);
    public List<Quiz> findBycategoryAndActive(Category category,Boolean b);
}
