terraform {
  backend "s3" {
    bucket = "184313004318-terraform-state-repo"
    workspace_key_prefix = "next"
    key    = "task.tfstate"
    region = "us-west-2"
  }
}