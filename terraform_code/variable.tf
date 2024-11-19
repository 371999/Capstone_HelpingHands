# Variables for the resource group and SSH public key
variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "myResourceGroup"
}

variable "location" {
  description = "The Azure location for resources"
  type        = string
  default     = "East US"
}

variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPh51uQ5QxirCCHWYqQZ7LZ2Fy2f6MtEVQln85MG66/y4+5syQEh9eRiVkSoh1JCsA1x25F9LPNRORJyfMC2QujcrPKh4aJwFaVi67FO3hKpfTZXPX/lPlqoj5gZKj695RCQiqt6NwOzbSJjDinoAqD8Md3Y4YXWLVKJAi/aRRBccnZL4OESsSF7QzTaIrFoUZygmXqNZfDxw9mwGAviGstVAn9d79ncUHOoVlppWbNbMPoPZ9f6vFK+HFV8e9QuSvF/+Sngghr0BKrwrMozsD9RiuG9hZb23oFIrrwiFQgy3iCK9+4Gw0xibZq3Cbw0uEQMDuFbMPCC4QURe9OJMP odl_user@SandboxHost-638675693134097800"
}
variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "client_id" {
  description = "Azure client ID"
  type        = string
}

variable "client_secret" {
  description = "Azure client secret"
  type        = string
  sensitive   = true
}

variable "tenant_id" {
  description = "Azure tenant ID"
  type        = string
}

