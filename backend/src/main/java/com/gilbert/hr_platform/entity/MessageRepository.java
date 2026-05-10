package com.gilbert.hr_platform.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByPhone(String phone);
}