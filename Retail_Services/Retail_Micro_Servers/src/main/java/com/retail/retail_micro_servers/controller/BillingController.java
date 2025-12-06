package com.retail.retail_micro_servers.controller;

import com.retail.retail_micro_servers.billing.Billing;
import com.retail.retail_micro_servers.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billings")
public class BillingController {

    @Autowired
    private BillingService billingService;

    // Use BillingService for data access to avoid duplicate repository beans
    @GetMapping
    public List<Billing> getAllBillings(@RequestHeader(value = "X-User-Email", required = false) String userEmail,
                                         @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        List<Billing> all = billingService.getAllBillings();
        if (userRole != null && userRole.equalsIgnoreCase("admin")) {
            return all;
        }
        if (userEmail != null && !userEmail.isBlank()) {
            return all.stream().filter(b -> userEmail.equalsIgnoreCase(b.getCustomerEmail())).toList();
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillingById(@PathVariable Long id,
                                                  @RequestHeader(value = "X-User-Email", required = false) String userEmail,
                                                  @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        var opt = billingService.getBillingById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.<Billing>status(HttpStatus.NOT_FOUND).build();
        }
        Billing billing = opt.get();
        if (userRole != null && userRole.equalsIgnoreCase("admin")) {
            return ResponseEntity.ok(billing);
        }
        if (userEmail != null && userEmail.equalsIgnoreCase(billing.getCustomerEmail())) {
            return ResponseEntity.ok(billing);
        }
        return ResponseEntity.<Billing>status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping
    public ResponseEntity<Billing> createBilling(@RequestBody Billing billing) {
        Billing createdBilling = billingService.createBilling(billing);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBilling);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Billing> updateBilling(@PathVariable Long id,
                                                 @RequestBody Billing billing,
                                                 @RequestHeader(value = "X-User-Email", required = false) String userEmail,
                                                 @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        var opt = billingService.getBillingById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.<Billing>status(HttpStatus.NOT_FOUND).build();
        }
        Billing existing = opt.get();
        // allow admin or owner (customerEmail matches)
        if (!(userRole != null && userRole.equalsIgnoreCase("admin")) &&
                !(userEmail != null && userEmail.equalsIgnoreCase(existing.getCustomerEmail()))) {
            return ResponseEntity.<Billing>status(HttpStatus.FORBIDDEN).build();
        }
        Billing updatedBilling = billingService.updateBilling(id, billing);
        if (updatedBilling != null) {
            return ResponseEntity.ok(updatedBilling);
        } else {
            return ResponseEntity.<Billing>status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBilling(@PathVariable Long id,
                                              @RequestHeader(value = "X-User-Email", required = false) String userEmail,
                                              @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        var opt = billingService.getBillingById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.<Void>status(HttpStatus.NOT_FOUND).build();
        }
        Billing existing = opt.get();
        // allow admin or owner
        if (!(userRole != null && userRole.equalsIgnoreCase("admin")) &&
                !(userEmail != null && userEmail.equalsIgnoreCase(existing.getCustomerEmail()))) {
            return ResponseEntity.<Void>status(HttpStatus.FORBIDDEN).build();
        }
        billingService.deleteBilling(id);
        return ResponseEntity.noContent().build();
    }
}
