resource "aws_key_pair" "my_key" {
  key_name   = "aws_ec2_key"
  public_key = file("~/.ssh/aws_ec2_key.pub")
}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"]
}

resource "aws_instance" "app_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public[0].id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.my_key.key_name

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io docker-compose-plugin git
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
    cd /home/ubuntu
    git clone https://github.com/Huzaifakhan124/Automated-multi-tier-cloud-infra.git || true
    cd Automated-multi-tier-cloud-infra
    docker compose up -d
  EOF

  tags = {
    Name = "multi-tier-app-instance"
  }
}