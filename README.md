# 🚀 Automated Multi-Tier Cloud Infrastructure for Funny Jokes App

A production-grade, highly scalable multi-tier web application infrastructure provisioned entirely through Infrastructure as Code (IaC), containerized with Docker Compose, and automated via GitHub Actions CI/CD pipelines on AWS.

---

## 🛠️ Tech Stack & Components
* **Cloud Provider:** Amazon Web Services (AWS - VPC, Subnets, EC2, Application Load Balancer, Security Groups)
* **Infrastructure as Code (IaC):** Terraform (Modular architecture, S3 Remote Backend, DynamoDB State Locking)
* **Containerization:** Docker & Docker Compose
* **Application Stack:** React.js (Frontend Client), Python & Flask (Backend REST API for Funny Jokes), Application Database
* **CI/CD Automation:** GitHub Actions
* **OS & Environment:** Ubuntu 22.04 LTS, Linux Shell

---

## 📐 Architecture & Data Flow Diagram

```mermaid
graph TD
    User([User / Browser]) -->|HTTP Port 3000| ALB[AWS Load Balancer]
    
    subgraph AWS_Cloud [AWS Cloud Infrastructure via Terraform]
        VPC[AWS VPC Network]
        SG[Security Groups]
        
        subgraph EC2_Server [EC2 Instance Ubuntu]
            Docker[Docker Compose Engine]
            FE[React Frontend]
            BE[Flask Backend API]
        end
    end

    ALB --> FE
    FE -->|API Request| BE
    BE -->|Save Data| DB[(Application DB)]
    
    %% Terraform Infrastructure & State Management
    TF[Terraform IaC] -.->|Provisions| VPC
    TF -.->|Provisions| EC2_Server
    TF -.->|Provisions| ALB
    TF -.->|State File| S3[(S3 Remote Backend)]
    TF -.->|State Locking| DDB[(DynamoDB Table)]


    
📂 Project Directory Structure


    Automated-multi-tier-cloud-infra/
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions pipeline configuration
├── app-status-ss/
│   ├── terravpc.png          # VPC & Subnets configuration view
│   ├── terraform-security.png# Security Groups firewall rules
│   ├── terralb.png           # Application Load Balancer setup
│   ├── s3terra.png           # Terraform S3 Remote Backend
│   ├── terradynamo.png       # DynamoDB State Locking table
│   ├── github-actions.png    # CI/CD pipeline success green check
│   └── live-app.png          # Running web application screenshot
├── backend/
│   ├── app.py                # Flask backend API logic
│   ├── Dockerfile            # Backend container instructions
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/                  # React components & UI logic
│   └── Dockerfile            # Frontend container instructions
├── terraform/
│   ├── alb.tf                # Load Balancer configurations
│   ├── backend.tf            # S3 remote backend & DynamoDB config
│   ├── ec2.tf                # Compute instance setup
│   ├── main.tf               # Main provider & configuration
│   ├── outputs.tf            # Output variables (Public IPs, DNS)
│   ├── sg.tf                 # Security group firewall rules
│   ├── variables.tf          # Terraform input variables
│   └── vpc.tf                # Networking, subnets & gateways
├── docker-compose.yml        # Multi-container orchestration
└── README.md                 # Project documentation




📸 Infrastructure & Architecture Proofs
AWS VPC Network Setup:

Security Groups & Firewall Rules:

Application Load Balancer (ALB):

Terraform Remote Backend (S3 & DynamoDB State Locking):

GitHub Actions CI/CD Pipeline Success:

Live Application Running:
⚙️ How to Run Locally / On Server


git clone [https://github.com/Huzaifakhan124/Automated-multi-tier-cloud-infra.git](https://github.com/Huzaifakhan124/Automated-multi-tier-cloud-infra.git)
cd Automated-multi-tier-cloud-infra



2. Run via Docker Compose
Bash
docker compose up --build -d


Access the Application
React Frontend: http://<SERVER_IP>:3000

Flask Backend API: http://<SERVER_IP>:5000
