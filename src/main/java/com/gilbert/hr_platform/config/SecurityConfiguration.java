package com.gilbert.hr_platform.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // enables @PreAuthorize on controllers
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // PUBLIC
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/whatsapp/webhook").permitAll() // Twilio calls this

                        // ADMIN ONLY
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/users/**").hasRole("ADMIN")

                        // ADMIN + HR
                        .requestMatchers("/api/v1/employees/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/departments/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/leave/approve/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/payroll/**").hasAnyRole("ADMIN", "HR")

                        // ALL AUTHENTICATED USERS
                        .requestMatchers("/api/v1/leave/**").authenticated()
                        .requestMatchers("/api/v1/attendance/**").authenticated()
                        .requestMatchers("/api/v1/whatsapp/send").authenticated()
                        .requestMatchers("/api/v1/otp/**").authenticated()

                        // anything else requires authentication
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}