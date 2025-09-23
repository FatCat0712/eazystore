package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ErrorResponseDTO;
import com.eazybytes.eazystore.dto.ProductDTO;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final IProductService iProductService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>>getProducts() throws InterruptedException {
        List<ProductDTO> productList =  iProductService.getProducts();
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

}
