package com.eazybytes.eazystore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class EazystoreApplication {
	public static void main(String[] args) {
		SpringApplication.run(EazystoreApplication.class, args);
	}
}
