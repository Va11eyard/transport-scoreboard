package org.example.java.service.impl;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.UserCreateDto;
import org.example.java.dto.request.UserUpdateDto;
import org.example.java.model.User;
import org.example.java.repository.UserRepository;
import org.example.java.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<User> allUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getUserById(int userId) {
        return userRepository.findById(userId).orElseThrow(()-> new RuntimeException("User not found."));
    }

    @Override
    public User createUser(UserCreateDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setActive(true);
        user.setRole(userDto.getRole());

        return userRepository.save(user);
    }

    @Override
    public User updateUser(int userId, UserUpdateDto userDto) {
        User user = userRepository.findById(userId).orElse(null);
        if(user!=null) {
            if (userDto.getEmail() != null) user.setEmail(userDto.getEmail());
            if (userDto.getPassword() != null) user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            if (userDto.getRole() != null) user.setRole(userDto.getRole());
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(int userId) {
        userRepository.findById(userId).ifPresent(userRepository::delete);
    }

}
