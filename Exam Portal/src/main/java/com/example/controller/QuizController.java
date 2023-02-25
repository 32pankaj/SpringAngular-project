package com.example.controller;

import antlr.collections.impl.LList;
import com.example.model.exam.Category;
import com.example.model.exam.Quiz;
import com.example.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizService quizService;

    // Add Quiz
    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    //    update Quiz
    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {


        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    //        get all Quiz
    @GetMapping("/")
    public ResponseEntity<?> getQuizzes() {
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    //    get quiz by id
    @GetMapping("/{qId}")
    public Quiz getQuiz(@PathVariable Long qId) {
        return this.quizService.getQuiz(qId);
    }

    //    delet the quiz
    @DeleteMapping("/{qId}")
    public void deleteQuiz(@PathVariable Long qId) {
        this.quizService.deleteQuid(qId);
    }

    //    Get quizzes by category id
    @GetMapping("/category/{cId}")
    public ResponseEntity<?> getQuizzesOfCategory(@PathVariable("cId") Long cId ){
        Category category=new Category();
        category.setcId(cId);
       return ResponseEntity.ok(this.quizService.getQuizzesByCategoryId(category));
    }
    //Get active quizes
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }
    @GetMapping("/category/active/{cId}")
    public List<Quiz> getActiveQuizzesOfCate(@PathVariable("cId") Long cId){
        Category category=new Category();
        category.setcId(cId);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }
}
