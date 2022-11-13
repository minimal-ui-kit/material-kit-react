package com.demo.demo.interfaces;

import java.util.List;

import beans.Product;

public interface ProductInterface {

    final int limit = 10;
    
    public Product getProductbyId(int prodId);

    public List<Product> getProducts(int limit, int start);

    public List<Product> getProductsByFilter(String[] filters);
    
}
