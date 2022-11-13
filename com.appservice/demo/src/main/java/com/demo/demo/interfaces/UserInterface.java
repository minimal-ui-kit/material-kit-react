package com.demo.demo.interfaces;

import java.util.List;

import beans.User;

public interface UserInterface {

    public User getUser(int userid);

    public List<User> getUsersList(int limit, int start);

    public List<User> getUserBySearch(String searchString);
    
}
