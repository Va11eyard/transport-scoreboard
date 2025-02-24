package org.example.java.service;

import org.example.java.dto.request.UserCreateDto;
import org.example.java.dto.request.UserUpdateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Page<UserDetails> allUsers(Pageable pageable);
    UserDetails getUserById(int id);
    UserDetails createUser(UserCreateDto createDto); // Return UserDetails for confirmation
    UserDetails updateUser(int id, UserUpdateDto updateDto);
    void deleteUser(int id);
}