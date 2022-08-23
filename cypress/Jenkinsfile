pipeline {
    agent any
    
    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main' , url: 'https://github.com/llpupp/testes-e2e-ebac-shop.git'
            }
        }
         stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
         stage('Executar Testes') {
            steps {
                bat 'npm run cy:run'
            }
        }
    }
}