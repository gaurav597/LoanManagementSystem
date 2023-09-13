package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class ItemMaster {
    @Id
    private String itemId;
    private String itemDescription;
    private char issueStatus;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate itemMake;

    private String itemCategory;
    private Integer itemValuation;
}
