package com.obelov.place.register.backend;

//import java.util.Arrays;

//import javax.annotation.PostConstruct;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//import com.obelov.place.register.backend.models.Role;
//import com.obelov.place.register.backend.models.User;
//import com.obelov.place.register.backend.repositories.UserRepository;

@SpringBootApplication
//uncomment if you want to use Spring Security XML Configuration
//@ImportResource("classpath:spring-security-config.xml")
public class BackEndApplication {

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    @Autowired
//    private UserRepository userRepository;
//    
//    @PostConstruct
//    public void init(){
//        User user = new User(
//                "Jhon",
//                "Thompson",
//                "info@memorynotfound.com",
//                passwordEncoder.encode("password"),
//                Arrays.asList(
//                        new Role("ROLE_USER"),
//                        new Role("ROLE_ADMIN")));
//
//        if (userRepository.findByEmail(user.getEmail()) == null){
//            userRepository.save(user);
//        }
//    }
    
	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}
}
