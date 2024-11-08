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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDMbtEkMutc9Sc9y/bGQGFNY+aV8yNmudC90g8BBZqtULqsjZMYhbQcIiLI3S0jIEZF5DcfR/dF1iCGzmKR86+I1ugc9HkBZOBkGmFBlQeTFrDPYXXWY1xr80y9raA7usAuRmFZTvRzbVo38UEuzKqRVAPL78JQdMmsW+temXDSFjBduU8sGdygmhsJ194N4C/b/RL+ZE4Z1wx9wDX0CKFqQ2PRyx8oZA3CPShs4PNsggYoWtMH4u5+dC6KrVr2gaAeTrfbJ9eEX5mt2+jdct/3hHAdHGsIGsBpsu6Gi1wWFt8pmJmSTMh4zWQHvsA8BvxSW+Qvwrx/wOP3C1I1gp9h odl_user@SandboxHost-638666568094856435"
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

