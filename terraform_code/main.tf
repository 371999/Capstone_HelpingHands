# Step 1: Define Azure Provider
provider "azurerm" {
  features {}
}

# Step 2: Create Resource Group and Storage Account for Backend State
resource "azurerm_resource_group" "backend_rg" {
  name     = "myBackendResourceGroup"
  location = "East US"
}

resource "azurerm_storage_account" "backend_storage" {
  name                     = "sarthak"         # Change to a globally unique name if needed
  resource_group_name      = azurerm_resource_group.backend_rg.name
  location                 = azurerm_resource_group.backend_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.backend_storage.name
  container_access_type = "private"
}

# Step 3: Configure Terraform Backend (after running terraform apply once)
terraform {
  backend "azurerm" {
    resource_group_name   = azurerm_resource_group.backend_rg.name
    storage_account_name  = azurerm_storage_account.backend_storage.name
    container_name        = azurerm_storage_container.tfstate.name
    key                   = "dev.tfstate"
  }
}

# Step 4: Create Other Resources (e.g., VM, Network, etc.)

# Define a new resource group for other resources
resource "azurerm_resource_group" "dev_rg" {
  name     = "myResourceGroup"
  location = "East US"
}

# Create a Virtual Network
resource "azurerm_virtual_network" "dev_vnet" {
  name                = "dev-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.dev_rg.location
  resource_group_name = azurerm_resource_group.dev_rg.name
}

# Create a Subnet
resource "azurerm_subnet" "dev_subnet" {
  name                 = "dev-subnet"
  resource_group_name  = azurerm_resource_group.dev_rg.name
  virtual_network_name = azurerm_virtual_network.dev_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Create a Network Security Group
resource "azurerm_network_security_group" "dev_nsg" {
  name                = "dev-nsg"
  location            = azurerm_resource_group.dev_rg.location
  resource_group_name = azurerm_resource_group.dev_rg.name

  security_rule {
    name                       = "Allow-SSH"
    priority                   = 1000
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Create a Public IP
resource "azurerm_public_ip" "dev_public_ip" {
  name                = "dev-public-ip"
  location            = azurerm_resource_group.dev_rg.location
  resource_group_name = azurerm_resource_group.dev_rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Create a Network Interface
resource "azurerm_network_interface" "dev_nic" {
  name                = "dev-nic"
  location            = azurerm_resource_group.dev_rg.location
  resource_group_name = azurerm_resource_group.dev_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.dev_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.dev_public_ip.id
  }
}

# Associate the Network Security Group with the Network Interface
resource "azurerm_network_interface_security_group_association" "dev_nic_nsg" {
  network_interface_id      = azurerm_network_interface.dev_nic.id
  network_security_group_id = azurerm_network_security_group.dev_nsg.id
}

# Create a Virtual Machine
resource "azurerm_linux_virtual_machine" "dev_vm" {
  name                = "dev-vm"
  resource_group_name = azurerm_resource_group.dev_rg.name
  location            = azurerm_resource_group.dev_rg.location
  size                = "Standard_D2s_v3"
  admin_username      = "azureuser"

  admin_ssh_key {
    username   = "azureuser"
    public_key = var.ssh_public_key
  }

  network_interface_ids = [azurerm_network_interface.dev_nic.id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

# Define a variable for SSH public key
variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
}

# Outputs
output "vm_public_ip" {
  value       = azurerm_public_ip.dev_public_ip.ip_address
  description = "The public IP of the VM"
}
