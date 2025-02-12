package org.example.java.service;

import org.example.java.dto.request.UserCreateDto;
import org.example.java.dto.request.UserUpdateDto;
import org.example.java.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Page<User> allUsers(Pageable pageable);
    User getUserById(int userId);
    User createUser(UserCreateDto userDto);
    User updateUser(int userId, UserUpdateDto userDto);
    void deleteUser(int userId);
}
