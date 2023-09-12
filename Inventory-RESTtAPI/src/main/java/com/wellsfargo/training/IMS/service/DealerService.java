package com.wellsfargo.training.IMS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.IMS.model.Dealer;
import com.wellsfargo.training.IMS.repository.DealerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DealerService {

	@Autowired
	private DealerRepository drepo;

	public Dealer registerDealer(Dealer d)
	{
		return drepo.save(d);
	}

	public Optional<Dealer> loginDealer(String email)
	{
		return drepo.findByEmail(email); //Invokes custom method
	}
}
