resource "aws_lb_target_group" "nlb" {
  name        = "next-tg-nlb-${var.env}"
  port        = 80
  protocol    = "TCP"
  vpc_id      = var.vpc
  target_type = "ip"
 
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = var.nlb_arn
  port              = "443"
  protocol          = "TLS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.acm_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb.arn
  }
}