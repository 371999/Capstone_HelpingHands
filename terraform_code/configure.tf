# Provider Configuration for Azure
provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

terraform {
  backend "azurerm" {
    resource_group_name   = "myBackendResourceGroup"   # Hardcoded name of the resource group
    storage_account_name  = "sarthak12345storage"              # Hardcoded name of the storage account
    container_name        = "tfstate"                  # Hardcoded name of the storage container
    key                   = "dev.tfstate"
  }
}
