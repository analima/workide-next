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
                        {"name": "SKIP_PREFLIGHT_CHECK", "value": "true"},
                        {"name": "REACT_APP_URL", "value": "https://hom.gyan.com.br"},
                        {"name": "REACT_APP_GERAL_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_OPORTUNIDADES_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_PESSOAS_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_CONSULTAS_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_ARQUIVOS_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_NOTIFICACOES_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_PAGAMENTOS_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_OFERTAS_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_EMAILS_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_API_URL", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_CHAT_API", "value": "https://api-hom.gyan.com.br"},
                        {"name": "REACT_APP_PROXY_HOST", "value": "react-hom.gyan.com.br"}
                        ]
cluster_name="cluster-gyan-hom"
subnets=["subnet-088f25a4bb7af05d9","subnet-071a0c615343f69f4","subnet-059a5378d9503100d","subnet-03657454904b0bf66"]
retention=14
health_check_grace_period_seconds=300
secret_id="arn:aws:secretsmanager:us-west-2:812671651954:secret:dbinfo-hom-FC7vSR"
parameter_id="arn:aws:ssm:us-west-2:812671651954:parameter/APP_JWK-HOM"
bucket_name="files-gyan-hom"
cpu=256
memory=1024
acm_arn="arn:aws:acm:us-west-2:812671651954:certificate/621cf05e-6f6d-4d33-bd60-c4f276e8c7fb"
nlb_arn="arn:aws:elasticloadbalancing:us-west-2:812671651954:loadbalancer/net/next-nlb-hom/13c1377e3b6dad12"