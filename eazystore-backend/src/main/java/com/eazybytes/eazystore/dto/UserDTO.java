package com.eazybytes.eazystore.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String mobileNumber;
}
