output "frontend_backend_vm_id" {
  description = "The ID of the Virtual Machine running frontend and backend"
  value       = azurerm_linux_virtual_machine.frontend_backend_vm.id
}

# Output the FQDN for the Public IP
output "public_ip_fqdn" {
  value = azurerm_public_ip.frontend_backend_pip.fqdn
  description = "The Fully Qualified Domain Name (FQDN) of the public IP."
}

# Output the DNS Zone Name
output "dns_zone_name" {
  value = azurerm_dns_zone.helpinghands_org.name
  description = "The name of the DNS Zone."
}

# Output the CNAME Record for www
output "cname_record_www" {
  value = azurerm_dns_cname_record.www.record
  description = "The FQDN that 'www' subdomain points to."
}
