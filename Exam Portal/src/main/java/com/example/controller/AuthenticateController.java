package com.example.controller;

import com.example.config.JwtUtil;
import com.example.model.JwtRequest;
import com.example.model.JwtResponse;
import com.example.model.User;
import com.example.service.impl.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticateController {


    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailServiceImpl userDetailService;
    @Autowired
    private JwtUtil jwtUtil;

    //Generate Tokes
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            System.out.println("++++++++3");
            System.out.println("  iam here " + jwtRequest.getUserName() + "--" + jwtRequest.getPassword());

            authenticate(jwtRequest.getUserName(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User Not found");
        }

        //generate token
        UserDetails userDetails = this.userDetailService.loadUserByUsername(jwtRequest.getUserName());
        String token = this.jwtUtil.generateToken(userDetails);


        return ResponseEntity.ok(new JwtResponse(token));
    }


    private void authenticate(String userName, String password) throws Exception {
        try {


            System.out.println("  iam here om auyh =" + userName + "--" + password);

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));

        } catch (DisabledException e) {
            throw new Exception("User Disabled");

        } catch (BadCredentialsException e) {
            throw new Exception("invalid Crediential" + e.getMessage());
        }

    }

    // Return the current log in user
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal) {
        return (User) this.userDetailService.loadUserByUsername(principal.getName());
    }
}
