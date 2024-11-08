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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6kpd/4cghf5Ui+qYSEqmin0w/dyc5Fu5fmzD0tce7ayCnTi0zA96yQD9OitXXXAy771NCXtrjZHwd1t28hm6LTYkssKDMUOhNmxKISZubcie95OfoEIL7x3BB0I6HUMGSoziZTeUxzhQnqSIVMEvFWYVpqdGVOKG33/ORoJarlBttGVQwO9HlVLKNgPXYIP7XVnA1KXWY67H4pAuz7T7jyc/WJpytpEm4r1B/yt2fR7/X/ywX6XqW163P0wIvL7dLmo0A7VaUWNKVTTozl5NzvVazosf48Ky3tuyHBqeGUhSFbScm+Biz+PO8tkzyK1gEM2Z5sJNvuDwMZZJICYsd odl_user@SandboxHost-638666194966134753"
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

