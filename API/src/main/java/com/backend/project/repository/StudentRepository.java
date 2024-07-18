package com.backend.project.repository;


import com.backend.project.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    //    @Query("SELECT s From s WHERE s.email = ?1")
    Optional<Student> findStudentByEmail(String email);



    Optional<Student> findByEmail(String email);


}
