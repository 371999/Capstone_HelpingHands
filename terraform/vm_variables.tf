variable "private_key" {
  description = "Private key for SSH authentication"
  type        = string
}
variable "public_key" {
  description = "The public SSH key for the virtual machine"
  type        = string
}
