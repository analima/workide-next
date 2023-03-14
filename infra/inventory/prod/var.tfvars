name= "gyan-next"
env= "prod"
region = "us-west-2"
vpc="vpc-0bd46e85953144f27"
container_port=3000
cidr="10.142.80.0/21"
subnets=["subnet-05fd40e166201db1c","subnet-0b04a90487abc0cbc","subnet-06057086c6734afc1","subnet-0bc0a24e6d7212cfb"]
health_check_path="/"
alb_tls_cert_arn="arn:aws:acm:us-west-2:184313004318:certificate/d60f8293-08ab-4793-a5a2-075abb89d5c2"
container_image="184313004318.dkr.ecr.us-west-2.amazonaws.com/workidetechnology-next-prod:latest"
container_environment=[{"name": "APP_HOST", "value": "0.0.0.0"},
                        {"name": "APP_PORT", "value": "3000"},
                        {"name": "SKIP_PREFLIGHT_CHECK", "value": "true"},
                        {"name": "NEXT_PUBLIC_LOAD_VENDOR_SCRIPTS", "value": "false"}
                    ]
cluster_name="arn:aws:ecs:us-west-2:184313004318:cluster/cluster-workidetechnology-prod"
listener_arn="arn:aws:elasticloadbalancing:us-west-2:184313004318:listener/app/next-alb-prod/f1418c7b74977ef5/c986dff2b8c3dbbb"
retention=30
health_check_grace_period_seconds=300
secret_id="arn:aws:secretsmanager:us-west-2:184313004318:secret:dbinfo-prod-4bR123"
parameter_id="arn:aws:ssm:us-west-2:184313004318:parameter/APP_JWK"
bucket_name="files-workide-prod"
cpu=256
memory=1024
