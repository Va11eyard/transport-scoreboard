package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.UserCreateDto;
import org.example.java.dto.request.UserUpdateDto;
import org.example.java.model.User;
import org.example.java.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/")
    private ResponseEntity<Page<User>> readUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.allUsers(pageable));
    }

    @PostMapping("/")
    public ResponseEntity<User> createUser(
            @RequestBody UserCreateDto userDto) {
        return ResponseEntity.ok(userService.createUser(userDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> readUser(
            @PathVariable int userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(
            @PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(
            @PathVariable int userId,
            @RequestBody UserUpdateDto userDto
    ) {
        return ResponseEntity.ok(userService.updateUser(userId, userDto));
    }
}
