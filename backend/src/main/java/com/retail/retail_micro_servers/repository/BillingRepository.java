package com.retail.retail_micro_servers.repository;

import com.retail.retail_micro_servers.billing.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
	List<Billing> findByCustomerEmail(String customerEmail);
}
