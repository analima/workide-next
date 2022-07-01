terraform {
  backend "s3" {
    bucket = "812671651954-statefile"
    workspace_key_prefix = "arquivo-api"
    key    = "task.tfstate"
    region = "us-east-1"
  }
}