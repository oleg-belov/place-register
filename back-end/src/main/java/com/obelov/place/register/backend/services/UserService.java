package com.obelov.place.register.backend.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.obelov.place.register.backend.exceptions.UserAlreadyExistsException;
import com.obelov.place.register.backend.models.Role;
import com.obelov.place.register.backend.models.User;
import com.obelov.place.register.backend.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }
    
    public boolean checkIfExist(String email) {
    	User user = userRepository.findByEmail(email);
    	
		return (user == null) ? false : true;
    }
    
    public Collection<User> findAllUsers() {
    	return this.userRepository.findAll();
    }
    
    @Transactional
	public User saveUser(User user) {
    	boolean alrediExist = this.checkIfExist(user.getEmail());
    	
    	if(alrediExist) {
    		throw new UserAlreadyExistsException();
    	}
    	
		return this.userRepository.save(user);
	}
}
