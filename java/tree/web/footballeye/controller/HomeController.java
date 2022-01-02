package tree.web.footballeye.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping("/")
	public String home() {
		
		return "home";		
	}
	
	@RequestMapping("/guide")
	public String guide() {
		return "guide/index";		
	}
	
	@RequestMapping("/classroom")
	public String classroom() {
		return "classroom/index";		
	}
	
	@RequestMapping("/lesson")
	public String lesson() {
		return "lesson/index";		
	}
	
	@RequestMapping("/video")
	public String video() {
		return "video/index";		
	}
	
	
}
