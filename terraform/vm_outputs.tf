output "frontend_backend_vm_id" {
  description = "The ID of the Virtual Machine running frontend and backend"
  value       = azurerm_linux_virtual_machine.frontend_backend_vm.id
}

output "public_ip_fqdn" {
  value       = azurerm_public_ip.frontend_backend_pip.fqdn
  description = "The Fully Qualified Domain Name (FQDN) of the public IP."
}
