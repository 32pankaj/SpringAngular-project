package com.example.service;

import com.example.model.exam.Category;
import com.example.model.exam.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {
    Quiz addQuiz(Quiz quiz);

    Quiz updateQuiz(Quiz quiz);

    Set<Quiz> getQuizzes();

    Quiz getQuiz(Long qId);

    void deleteQuid(Long qId);


    List<Quiz> getQuizzesByCategoryId(Category category);
    public  List<Quiz> getActiveQuizzes();
    public List<Quiz> getActiveQuizzesOfCategory( Category category);
}
