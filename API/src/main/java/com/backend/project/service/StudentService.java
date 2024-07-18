package com.backend.project.service;



import com.backend.project.course.CourseRepository;
import com.backend.project.repository.StudentRepository;
import com.backend.project.student.Course;
import com.backend.project.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;


    @Autowired
    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public List<Student> getStudents(){
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(student -> new Student(student.getId(), student.getName(), student.getEmail(), student.getPassword(),  student.getStudentid()))
                .toList();

    }
//public List<Student> getStudents(String email){
//    List<Student> students = studentRepository.findAll();
//    return students.stream()
//            .filter(student -> student.getEmail().equals(email))
//            .map(student -> new Student(student.getId(), student.getName(), student.getEmail(), student.getPassword(), student.getStudentid()))
//            .toList();
//}
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email)
                .map(student -> new Student(student.getId(), student.getName(), student.getEmail(), student.getPassword(), student.getStudentid()));
    }
    public Optional<Course> getCourseByEmail(String email) {
        return courseRepository.findByEmail(email)
                .map(course -> new Course(course.getId(), course.getEmail(), course.getCourseName(), course.getCourseCode(), course.getCourseDescription()));
    }


    public void addNewStudent(Student student) {
        Optional<Student> studentOptional = studentRepository
                .findStudentByEmail(student.getEmail());
        if (studentOptional.isPresent()){
            throw new IllegalStateException("Email taken");
        }
//        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);

    }

    public void addNewCourse(Course course) {
        Optional<Course> studentOptional = courseRepository
                .findCourseByEmail(course.getEmail());
        if (studentOptional.isPresent()){
            courseRepository.save(course);
        }
        courseRepository.save(course);
    }

//    public void addNewCourse(Student student) {
//        Optional<Student> studentOptional = studentRepository
//                .findStudentByEmail(student.getEmail());
//        if (studentOptional.isPresent()){
//            throw new IllegalStateException("Email taken");
//        }
////        student.setPassword(passwordEncoder.encode(student.getPassword()));
//        studentRepository.save(student);
//    }


    public void deleteStudent(String Studentid) {
//        boolean exists = studentRepository.existsById(studentId);
//        if (!exists){
//            throw new IllegalStateException("Student with ID " + studentId + " does not exists");
//        }
//        studentRepository.deleteById(studentId);
        List<Student> students = studentRepository.findAll();
        Student toDelete = null;
        for (Student student : students) {
            if (student.getStudentid().equals(Studentid)) {
                toDelete = student;
                break;
            }
        }

        if (toDelete == null) {
            throw new IllegalStateException("Student with ID " + Studentid + " does not exist");
        }

        studentRepository.delete(toDelete);
    }

    @Transactional
    public void updateStudent(Long studentid, String name, String email) {
        Student student =  studentRepository.findById(studentid).orElseThrow(()-> new IllegalStateException(
                "Student with ID " + studentid + " does not exists.")
        );
        if (name != null && !name.isEmpty() &&
                !Objects.equals(student.getName(), name)){
            student.setName(name);
        }
        if (email != null && !email.isEmpty() &&
                !Objects.equals(student.getEmail(), email)){
            Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
            if (studentOptional.isPresent()){
                throw new IllegalStateException("Email taken");
            }
            student.setEmail(email);
        }
    }




//    public Student getAllStudents(String email) {
//        Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//            return new Student(student.getId(), student.getName(), student.getEmail(), student.getPassword(),  student.getStudentid()); // Map to StudentDTO
//        } else {
//            return null; // Or throw an exception if not found
//        }
//    }
//    public Student getStudentByEmail(String email) {
//        Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//            return new Student(student.getId(), student.getName(), student.getEmail(), student.getPassword(),  student.getStudentid()); // Map to StudentDTO
//        } else {
//            return null; // Or throw an exception if not found
//        }
//    }



//        public void updateStudent(String Studentid, String name, String email) {
//
//        // Flag to indicate if student is found
//        boolean studentFound = false;
//
//        // Loop through all students (consider performance implications)
//        for (Student student : studentRepository.findAll()) {
//            if (student.getStudentid().equals(Studentid)) {
//                studentFound = true;
//                // Update logic for the found student
//                if (name != null && !name.isEmpty() && !Objects.equals(student.getName(), name)) {
//                    student.setName(name);
//                }
//                if (email != null && !email.isEmpty() &&
//                        !Objects.equals(student.getEmail(), email)) {
//                    Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
//                    if (studentOptional.isPresent()) {
//                        throw new IllegalStateException("Email taken");
//                    }
//                    student.setEmail(email);
//                    // ... rest of update logic (similar to previous versions)
//                    break;  // Exit loop after finding the matching student
//                }
//            }
//
//            // Handle non-existent student
//            if (!studentFound) {
//                throw new IllegalStateException("Student with ID " + Studentid + " does not exist.");
//            }
//
//            // Save the updated student (if any)
//        studentRepository.save(student);  // Assuming student was updated
//        }
//
//    }

}


