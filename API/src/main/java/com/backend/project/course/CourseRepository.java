package com.backend.project.course;

import com.backend.project.student.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    List<Course> findCoursesByEmail(String email);

    Optional<Course> findByEmail(String email);
}
