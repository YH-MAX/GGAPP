pipeline {

	environment {
        NODE_VERSION = '22.5.0'
        DOCKER_IMAGE = 'kieranec/quasarpoint:0.0.7'
    }

	agent {
		docker { 
			image 'kieranec/quasarpoint:0.0.7'
		}
	}

    stages {
        stage('Clone repository') {
            steps {
				checkout scmGit(branches: [[name: env.BRANCH_NAME]], extensions: [], userRemoteConfigs: [[credentialsId: 'ggjenkinsbuild', url: 'https://github.com/GlyphGrid/GGApp_Test.git']])
            }
        }
        
        stage('Install dependencies') {
            steps {
				sh 'npm install -g yarn'
                dir(env.WORKSPACE + '/frontend/GGAppFrontend') {
					sh 'sudo apt-get install tree'
					sh 'corepack enable'
					sh 'yarn config set nodeLinker node-modules'
                    sh 'yarn install'
                }
				dir(env.WORKSPACE + '/backend') {
					sh 'dotnet restore GGAppBackend'
				}
            }
        }

		stage('Debug') {
			steps('Debug node_modules') {
				dir(env.WORKSPACE + '/frontend/GGAppFrontend') {
					sh 'tree .'
				}
			}
		}

        stage('Build and Test') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir(env.WORKSPACE + '/frontend/GGAppFrontend') {
                            sh 'yarn test'
                        }
                    }
                }

                stage('Backend Tests') {
                    steps {
                        dir(env.WORKSPACE + '/backend') {
                            sh 'dotnet test GGAppBackend.Tests'
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