output "frontend_backend_vm_id" {
  description = "The ID of the Virtual Machine running frontend and backend"
  value       = azurerm_linux_virtual_machine.frontend_backend_vm.id
}

output "dns_zone_name" {
  value = azurerm_dns_zone.helpinghands_org.name
}

output "dns_fqdn" {
  value = azurerm_public_ip.frontend_backend_pip.fqdn
}
