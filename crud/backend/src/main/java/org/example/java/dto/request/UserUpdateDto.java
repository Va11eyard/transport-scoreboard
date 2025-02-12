package org.example.java.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateDto {
    private String email;
    private String password;
    private String role;
}
