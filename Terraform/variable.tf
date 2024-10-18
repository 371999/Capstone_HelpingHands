# Instance type for different environments
variable "instance_type" {
  default = {
    "prod"    = "Standard_D2s_v3"
    "test"    = "Standard_B1s"
    "staging" = "Standard_B1s"
    "dev"     = "Standard_B1s"
  }
  description = "Type of the instance"
  type        = map(string)
}

# Variable to signal the current environment
variable "env" {
  default     = "dev"
  type        = string
  description = "Deployment Environment"
}
