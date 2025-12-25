pipeline {
    agent any
    
    tools {
        nodejs 'Node25'  // Must match the name you set in Jenkins Tools
    }
    
    environment {
        DOCKER_IMAGE = 'react-vite-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'react-app-container'
        HOST_PORT = '3000'
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Code already checked out by Jenkins SCM'
                echo "Building from branch: ${env.GIT_BRANCH}"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                dir('frontend') {
                    sh 'npm test -- --run'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                dir('frontend') {
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:80 \
                        --restart unless-stopped \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }
        
        stage('Clean Up Old Images') {
            steps {
                echo 'Cleaning up old Docker images...'
                sh """
                    docker images ${DOCKER_IMAGE} --format "{{.Tag}}" | \
                    grep -E '^[0-9]+\$' | \
                    sort -rn | \
                    tail -n +6 | \
                    xargs -I {} docker rmi ${DOCKER_IMAGE}:{} || true
                """
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo "🚀 Application deployed at http://localhost:${HOST_PORT}"
            echo "📦 Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }
        failure {
            echo '❌ Pipeline failed!'
            echo 'Check the logs above for errors'
        }
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}