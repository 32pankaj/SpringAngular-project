package com.inn.cafe.restimpl;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.inn.cafe.constents.CafeConsents;
import com.inn.cafe.rest.UserRest;
import com.inn.cafe.service.UserService;
import com.inn.cafe.utils.CafeUtils;
@Slf4j
@RestController
public class UserRestImpl implements UserRest{

	@Autowired
	UserService userService;
	
	@Override
	public ResponseEntity<String> SingUp(Map<String, String> requespMap) {
		try {
			log.info(" Inside User rest impl");
			return userService.signUp(requespMap);
		} catch (Exception e) {
			log.info(" Inside User rest impl-----");
			e.printStackTrace();
		}
		
		return CafeUtils.getResponseEntity(CafeConsents.Some_Thing_Went_Wrong, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
