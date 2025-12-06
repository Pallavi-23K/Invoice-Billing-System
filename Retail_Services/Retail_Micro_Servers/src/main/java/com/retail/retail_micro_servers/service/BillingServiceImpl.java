package com.retail.retail_micro_servers.service;

import com.retail.retail_micro_servers.billing.Billing;
import com.retail.retail_micro_servers.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillingServiceImpl implements BillingService {

    @Autowired
    private BillingRepository billingRepository;

    @Override
    public List<Billing> getAllBillings() {
        return billingRepository.findAll();
    }

    @Override
    public Optional<Billing> getBillingById(Long id) {
        return billingRepository.findById(id);
    }

    @Override
    public Billing createBilling(Billing billing) {
        return billingRepository.save(billing);
    }

    @Override
    public Billing updateBilling(Long id, Billing billing) {
        if (billingRepository.existsById(id)) {
            billing.setBillingId(id);
            return billingRepository.save(billing);
        } else {
            return null; // Or throw an exception
        }
    }

    @Override
    public void deleteBilling(Long id) {
        billingRepository.deleteById(id);
    }
}
