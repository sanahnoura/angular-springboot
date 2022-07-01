package com.example.sendmail.configuration;

import java.nio.charset.StandardCharsets;

import org.springframework.context.annotation.Bean;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.StandardTemplateModeHandlers;


public class Configuration {
	

   
    
	   @Bean
	    public SpringTemplateEngine springTemplateEngine() {
	        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
	        templateEngine.addTemplateResolver(htmlTemplateResolver());
	        return templateEngine;
	    }

	    @Bean
	    public SpringResourceTemplateResolver htmlTemplateResolver() {
	        SpringResourceTemplateResolver pdfTemplateResolver = new SpringResourceTemplateResolver();
	        pdfTemplateResolver.setPrefix("classpath:/sendmail/");
	        pdfTemplateResolver.setSuffix(".html");
	        pdfTemplateResolver.setTemplateMode(StandardTemplateModeHandlers.HTML5.getTemplateModeName());
	        pdfTemplateResolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
	        return pdfTemplateResolver;
	    }


}
