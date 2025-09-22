package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ContactRequestDTO;
import com.eazybytes.eazystore.entity.Contact;
import com.eazybytes.eazystore.repository.ContactRepository;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {
    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactRequestDTO contactRequestDTO) {
        try{
            Contact contact = transformEntity(contactRequestDTO);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(contactRequestDTO.getName());
            contactRepository.save(contact);
            return true;
        }catch (Exception exception) {
            return false;
        }
    }

    private Contact transformEntity(ContactRequestDTO contactRequestDTO) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactRequestDTO, contact);
        return contact;
    }
}
