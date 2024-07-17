package com.backend.project.student;

import jakarta.persistence.*;

@Entity
@Table
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )

    private Long id;
    private String Studentid;
    private String name;
    private String email;
    private String password;

    public Student() {
    }

    public Student(String Studentid, String name, String password, String email) {
        this.Studentid = Studentid;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    public Student(Long id, String name, String email, String password, String Studentid) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.Studentid = Studentid;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStudentid() {
        return Studentid;
    }

    public void setStudentid(String studentid) {
        Studentid = studentid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "email='" + email + '\'' +
                ", id=" + id +
                ", Studentid='" + Studentid + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
