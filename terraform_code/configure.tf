# Provider Configuration
provider "azurerm" {
  features {}
}

# Resource Group for the Backend State
resource "azurerm_resource_group" "dev_rg" {
  name     = var.resource_group_name
  location = var.location
}

# Storage Account for the Terraform State
resource "azurerm_storage_account" "backend_storage" {
  name                     = "shreyas3799"         # Ensure this name is globally unique
  resource_group_name      = azurerm_resource_group.dev_rg.name
  location                 = azurerm_resource_group.dev_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# Storage Container for the Terraform State
resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.backend_storage.name
  container_access_type = "private"
}

# Configure Backend for Remote State Storage (uncomment after initial apply)
terraform {
  backend "azurerm" {
    resource_group_name   = azurerm_resource_group.dev_rg.name
    storage_account_name  = azurerm_storage_account.backend_storage.name
    container_name        = azurerm_storage_container.tfstate.name
    key                   = "dev.tfstate"
  }
}
