package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ContactRequestDTO;
import com.eazybytes.eazystore.dto.ProductDTO;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
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
    public String saveContact(@RequestBody ContactRequestDTO contactRequestDTO) {
            boolean isSaved = iContactService.saveContact(contactRequestDTO);
            if(isSaved) {
                return "Request processed successfully";
            }
            else {
                return "An error occurred. Please try again or contact Dev team";
            }
    }
}
