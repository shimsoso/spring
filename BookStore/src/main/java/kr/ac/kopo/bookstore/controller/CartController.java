package kr.ac.kopo.bookstore.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.ac.kopo.bookstore.model.Detail;

@RestController
@RequestMapping("/cart")
public class CartController {
	
	@PostMapping("/update_all")
	String updateAll(@RequestBody List<Detail> list, @SessionAttribute("cart") HashMap<Long, Integer> cart) {
		for(Detail item : list)
			cart.put(item.getBookid(), item.getAmount().intValue());
		
		return "OK";
	}
	
	@PostMapping("/delete_check")
	String deleteCheck(@RequestBody Long[] list, @SessionAttribute("cart") HashMap<Long, Integer> cart) {
		for(Long bookid : list)
			cart.remove(bookid);
		
		return "OK";
	}
	
	@GetMapping("/delete/{bookid}")
	String deleteCart(@PathVariable Long bookid, @SessionAttribute("cart") HashMap<Long, Integer> cart) {
		if(cart.remove(bookid) != null)		
			return "OK";
		
		return "FAIL";
	}
	
	@GetMapping("/add/{bookid}")
	String addCart(@PathVariable Long bookid, 
			@SessionAttribute(name="cart", required=false) HashMap<Long, Integer> cart, 
			HttpSession session) {
		if(cart == null) {
			cart = new HashMap<Long, Integer>();
			session.setAttribute("cart", cart);
		}
		
		Integer amount = cart.get(bookid);
		if(amount == null)
			amount = 0;
		
		cart.put(bookid, amount + 1);
			
		System.out.println("장바구니 담기: " + bookid + ", " + cart.get(bookid));
		
		return "OK";
	}
	
	@GetMapping("/update/{bookid}/{amount}")
	String update(@PathVariable Long bookid, @PathVariable int amount,
			@SessionAttribute("cart") HashMap<Long, Integer> cart) {
		if(cart.put(bookid, amount) != null)
			return "OK";
		
		return "FAIL";
	}

}
