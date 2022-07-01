resource "aws_lb_target_group" "nlb" {
  name        = "arquivos-tg-nlb-${var.env}"
  port        = 8085
  protocol    = "TCP"
  vpc_id      = var.vpc
  target_type = "ip"
 
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = var.nlb_arn
  port              = "8085"
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb.arn
  }
}