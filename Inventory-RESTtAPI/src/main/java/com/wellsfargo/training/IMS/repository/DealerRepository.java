package com.wellsfargo.training.IMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.IMS.model.Dealer;

/**
 * 
 * @author rajgs
 * JPA Repository is mainly used for managing the data in a Spring Boot Application. 
 * JpaRepository is particularly a JPA specific extension for Repository.
 * Jpa Repository contains the APIs for basic CRUD operations, the APIS for 
 * pagination, and the APIs for sorting.
 * This Layer interacts with Database
*/
public interface DealerRepository extends JpaRepository<Dealer, Long>{

	//Optional is used to deal with Null pointer exception.
	//Custom method to fetch record / object based on email field. (i.e. a non id field)
	public Optional<Dealer> findByEmail(String email);
}
