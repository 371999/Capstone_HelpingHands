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
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDylXVW19PpUkYTNzPkvh98eA2XanpqNI2tyvVJ40HXbWG+feV04/N0OQgjymzrg1sWhbiNCSYVJi9RBmZKd5OkdXgV2qPnKKM1u8/D10q/QAKCZE1pm/3NU/CJrzpFTQTMnNo8sh0SRYiXWTrb2AlE08Eizjizns3hUml3Tx4M5+SedVzzKFizwdltVE7ZCNWzhHLzIeVdYQ6Z8BjI1fcddkYIxCMqqSvH4nJ3DuurpJyWVCrppBtXpOooX2VscO8zd+R9YfBRusZC6wthyWVRiseRwivUk4iGx+8eRVbDOES+FQ9XSAmYNI9lISU6tMlytpfG9doYVcfs67Fig/nfyKyWEGzE3mGmAtZMrZ05RAnnJ1exmvfIiNK2sBfF72CeYNPjgr2yUHYVqnyDvE/purXcnWstaLuYqMMota9z3SGOY2+SoKfXDYdYMIC03m35AXeYiA4+oqSe2i908wMiaams2BsdOAxWyyVHfO5jcSiJc38h5RmgcMYbTiWLHFzqvee8hjop81Okre99eTRPq3GHeQ6Lu83yAnY2TciJObYvrYTrGNZ6g2EVtoONW/FyESzScoziUuOlhg5MG7QSXfNrfH58WZDYVAyvksqx545xA5T1SBmteH+ASu6t77Mo/hvv8/3Qvqh5WOeqOw0B1sMoOph2EYU8i3nPK3Jr9Q== project"
}
