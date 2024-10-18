# Define the provider for Azure
provider "azurerm" {
  features {}
}

# Retrieve global variables from the Terraform module
module "globalvars" {
  source = "../../modules/globalvars"
}

# Define the resource group
resource "azurerm_resource_group" "my_rg" {
  name     = "${local.name_prefix}-rg"
  location = "East US"

  tags = merge(local.default_tags, {
    "environment" = var.env
  })
}

# Create a virtual network
resource "azurerm_virtual_network" "my_vnet" {
  name                = "${local.name_prefix}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.my_rg.location
  resource_group_name = azurerm_resource_group.my_rg.name

  tags = merge(local.default_tags, {
    "environment" = var.env
  })
}

# Create a subnet
resource "azurerm_subnet" "my_subnet" {
  name                 = "${local.name_prefix}-subnet"
  resource_group_name  = azurerm_resource_group.my_rg.name
  virtual_network_name = azurerm_virtual_network.my_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Network Security Group
resource "azurerm_network_security_group" "my_nsg" {
  name                = "${local.name_prefix}-nsg"
  location            = azurerm_resource_group.my_rg.location
  resource_group_name = azurerm_resource_group.my_rg.name

  security_rule {
    name                       = "AllowSSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = merge(local.default_tags, {
    "environment" = var.env
  })
}

# Public IP
resource "azurerm_public_ip" "my_public_ip" {
  name                = "${local.name_prefix}-public-ip"
  location            = azurerm_resource_group.my_rg.location
  resource_group_name = azurerm_resource_group.my_rg.name
  allocation_method   = "Static"

  tags = merge(local.default_tags, {
    "environment" = var.env
  })
}

# Create Virtual Machine
resource "azurerm_linux_virtual_machine" "my_vm" {
  name                  = "${local.name_prefix}-vm"
  resource_group_name   = azurerm_resource_group.my_rg.name
  location              = azurerm_resource_group.my_rg.location
  size                  = lookup(var.instance_type, var.env)
  admin_username        = "adminuser"
  network_interface_ids = [azurerm_network_interface.my_nic.id]
  admin_ssh_key {
    username   = "adminuser"
    public_key = file("${local.name_prefix}.pub")
  }

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

  tags = merge(local.default_tags, {
    "environment" = var.env
  })
}

# Network Interface
resource "azurerm_network_interface" "my_nic" {
  name                = "${local.name_prefix}-nic"
  location            = azurerm_resource_group.my_rg.location
  resource_group_name = azurerm_resource_group.my_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.my_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.my_public_ip.id
  }

  tags = merge(local.default_tags, {
    "environment" = var.env
  })
}
