package com.demo.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import beans.Product;

@RestController
public class URLCheckController {

    @GetMapping("/getProducts")
    public List<Product> getProducts(){
        List<Product> productList = new ArrayList<Product>();

        return productList;

    }
    @GetMapping("/getProduct")
    public Product getProduct(@RequestParam int productId){

        Product product = new Product();

        return product;

    }
    @GetMapping("/check")
    public String checkAPI(@RequestParam String testName){

        
            return "Hi, Welcome "+ testName;
       

        

    }
    
}
