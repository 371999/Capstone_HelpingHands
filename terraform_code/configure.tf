terraform {
  backend "azurerm" {
    resource_group_name   = "myBackendResourceGroup"   # Hardcoded name of the resource group
    storage_account_name  = "sarthak"              # Hardcoded name of the storage account
    container_name        = "tfstate"                  # Hardcoded name of the storage container
    key                   = "dev.tfstate"
  }
}
