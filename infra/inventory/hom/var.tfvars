name= "gyan-next"
env= "hom"
region = "us-west-2" 
vpc="vpc-0ff531caadea3c221"
container_port=3000
cidr="10.142.80.0/21"
health_check_path="/"
alb_tls_cert_arn="arn:aws:acm:us-west-2:812671651954:certificate/621cf05e-6f6d-4d33-bd60-c4f276e8c7fb"
container_image="812671651954.dkr.ecr.us-west-2.amazonaws.com/gyan-next-hom:latest"
container_environment=[ {"name": "APP_HOST", "value": "0.0.0.0"},
                        {"name": "APP_PORT", "value": "3000"},
                        {"name": "TYPEORM_CONNECTION", "value": "postgres"},
                        {"name": "TYPEORM_HOST", "value": "gyan-hom.cyv2jz21vs4m.us-west-2.rds.amazonaws.com"},
                        {"name": "TYPEORM_DATABASE", "value": "gyan"},
                        {"name": "TYPEORM_PORT", "value": "5432"},
                        {"name": "TYPEORM_LOGGING", "value": "false"},
                        {"name": "TYPEORM_ENTITIES", "value": "dist/modules/**/infra/typeorm/entities/*.js"},
                        {"name": "STORAGE_DRIVER", "value": "s3"},
                        {"name": "AWS_BUCKET", "value": "files-gyan-hom"},
                        {"name": "NODE_ENV", "value": "hom"},
                        {"name": "APP_ORIGIN_WHITELIST", "value": "https://hom.gyan.com.br,http://localhost:3000,http://localhost:4000"},
                        {"name": "AWS_COGNITO_CLIENT_ID", "value": "6kuke6p0o87j3qrgbh21fnluhk"}
                        ]
cluster_name="cluster-gyan-hom"
subnets=["subnet-088f25a4bb7af05d9","subnet-071a0c615343f69f4","subnet-059a5378d9503100d","subnet-03657454904b0bf66"]
listener_arn="arn:aws:elasticloadbalancing:us-west-2:812671651954:listener/app/nextalbhom/898149bf7f67f3fb/43901740840d6ca4"
retention=14
health_check_grace_period_seconds=300
secret_id="arn:aws:secretsmanager:us-west-2:812671651954:secret:dbinfo-hom-FC7vSR"
parameter_id="arn:aws:ssm:us-west-2:812671651954:parameter/APP_JWK-HOM"
bucket_name="files-gyan-hom"
cpu=256
memory=1024
