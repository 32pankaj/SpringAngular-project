package com.example.controller;

import com.example.model.exam.Category;
import com.example.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        Category local = this.categoryService.addCategory(category);
        return ResponseEntity.ok(local);
    }

    // get category

    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable Long categoryId) {
        return this.categoryService.getCategory(categoryId);
    }

    // get All category
    @GetMapping("/")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(this.categoryService.getCategories());

    }

    //update categry
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category) {

        return this.categoryService.updateCategory(category);

    }

    // delete Category
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId) {
        this.categoryService.deleteCategory(categoryId);
    }


}
