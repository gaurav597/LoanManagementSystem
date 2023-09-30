package com.wellsfargo.loanManagementSystem.model;


import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class ItemPurchased {
    private Long issueId;
    private String itemDescription;
    private String itemMake;
    private String itemCategory;
    private Integer itemValuation;
}
