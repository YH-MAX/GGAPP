pipeline {

	environment {
        NODE_VERSION = '22.5.0'
        DOCKER_IMAGE = 'kieranec/quasarpoint:0.0.6'
    }

	agent {
		docker { 
			image 'kieranec/quasarpoint:0.0.6'
		}
	}

    stages {
        stage('Clone repository') {
            steps {
				checkout scmGit(branches: [[name: env.BRANCH_NAME]], extensions: [], userRemoteConfigs: [[credentialsId: 'github-app-quasarpoint', url: 'https://github.com/Kieran-EC/QuasarPoint.git']])
            }
        }
        
        stage('Install dependencies') {
            steps {
				sh 'npm install -g yarn'
                dir(env.WORKSPACE + '/frontend/QPAppFrontend') {
                    sh 'yarn install'
                }
				dir(env.WORKSPACE + '/backend') {
					sh 'dotnet restore QPAppBackend'
				}
            }
        }

        stage('Build and Test') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir(env.WORKSPACE + '/frontend/QPAppFrontend') {
                            sh 'yarn test'
                        }
                    }
                }

                stage('Backend Tests') {
                    steps {
                        dir(env.WORKSPACE + '/backend') {
                            sh 'dotnet test QPAppBackend.Tests'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}