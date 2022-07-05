resource "aws_alb_target_group" "main" {
  name        = "next-tg-${var.env}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc
  target_type = "ip"
 
  health_check {
   healthy_threshold   = "3"
   interval            = "15"
   protocol            = "HTTP"
   matcher             = "200-401"
   timeout             = "3"
   path                = var.health_check_path
   unhealthy_threshold = "2"
  }
}

resource "aws_alb_listener_rule" "next" {
  listener_arn = var.listener_arn
  priority     = 110

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.main.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}