package com.gilbert.hr_platform.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue
    private Long id;

    private String phone;
    private String content;
    private String direction;

    private LocalDateTime timestamp;
}