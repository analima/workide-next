resource "aws_ecs_service" "main" {
 name                               = "${var.name}-service-${var.env}"
 cluster                            = var.cluster_name
 task_definition                    = aws_ecs_task_definition.backend.arn
 desired_count                      = 2
 deployment_minimum_healthy_percent = 50
 deployment_maximum_percent         = 200
 launch_type                        = "FARGATE"
 scheduling_strategy                = "REPLICA"
 force_new_deployment               = true
 health_check_grace_period_seconds  = var.health_check_grace_period_seconds
 
 network_configuration {
   security_groups  = [aws_security_group.ecs_tasks.id]
   subnets          = var.subnets
   assign_public_ip = false
 }
 
 load_balancer {
   target_group_arn = aws_alb_target_group.main.arn
   container_name   = "${var.name}-container-${var.env}"
   container_port   = var.container_port
 }
 
 lifecycle {
   ignore_changes = [desired_count]
 }
}