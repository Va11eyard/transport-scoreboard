package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.UserUpdateDto;
import org.example.java.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDetails>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(userService.allUsers(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetails> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDetails> updateUser(@PathVariable int id, @RequestBody UserUpdateDto updateDto) {
        return ResponseEntity.ok(userService.updateUser(id, updateDto));
    }
}