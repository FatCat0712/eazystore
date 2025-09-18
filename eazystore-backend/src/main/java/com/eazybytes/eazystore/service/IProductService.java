package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ProductDTO;
import com.eazybytes.eazystore.entity.Product;

import java.util.List;

public interface IProductService {
    List<ProductDTO> getProducts();
}
