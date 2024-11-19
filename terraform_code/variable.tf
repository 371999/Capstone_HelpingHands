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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDi6qMgXKA1xAxU/4nlWYPsjM51EW5RxRxAA0xyFf4lE3GOLsQnwljUSudiV0tLG1w6I9lWg/f4lcSg/51LMHUIyzKenT4BNGLiOXDBfM92Do9YrY09Lm1xyb0SCKGi75fs8LfNHiqjVGxeM4cmC0GJ57vSuKOpfBhj6bDhcN+4u3BhR+JPf8ObT9DBcComBqEus6kpvX+b0TvB2FGkvMQzj7XS3i0wNm5bZ4iqEywwsHJPKJ7X0VzEWImDMkLA0vFpa8WZNdNzZgzz+s+DeYZdUwJ6XNGzCpV5qRYAWPmn8zDEcmKfT8HVvoRI6r7nbj5Lz+ntk5F/YJOAPFZbangP odl_user@SandboxHost-638675720437697956"
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

