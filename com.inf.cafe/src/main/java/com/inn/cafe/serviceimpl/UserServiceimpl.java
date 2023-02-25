package com.inn.cafe.serviceimpl;

import java.util.Map;
import java.util.Objects;

import com.inn.cafe.POJO.User;
import com.inn.cafe.constents.CafeConsents;
import com.inn.cafe.dao.UserDao;
import com.inn.cafe.service.UserService;
import com.inn.cafe.utils.CafeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceimpl implements UserService {

	@Autowired
	UserDao userDao;
	@Override
	public ResponseEntity<String> signUp(Map<String, String> requespMap) {
		log.info("Inside the SignUp{}",requespMap);
		try {
			
		if (validateSignUpMap(requespMap)) {
			User user=userDao.findByEmailId(requespMap.get("email"));
			if (Objects.isNull(user)) {
				userDao.save(getUserFromMap(requespMap));
				return CafeUtils.getResponseEntity("Successfully Registered", HttpStatus.OK);
			}else
			{
				return CafeUtils.getResponseEntity("Email Already Exist", HttpStatus.BAD_REQUEST);
			}
		}else
		{
			return CafeUtils.getResponseEntity(CafeConsents.INVALID_DATA, HttpStatus.BAD_REQUEST);
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConsents.Some_Thing_Went_Wrong, HttpStatus.INTERNAL_SERVER_ERROR);
		
	}

	private Boolean validateSignUpMap(Map<String, String> requestMap) {
		if (requestMap.containsKey("name") && requestMap.containsKey("contactNumber") &&
				requestMap.containsKey("email")
				&& requestMap.containsKey("password"))
			return true;
		else
			return false;

	}

	private User getUserFromMap(Map<String,String> requestMap) {
		User user=new User();
		user.setName(requestMap.get("name"));
		user.setContactNumber(requestMap.get("contactNumber"));
		user.setEmail(requestMap.get("email"));
		user.setPassword(requestMap.get("password"));
		user.setStatus(requestMap.get("false"));
		user.setRole("user");
		return user;
		
		
	}
}
