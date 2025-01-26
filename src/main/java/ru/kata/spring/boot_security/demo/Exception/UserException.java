package ru.kata.spring.boot_security.demo.Exception;

import org.springframework.dao.DataIntegrityViolationException;

public class UserException extends DataIntegrityViolationException {
    public UserException(String msg) {
        super(msg);
    }
}
