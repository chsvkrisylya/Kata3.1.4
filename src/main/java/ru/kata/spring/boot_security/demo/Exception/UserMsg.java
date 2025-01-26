package ru.kata.spring.boot_security.demo.Exception;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class UserMsg {

    private String info;

    public UserMsg() {
    }

    public UserMsg(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }
}
