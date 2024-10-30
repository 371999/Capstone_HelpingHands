variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
}

variable "client_id" {
  description = "Azure client ID for authentication"
  type        = string
}

variable "client_secret" {
  description = "Azure client secret for authentication"
  type        = string
  sensitive   = true
}

variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "tenant_id" {
  description = "Azure tenant ID"
  type        = string
}
