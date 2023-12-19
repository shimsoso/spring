package kr.ac.kopo.shopbooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/role/user")
public class RoleUserController {
	final String path = "role/user/";
	
	@GetMapping
	String index() {
		return path + "index";
	}
}
