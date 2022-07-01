data "aws_secretsmanager_secret_version" "creds" {
  secret_id = var.secret_id
}

locals {
  your_secret = jsondecode(
    data.aws_secretsmanager_secret_version.creds.secret_string
  )
}

data "aws_ecr_image" "backend" {
  repository_name = "${var.name}-${var.env}"
  image_tag       = "latest"
}


resource "aws_ecs_task_definition" "backend" {
  family = "td-arquivos-api-${var.env}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([{
   name        = "${var.name}-container-${var.env}"
   image       = "${var.container_image}@${data.aws_ecr_image.backend.image_digest}"
   essential   = true
   environment = var.container_environment
   "secrets" = [{
                  "name": "TYPEORM_USERNAME",
                  "valueFrom": "${var.secret_id}:username::"
                },
                {
                  "name": "TYPEORM_PASSWORD",
                  "valueFrom": "${var.secret_id}:password::"
                },
                {
                  "name": "APP_JWK",
                  "valueFrom": "${var.parameter_id}"
                }]
   portMappings = [{
     protocol      = "tcp"
     containerPort = var.container_port
     hostPort      = var.container_port
   }],
   "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "${aws_cloudwatch_log_group.backend.name}",
            "awslogs-region": "${var.region}",
            "awslogs-stream-prefix": "ecs"
          }
   }
}])
}





