package com.example.service;

import com.example.model.exam.Question;
import com.example.model.exam.Quiz;

import java.util.Set;

public interface QuestionService {
    Question addQuestion(Question question);

    Question updateQuestion(Question question);

    Set<Question> getQuestions();

    Question getQuestion(Long quesId);

    Set<Question> getQuestionOfQuiz(Quiz quiz);

    void delQuestion(Long quesId);
}
