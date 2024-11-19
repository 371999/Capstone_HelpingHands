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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDYpWwu5Aypt3jcDexytlpmM0kZYSIr0UScwYJvUMN8FvNNByHJFFpvW4R3uo5ih3NmV+EP9IOzlJZRGm/9Hu4h5YSijVqeuc5qOTLukdfYJFhrlI+tMYgdt5YiGbRGBSdXuFgaAalCUvbOYwKWKP6sywkWbYRbswq35hmcrC/tD6V60wMsdb92xYabPbWA0AH2glQ+op79h5dA84B4P8gzO+oOiky3gzAl8HFX90eQch+2Lv9+z4jTdr4abVMVJbF6M7zB7AQ7jbuDidH9B4NxROeve6u9ys4D1JKSelFfNwn51Egpk/nBxB0IfuZXHaGgoVunlGlTg0MNSJyjjfo5 odl_user@SandboxHost-638675693134097800"
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

