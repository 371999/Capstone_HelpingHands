variable "private_key" {
  description = "Private key for SSH authentication"
  type        = string
  sensitive   = true
  default     = ""  # Default to empty string for validation
}

variable "public_key" {
  description = "Public key for SSH authentication"
  type        = string
  default     = ""  # Default to empty string for validation
}
