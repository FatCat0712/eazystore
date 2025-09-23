package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ContactRequestDTO;
import com.eazybytes.eazystore.dto.ProductDTO;
import com.eazybytes.eazystore.service.IContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final IContactService iContactService;

    @PostMapping
    public ResponseEntity<String> saveContact(@Valid @RequestBody ContactRequestDTO contactRequestDTO) {
            iContactService.saveContact(contactRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Request processed successfully");
    }
}
