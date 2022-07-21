name= "gyan-next"
env= "prod"
region = "us-east-1" 
vpc="vpc-0629c2c281f6e17d4"
container_port=3000
cidr="10.142.0.0/19"
health_check_path="/"
alb_tls_cert_arn="arn:aws:acm:us-east-1:812671651954:certificate/f41cfd52-8a15-4e87-9148-c6ed28c0c04b"
container_image="812671651954.dkr.ecr.us-east-1.amazonaws.com/gyan-next-prod:latest"
container_environment=[{"name": "APP_HOST", "value": "0.0.0.0"},
                        {"name": "APP_PORT", "value": "3000"},
                        {"name": "SKIP_PREFLIGHT_CHECK", "value": "true"}                        
                    ]
cluster_name="cluster-gyan-prod"
subnets=["subnet-0dd6e78bb871d3f17","subnet-00469d372f7b5b092","subnet-0ce475122233fc3ec","subnet-0f6209318ec3ad850"]
listener_arn="arn:aws:elasticloadbalancing:us-east-1:812671651954:listener/app/next-alb-prod/70930dad5f828ee3/fd54e30658c0b3cb"
retention=30
health_check_grace_period_seconds=300
secret_id="arn:aws:secretsmanager:us-east-1:812671651954:secret:dbinfo-9uuxfv"
parameter_id="arn:aws:ssm:us-east-1:812671651954:parameter/APP_JWK-PROD"
bucket_name="files-gyan-prod"
cpu=256
memory=1024




