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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDVxp78K/VtXWiAKQHQSQ9Nat1sy6n4+AvC01jh+E2GWByQF3f25/gBI4/poT81r9J4ZigQ0HOXIzxIv9cm/aajS2sdA2qk+Rk8jb/8PzLEwSKPerFpLr1UgA2817SWHdhtH1sGYB9D6sv+bHfPAhJXB0m2nBBadQjtSKmiAIBZ5EAaLIdRSAkJuxnS7moZZLGxB+CNPsmHUrR1evZaalAtB0VS9bwpXpbDpxfKxknSNkbI/eW5NmYPO7Tq5QIgodiIT2TVAuRM0kUAQ5inhV6xCBuzxUzVVW2mWxcjKpz9MBYjmMurshsqxG2DqVZd6eWPXDIH31TxgbrGcqKw/Uip odl_user@SandboxHost-638666477999561246"
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

