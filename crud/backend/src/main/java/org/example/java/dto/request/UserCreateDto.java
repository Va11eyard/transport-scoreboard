package org.example.java.dto.request;

import lombok.Data;

@Data
public class UserCreateDto {
    private String email;
    private String password;
}