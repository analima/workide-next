resource "aws_cloudwatch_log_group" "backend" {
  name = "${var.name}-${var.env}"
  retention_in_days = var.retention

  tags = {
    Environment = var.env
    Application = var.name
  }
}