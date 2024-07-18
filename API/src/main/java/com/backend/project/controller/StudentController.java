package com.backend.project.controller;



import com.backend.project.service.StudentService;
import com.backend.project.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;


    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public List<Student> getStudents(){
        return studentService.getStudents();
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public Optional<Student> getStudentByEmail(@RequestParam(value = "email") String email) {
        return studentService.getStudentByEmail(email);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public void registerNewStudent(@RequestBody Student student){
        studentService.addNewStudent(student);
    }

//    @CrossOrigin(origins = "*")
//    @PostMapping("/add/course")
//    public void registerNewCourse(@RequestBody Student student){
//        studentService.addNewCourse();
//    }

    @DeleteMapping(path = "{Studentid}")
    public void deleteStudent(
            @PathVariable("Studentid") String Studentid){
        studentService.deleteStudent(Studentid);
    }

    @PutMapping(path = "{studentid}")
    public void updateStudent(
            @PathVariable("studentid") Long studentid,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email){
        studentService.updateStudent(studentid, name, email);
    }
}