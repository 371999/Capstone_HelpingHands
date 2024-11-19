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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCm2fv+47aFfPymooHhw+nKTm71F8njbHp0Dgkr8DZEQrZET8xLhYw/+nImXdJMa1a9uLPYFMmNqQh3P6de+S08ypbTdR0NMhNwRgBfJ8xJhPQjKRE5be2xVtu9jiodeUw4tObLncj04eK6jC9DKiNlRG19957hEHxxOP5KX84mXr/7oKqZjITZWd+8uDT3X1ehAzPdR8tiWkogmooj6BrcrvpybcMFdg4LDQvlAZEfV2hfGCZjeSw0DeZ8PfZMzASsrzRnCH9P9AYCc4DGrCE3oViV0Wiqkq2llwt2haaSm2CJO1IdySOhMODPXDDMcF1108qRmac2RmWfMFqNKNJr odl_user@SandboxHost-638675848769399033"
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

