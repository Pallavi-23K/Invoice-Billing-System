package com.retail.retail_micro_servers.service;

import com.retail.retail_micro_servers.billing.Billing;

import java.util.List;
import java.util.Optional;

public interface BillingService {
    List<Billing> getAllBillings();
    Optional<Billing> getBillingById(Long id);
    Billing createBilling(Billing billing);
    Billing updateBilling(Long id, Billing billing);
    void deleteBilling(Long id);
}
