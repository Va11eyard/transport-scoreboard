package org.example.java.service.impl;

import org.example.java.dto.request.UserCreateDto;
import org.example.java.dto.request.UserUpdateDto;
import org.example.java.repository.UserRepository;
import org.example.java.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Page<UserDetails> allUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::mapToUserDetails);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return mapToUserDetails(user);
    }

    @Override
    public UserDetails getUserById(int id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToUserDetails(user);
    }

    @Override
    @Transactional
    public UserDetails createUser(UserCreateDto createDto) {
        UserEntity user = new UserEntity();
        user.setEmail(createDto.getEmail());
        user.setPassword(passwordEncoder.encode(createDto.getPassword()));
        userRepository.save(user);
        return mapToUserDetails(user);
    }

    @Override
    public UserDetails updateUser(int id, UserUpdateDto updateDto) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        userRepository.save(user);
        return mapToUserDetails(user);
    }

    @Override
    public void deleteUser(int id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
    }

    private UserDetails mapToUserDetails(UserEntity user) {
        return User.withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("user") // Spring Security expects "ROLE_user" internally
                .build();
    }
}