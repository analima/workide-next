name= "arquivos-api"
env= "prod"
region = "us-east-1" 
vpc="vpc-0629c2c281f6e17d4"
container_port=3333
cidr="10.142.0.0/19"
health_check_path="/arquivos/health"
alb_tls_cert_arn="arn:aws:acm:us-east-1:812671651954:certificate/f41cfd52-8a15-4e87-9148-c6ed28c0c04b"
container_image="812671651954.dkr.ecr.us-east-1.amazonaws.com/arquivos-api-prod:latest"
container_environment=[
                        {"name": "APP_HOST", "value": "0.0.0.0"},
                        {"name": "APP_PORT", "value": "3333"},
                        {"name": "TYPEORM_CONNECTION", "value": "postgres"},
                        {"name": "TYPEORM_HOST", "value": "gyan-prod.c008gfx3jnyk.us-east-1.rds.amazonaws.com"},
                        {"name": "TYPEORM_DATABASE", "value": "gyan"},
                        {"name": "TYPEORM_PORT", "value": "5108"},
                        {"name": "TYPEORM_LOGGING", "value": "false"},
                        {"name": "TYPEORM_ENTITIES", "value": "dist/modules/**/infra/typeorm/entities/*.js"},
                        {"name": "STORAGE_DRIVER", "value": "s3"},
                        {"name": "AWS_BUCKET", "value": "files-gyan-prod"},
                        {"name": "NODE_ENV", "value": "prod"},
                        {"name": "APP_ORIGIN_WHITELIST", "value": "https://gyan.com.br"},
                        {"name": "AWS_COGNITO_CLIENT_ID", "value": "7lgg0n0ppopmf2t2vcii369naa"}
                    ]
cluster_name="cluster-gyan-prod"
subnets=["subnet-0dd6e78bb871d3f17","subnet-00469d372f7b5b092","subnet-0ce475122233fc3ec","subnet-0f6209318ec3ad850"]
listener_arn="arn:aws:elasticloadbalancing:us-east-1:812671651954:listener/app/backend-alb-prod/107ab2660f78b546/5ecf3cd3ad5e1b6f"
retention=30
health_check_grace_period_seconds=300
secret_id="arn:aws:secretsmanager:us-east-1:812671651954:secret:dbinfo-9uuxfv"
parameter_id="arn:aws:ssm:us-east-1:812671651954:parameter/APP_JWK-PROD"
bucket_name="files-gyan-prod"
cpu=256
memory=512
nlb_arn="arn:aws:elasticloadbalancing:us-east-1:812671651954:loadbalancer/net/backend-nlb-prod/8c65307acea7b66e"




