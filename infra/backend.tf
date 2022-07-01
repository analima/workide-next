terraform {
  backend "s3" {
    bucket = "812671651954-statefile"
    workspace_key_prefix = "next"
    key    = "task.tfstate"
    region = "us-east-1"
  }
}