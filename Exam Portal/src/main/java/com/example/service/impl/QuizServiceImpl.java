package com.example.service.impl;

import com.example.model.exam.Category;
import com.example.model.exam.Quiz;
import com.example.repo.QuizRepositotry;
import com.example.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {


    @Autowired
    private QuizRepositotry quizRepositotry;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepositotry.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepositotry.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepositotry.findAll());
    }

    @Override
    public Quiz getQuiz(Long qId) {
        return this.quizRepositotry.findById(qId).get();
    }

    @Override
    public void deleteQuid(Long qId) {

        this.quizRepositotry.deleteById(qId);
    }

    @Override
    public List<Quiz> getQuizzesByCategoryId(Category category) {
        return this.quizRepositotry.findBycategory(category);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return  this.quizRepositotry.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory( Category category) {
        return this.quizRepositotry.findBycategoryAndActive(category,true);
    }


}
