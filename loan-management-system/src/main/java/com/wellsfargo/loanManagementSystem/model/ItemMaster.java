package com.wellsfargo.loanManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class ItemMaster {
    @Id
    private String itemId;
    private String itemDescription;
    private char issueStatus;
    private String itemMake;

    private String itemCategory;
    private Integer itemValuation;
}
