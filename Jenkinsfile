pipeline {

	environment {
        NODE_VERSION = '22.5.1'
        DOCKER_IMAGE = 'kieranec/quasarpoint:0.0.8'
    }

	agent {
		docker { 
			image 'kieranec/quasarpoint:0.0.8'
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
					sh 'sudo apt-get install tree -y'
					sh 'corepack enable'
					sh 'yes | yarn config set nodeLinker node-modules'
                }
				dir(env.WORKSPACE + '/backend') {
					sh 'dotnet restore GGAppBackend'
				}
			}
		}

		stage('Build Frontend') {
			steps {
				dir(env.WORKSPACE + '/frontend/GGAppFrontend') {
					sh 'yarn --version'
					sh 'yarn cache clean && yarn install'
				}
			}
		}

		stage('Build Backend') {
			steps {
				dir(env.WORKSPACE + '/backend') {
					sh 'dotnet msbuild GGAppBackend.Tests -property:Configuration=Release'
				}
			}
		}

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