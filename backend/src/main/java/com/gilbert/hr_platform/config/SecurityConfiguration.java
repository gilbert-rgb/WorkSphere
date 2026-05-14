package com.gilbert.hr_platform.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // CSRF disabled for JWT APIs
                .csrf(csrf -> csrf.disable())

                // Stateless session (JWT)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // AUTH RULES
                .authorizeHttpRequests(auth -> auth

                        // 🔓 allow preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 🔓 allow root + error (IMPORTANT for Render)
                        .requestMatchers("/", "/error", "/favicon.ico").permitAll()

                        // 🔓 AUTH endpoints
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/whatsapp/**").permitAll()
                        .requestMatchers("/api/v1/otp/**").permitAll()

                        // 🔒 ADMIN only
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/users/**").hasRole("ADMIN")

                        // 🔒 HR + ADMIN
                        .requestMatchers("/api/v1/employees/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/departments/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/payroll/**").hasAnyRole("ADMIN", "HR")

                        // 🔒 Leave approvals
                        .requestMatchers("/api/v1/leave/approve/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers("/api/v1/leave/reject/**").hasAnyRole("ADMIN", "HR")

                        // 🔒 Authenticated users
                        .requestMatchers("/api/v1/leave/**").authenticated()
                        .requestMatchers("/api/v1/attendance/**").authenticated()

                        // 🔒 everything else
                        .anyRequest().authenticated()
                )

                // AUTH PROVIDER
                .authenticationProvider(authenticationProvider)

                // JWT FILTER
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // ✅ MUST match EXACT Netlify domain
        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000",
                "https://hrplatformworksphere.netlify.app"
        ));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With"
        ));

        config.setExposedHeaders(List.of("Authorization"));

        // ⚠️ IMPORTANT: must be TRUE ONLY if NOT using "*"
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}