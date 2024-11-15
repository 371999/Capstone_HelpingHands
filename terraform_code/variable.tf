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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDRBX0FmSR8KulkcU1fDzpkllrHZ4SKt3UM+Rd4uyTy8f8RwTJXbLZDqMAu0k2O2iO3GvV4qzXwO3u61TfNjdxlsXn+kLIgBsGIPm7mGCupvk3PouEU/eFpnAGEcPdoSPbBw6Lg1VGtjyZqzkVKV2x6K3jGD7vznUGcu4WlioBntmQrgbHlc3rAItkRutAYDlS94x36KWqL/bXcDNQnfKv1MeIqyP3i/HgGoKSosc5DYWeFiP51WcLxwRzizz2zkThFobcG8KMC41SNiMkxcbPVRqn4cGV/puySgHfCiHnUaNczaDlritbP+Wpl/sw8fm/Gfo7Qb2LT+8je5kFGH3Y7 odl_user@SandboxHost-638672373554535032"
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

