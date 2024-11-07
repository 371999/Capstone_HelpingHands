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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCyM9CLpCwUJleImEAU/qUfAz2YI3NmMsCS1cXljRYjulxF4dypwPJoKPF+UmmCbC6eFhKVeErho1esUGzZQpuoPs4GwTDJkz9o/mesSY8oiQdYZXfncNJ9mYAzJOyfzATR86q9+4gGZZHYjpCB7nFRkHH0ffgu5TMSvAVJlLFyaZyaFxBydp1ic1VeQiskQ48JCuJW/YlRlgl6ZXDITABNv4aZnYgY7fbmF8SKRBPteI3rwX8iM+3MK3eaF4sgiBc1rGPyLjThPx9P/7RhSf1B2oHwBuARB43E4jE41KEXlstmg/gK0B4HM7NWFgoV+gmgJBvU7+NeKZ4/HN79l7zP odl_user@SandboxHost-638666052585721539"
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

