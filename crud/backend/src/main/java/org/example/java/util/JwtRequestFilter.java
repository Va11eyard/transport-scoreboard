package org.example.java.util;

import io.jsonwebtoken.Claims;
import org.example.java.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, jakarta.servlet.ServletException {
        String path = request.getRequestURI();
        logger.debug("Processing request for path: " + path);

        if (path.equals("/api/login") || path.equals("/api/register")) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.warn("No valid Bearer token found for " + path);
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        try {
            String username = jwtTokenUtil.extractUsername(token);
            logger.debug("Extracted username from token: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(username);
                if (jwtTokenUtil.validateToken(token, userDetails)) {
                    Claims claims = jwtTokenUtil.extractAllClaims(token);
                    @SuppressWarnings("unchecked")
                    List<String> roles = (List<String>) claims.get("roles", List.class);
                    List<SimpleGrantedAuthority> authorities = (roles != null && !roles.isEmpty())
                            ? roles.stream()
                                .map(role -> new SimpleGrantedAuthority(role.startsWith("ROLE_") ? role : "ROLE_" + role))
                                .collect(Collectors.toList())
                            : Collections.singletonList(new SimpleGrantedAuthority("ROLE_user")); // Fallback

                    logger.debug("Authorities for " + username + ": " + authorities);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Successfully authenticated " + username + " for " + path + " with roles: " + authorities);
                } else {
                    logger.warn("Token validation failed for " + username);
                }
            }
        } catch (Exception e) {
            logger.error("Error processing JWT token: " + e.getMessage(), e);
            throw e; // Re-throw to trigger exception handling
        }
        chain.doFilter(request, response);
    }
}