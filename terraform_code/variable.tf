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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDYdH26eVa6+/XTbJdhcj1qMkIT53f0zGu0Ch9ki6poXaGGzgc8WtqNZJOVkR1LnrBFPl8smPPcdxk8xpaKhz/dwLbZgjop08325OnuRN2hs9hPmZp6+v8lFANP5rcCUncBJ+NMy8ojdxE+66At7egdK4WYEGiDk51DCL6iMcMdEmFVKvE3nZ7eig6Jof8K5aBPza+R3giKcYFXdHNeeyvl9rj+5xYKgcQOvLe4jSMfsF+jDqkpkhkWF9KuekQuAXy8HAvGcJE6xolzwETj02Pb+6Y4ZyCWXDwRDI+WsGIWEAeE6fsoQV2+aHTYPG/9PmPDI6ECADGbsjerDghsHird odl_user@SandboxHost-638676322078001737"
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

