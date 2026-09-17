output "alb_dns_name" {
  value       = aws_lb.app_alb.dns_name
  description = "The public DNS name of the Application Load Balancer"
}

output "ec2_public_ip" {
  value       = aws_instance.app_server.public_ip
  description = "Public IP address of the EC2 instance"
}