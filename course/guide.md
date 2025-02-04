# **Advanced Kubernetes & Ethereum Course Guide**

Welcome to the **Advanced Kubernetes & Ethereum Course**! This guide will walk you through the step-by-step process of deploying Ethereum infrastructure in Kubernetes using **Besu, Teku, BlockScout, EthStats, and Smart Contracts**, while leveraging **GitOps principles with ArgoCD**.

## **Course Index**
📌 Click on each module to navigate to the corresponding section.

### **1. Introduction**
   - [Course Overview](modules/01-introduction.md)
   - [What You Will Learn](modules/01-introduction.md#what-you-will-learn)
   - [Why Kubernetes for Blockchain?](modules/01-introduction.md#why-kubernetes-for-blockchain)

### **2. Setting Up Kubernetes**
   - [Prerequisites](prerequisites.md)
   - [Installing Kubernetes Locally](modules/02-k8s-setup.md)
   - [Understanding Helm & ArgoCD](modules/02-k8s-setup.md#understanding-helm-argocd)

### **3. Deploying an Ethereum Private Network**
   - [Besu & Teku Setup](modules/03-ethereum-deployment.md)
   - [Deploying EthStats & BlockScout](modules/03-ethereum-deployment.md#deploying-ethstats-blockscout)
   - [Interacting with the Network](modules/03-ethereum-deployment.md#interacting-with-the-network)

### **4. Smart Contracts on Kubernetes**
   - [Compiling & Deploying Smart Contracts](modules/04-smart-contracts.md)
   - [Interacting with Deployed Contracts](modules/04-smart-contracts.md#interacting-with-deployed-contracts)

### **5. CI/CD with Kubernetes & ArgoCD**
   - [Automating Smart Contract Deployments](modules/05-ci-cd.md)
   - [Managing Ethereum Apps with GitOps](modules/05-ci-cd.md#managing-ethereum-apps-with-gitops)

### **6. Monitoring & Scaling Ethereum on Kubernetes**
   - [Observability with Prometheus & Grafana](modules/06-monitoring.md)
   - [Scaling Strategies for Blockchain Nodes](modules/06-monitoring.md#scaling-strategies-for-blockchain-nodes)

### **🛠 Hands-on Exercises**
   - [Lab Exercises](exercises/01-labs.md)
   - [Homework & Challenges](exercises/02-homework.md)

### **📚 Additional Resources**
   - [Useful Links](resources.md)
   - [Community & Support](resources.md#community-support)

---

Here's a detailed breakdown of all the elements and solutions mentioned in the **Kubernetes Ethereum Dev & Smart Contracts** repository:

---

## **Overview**
The project **Kubernetes Ethereum Dev & Smart Contracts** provides a fully automated deployment setup for Ethereum private networks using:
- **Besu** (Ethereum execution client)
- **Teku** (Ethereum consensus client)
- **BlockScout** (Blockchain explorer)
- **EthStats** (Ethereum network monitoring tool)
- **Smart Contracts** (Deployment and interaction)

The deployment is managed using **GitOps principles** with **ArgoCD**, ensuring a declarative and automated approach to Kubernetes application deployment.

---

## **GitOps with ArgoCD & GitHub**
GitOps is implemented using **ArgoCD**, which continuously monitors and syncs the Kubernetes cluster with configurations stored in this GitHub repository.

### **Installation & Configuration**
ArgoCD is installed via **Helm**, a package manager for Kubernetes:

```sh
helm upgrade --install argo-cd argo-cd/argo-cd -f ./argocd/values.yaml
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
```

### **Accessing ArgoCD**
After installation, ArgoCD can be accessed via HTTP:

```sh
argocd login argocd.local --plaintext --grpc-web
```

ArgoCD manages and deploys services automatically by reading the respective YAML configurations from the repository.

---

## **Local Deployment Environment**
The setup runs in a **local Kubernetes cluster** using:
- **WSL (Windows Subsystem for Linux)**
- **Rancher Desktop** (For managing Kubernetes & container runtime)
- **Docker** (Container runtime)

To verify the Kubernetes nodes:

```sh
kubectl get nodes -o wide
```

To check deployed pods:

```sh
kubectl get pods
```

To list all ingress rules:

```sh
kubectl get ing
```

To see all running services:

```sh
kubectl get svc
```

---

## **Manual Deployment**
Even though GitOps handles deployments, you can manually deploy or update services using **Helm**.

### **Adding Helm Repositories**
```sh
helm repo add argo-cd https://argoproj.github.io/argo-helm
helm repo add ethereum-helm-charts https://ethpandaops.github.io/ethereum-helm-charts
```

### **Removing Previous Deployments**
```sh
helm delete blockscout
helm delete besu
helm delete teku
helm delete ethstats
kubectl delete pvc --all
```

### **Installing/Upgrading Services**
```sh
helm upgrade teku --install ethereum-helm-charts/teku -f ./teku/values.yaml
helm upgrade besu --install ethereum-helm-charts/besu -f ./besu/values.yaml
helm upgrade blockscout --install ethereum-helm-charts/blockscout -f ./blockscout/values.yaml
helm upgrade ethstats --install ethereum-helm-charts/ethstats -f ./ethstats/values.yaml
```

---

## **Ethereum Clients & Tools**
### **1. Besu (Ethereum Execution Client)**
[Hyperledger Besu](https://www.hyperledger.org/use/besu) is an open-source Ethereum client that supports:
- Ethereum Mainnet
- Private networks
- Consortium networks with permissioned access
- JSON-RPC APIs for smart contract interactions
- Consensus mechanisms like **IBFT** and **PoA**

### **2. Teku (Ethereum Consensus Client)**
[Teku](https://consensys.net/teku) is an Ethereum 2.0 consensus client developed by **Consensys**, specifically for Proof-of-Stake operations.
- Used for **staking** and **validating transactions** on the Ethereum Beacon Chain.
- Supports **Beacon Chain API** to interact with the Ethereum 2.0 network.

### **3. EthStats (Ethereum Network Monitoring)**
[EthStats](https://github.com/Alethio/ethstats-network) provides real-time blockchain analytics:
- **Node performance**
- **Block propagation time**
- **Transaction count**
- **Peer connections**

It allows for network health monitoring through an interactive dashboard.

### **4. BlockScout (Ethereum Block Explorer)**
[BlockScout](https://blockscout.com/) is an **open-source block explorer** that:
- Displays blockchain transactions, addresses, and blocks.
- Provides a **user-friendly UI** to explore smart contract interactions.
- Supports Ethereum **Mainnet**, testnets, and private networks.

---

## **Deploying & Managing Smart Contracts**
The repository includes tools for **smart contract deployment**.

### **Building the Smart Contract Deployer Image**
A custom **Docker image** is used to deploy contracts:

```sh
docker build -t smart-contract-deployer:1.0 -f ./smart-contract-deployer-image/Dockerfile ./smart-contract-deployer-image
```

### **Deploying Smart Contracts**
To deploy a smart contract:

```sh
kubectl delete -f smart-contract-deployer/jobs/smart-contract.yaml \
    -f smart-contract-deployer/configmaps/smart-contract.yaml \
    -f smart-contract-deployer/configmaps/deploy.yaml
```

```sh
kubectl create -f smart-contract-deployer/jobs/smart-contract.yaml \
    -f smart-contract-deployer/configmaps/smart-contract.yaml \
    -f smart-contract-deployer/configmaps/deploy.yaml
```

### **Extracting the Smart Contract Address**
The contract address is extracted from logs:

```sh
kubectl logs deploy-smart-contract-game-2b9hg -f
```

Expected log output:

```sh
Deploying smart contract...
Contract deployed at: 0xCe9CCcF852eb14c7E65719B902356b0CA2e28c8A
Deployment complete.
```

The deployed contract can be verified in **BlockScout**.

---

## **Testing Smart Contracts**
### **Installing Dependencies**
```sh
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

### **Compiling Smart Contracts**
```sh
npx hardhat compile
```

### **Interacting with the Smart Contract**
Set the contract address:

```sh
export CONTRACT_ADDRESS=0xCe9CCcF852eb14c7E65719B902356b0CA2e28c8A
```

Run a test script:

```sh
npx hardhat run tests/solveRiddle.js --network development
```

Example output for an incorrect guess:

```sh
⏳ Attempting to solve the riddle with: 'Aserejee?'
❌ Error: Execution reverted: Incorrect answer.
```

Example output for a correct guess:

```sh
⏳ Attempting to solve the riddle with: 'Esteban'
✅ Riddle solved successfully!
```

If the correct answer is submitted, the contract updates its internal state.

If someone tries to solve the riddle again:

```sh
⏳ Attempting to solve the riddle with: 'Esteban'
❌ Error: Execution reverted: The riddle has already been solved.
```

The contract verification process is handled via BlockScout, enabling **"Read Contract"** and **"Write Contract"** functions.

---

## **Additional Tools**
### **1. Creating a New Wallet**
A script is provided to generate Ethereum wallets:

```sh
node tools/createWallet.js
```

Example output:

```sh
Address: 0xCe9CCcF85...
Private Key: 0xf7e69b...
```

---

## **Summary**
This project demonstrates a fully automated **Ethereum private network** deployment with:
✅ **Kubernetes & GitOps (ArgoCD)**  
✅ **Ethereum clients (Besu & Teku)**  
✅ **Monitoring tools (BlockScout & EthStats)**  
✅ **Smart contract deployment & interaction**  

🚀 **Now you're ready to deploy and interact with Ethereum on Kubernetes!**