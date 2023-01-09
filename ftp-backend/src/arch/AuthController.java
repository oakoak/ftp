package org.oak.ftpbackend;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final String SECRET_KEY = "secret-key";

    @PostMapping("/login")
    public String login(@RequestParam(value = "login")String login, @RequestParam(value = "password")String password) {
        // Validate the login request (e.g., check the password, etc.)

        // If the login is successful, generate a JWT token
        String token = Jwts.builder()
                .setSubject(login)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        return token;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest registerRequest) {
        // Register the new user
    }

    @PostMapping("/validate")
    public void validate(@RequestBody ValidateRequest validateRequest) {
        // Validate the JWT token in the request
    }

    @PostMapping("/refresh")
    public String refresh(@RequestBody RefreshRequest refreshRequest) {
        // Validate the refresh request and generate a new JWT token
        String token = Jwts.builder()
                .setSubject(refreshRequest.getUsername())
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        return token;
    }
}
