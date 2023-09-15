package com.wellsfargo.loanManagementSystem.repository;

import com.wellsfargo.loanManagementSystem.model.ItemMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends JpaRepository<ItemMaster, String> {
}
