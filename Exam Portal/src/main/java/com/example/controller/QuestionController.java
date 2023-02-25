package com.example.controller;

import com.example.model.exam.Question;
import com.example.model.exam.Quiz;
import com.example.service.QuestionService;
import com.example.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {

        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // update question
    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get AllQuestion

    @GetMapping("/")
    public ResponseEntity<?> getQuestions() {
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    //    get question by id
    @GetMapping("/{quesId}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long quesId) {
        return ResponseEntity.ok(this.questionService.getQuestion(quesId));
    }

    // get aquestion of quiz
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable Long qId) {
        Quiz quiz = this.quizService.getQuiz(qId);
        Set<Question> questions = quiz.getQuestions();
        List list = new ArrayList(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestion())) {
            Collections.shuffle(list);
            System.out.println(list.size()+" -- trst-- "+Integer.parseInt(quiz.getNumberOfQuestion()));
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion()) + 1);
        }
        return ResponseEntity.ok(list);

    }
//    all question for admin
@GetMapping("/quiz/all/{qId}")
public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable Long qId) {
//    Quiz quiz = this.quizService.getQuiz(qId);
//    Set<Question> questions = quiz.getQuestions();
//    List list = new ArrayList(questions);
//
    Quiz quiz=new Quiz();
    quiz.setqId(qId);
    Set<Question> questions=this.questionService.getQuestionOfQuiz(quiz);
    return ResponseEntity.ok(questions);

}

    //delete question
    @DeleteMapping("/{questId}")
    public void deleteQues(@PathVariable Long questId) {
        this.questionService.delQuestion(questId);
    }


}
