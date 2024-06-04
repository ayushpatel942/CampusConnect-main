package com.campusconnect.controller;


import com.campusconnect.dto.StudentDto;
import com.campusconnect.entities.Student;
import com.campusconnect.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @CrossOrigin(origins = "http://localhost:5173/registration")
    @PostMapping("/create")
    public ResponseEntity<?> createStudent(@RequestBody StudentDto studentDto)
    {
        StudentDto studentDto1 = this.studentService.createStudent(studentDto);
        return new ResponseEntity<>(studentDto1, HttpStatus.CREATED);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<?> updateStudent(@RequestBody StudentDto studentDto , @PathVariable Long studentId){
        StudentDto updatedStudent = this.studentService.updateStudent(studentDto,studentId);
        return  new ResponseEntity<>(updatedStudent,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<?> deleteStudent(@PathVariable long studentId){
        this.studentService.deleteStudent(studentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{studentId}")
    public  ResponseEntity<?> getSingleStudent(@PathVariable Long studentId){
       return ResponseEntity.ok(this.studentService.getStudentById(studentId));
    }

    @GetMapping("/{email}/{password}")
    public ResponseEntity<?> loginStudent(@PathVariable("email") String email,@PathVariable("password") String password)
    {
        StudentDto studentDto = studentService.loginStudent(email,password);

        return new ResponseEntity<Long>(studentDto.getStudentId(),HttpStatus.ACCEPTED);
    }

    @GetMapping("/getstudentid/{username}/{password}")
    public ResponseEntity<?> getStudentIdByUsername(@PathVariable("username") String username,@PathVariable("password") String password)
    {
        StudentDto studentDto = studentService.getStudentIdByEmailAndPassword(username,password);
        System.out.println(studentDto.getStudentId());

        return new ResponseEntity<StudentDto>(studentDto,HttpStatus.OK);
    }

    @PutMapping("/participantEvent/{studentId}/{eventId}")
    public ResponseEntity<StudentDto> participentEvent(@PathVariable("studentId") Long studentId,@PathVariable("eventId") Long eventId)
    {
        System.out.println(studentId);
        StudentDto studentDto = studentService.participantEvent(studentId,eventId);
        return new ResponseEntity<StudentDto>(studentDto,HttpStatus.OK);
    }
}
