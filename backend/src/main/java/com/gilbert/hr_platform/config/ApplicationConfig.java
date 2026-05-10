package com.gilbert.hr_platform.config;

import com.gilbert.hr_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;

    // =========================
    // USER DETAILS SERVICE
    // =========================
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> (org.springframework.security.core.userdetails.UserDetails) userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username)
                );
    }

    // =========================
    // AUTH PROVIDER
    // =========================
    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    // =========================
    // AUTH MANAGER
    // =========================
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    // =========================
    // PASSWORD ENCODER
    // =========================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}