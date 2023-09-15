package com.wellsfargo.loanManagementSystem.repository;

import com.wellsfargo.loanManagementSystem.model.LoanCardMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "loancards", path = "loancards")
public interface LoanCardRepository extends JpaRepository<LoanCardMaster, String> {
}
