package org.example.java.controller;

import lombok.AllArgsConstructor;
import org.example.java.dto.request.UserCreateDto;
import org.example.java.dto.request.UserLoginDto;
import org.example.java.dto.response.JwtResponse;
import org.example.java.service.UserService;
import org.example.java.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    private ResponseEntity<?> login(
            @RequestBody UserLoginDto loginDto
    ){
      LOGGER.debug("EMAIL IS: "+ loginDto.getEmail() + " PASSWORD IS: " + loginDto.getPassword());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during authentication: " + e.getMessage());
        }

        UserDetails userDetails = userService.loadUserByUsername(loginDto.getEmail());
        String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok().body(new JwtResponse(jwt));
    }

    @PostMapping("/register")
    private ResponseEntity<String> register(
            @RequestBody UserCreateDto createDto
    ){
        try{
            userService.createUser(createDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("User registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid input: " + e.getMessage());
        }
    }
}
