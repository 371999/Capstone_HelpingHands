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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDX6gTNyi/qIZi3zayc7sPAWB9aTPvovG9l4VsZmNONPjQNQ8gMDvA2kzguvd3ydIgimnMPHG+PY39lU41w100apgdI7n0cumI88ogg1eAGB+UjwGgCO3wVOKS43AyLFw8UKTPVMUU0QD6Id/JIeO3CFuneB1/y6fsmCb/3P02ZdYUGj/6dRdIe+Dd5Xvm3cOWENzpJvHmVtTajbeE8DoX6aOQPVfeUeSKdvj7V83LB1s+Tt5LnXW24N4PfXYSBQBcXgxTvtMq/n7ff6zxszIdujPJEG3qGDU68U3XD1R1kIjmCYMapGQxlEANUnno8BnEx9DDKtipKyPymIawCmIQJ odl_user@SandboxHost-638675724004119759"
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

