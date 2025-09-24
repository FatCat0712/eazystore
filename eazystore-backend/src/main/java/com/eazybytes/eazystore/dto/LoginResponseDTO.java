package com.eazybytes.eazystore.dto;

public record LoginResponseDTO(String message, UserDTO user, String jwtToken) {

}
