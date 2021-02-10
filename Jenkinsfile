node {

    def build = "${env.BUILD_NUMBER}"
    def imageName = "jodios/securital:${build}"
    def namespace = "prod"
    def image

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }
    
    stage('Replace variables in kube yaml'){
        contentReplace(
            configs: [
                variablesReplaceConfig(
                    configs: [
                        variablesReplaceItemConfig( 
                            name: 'deployment.image.name',
                            value: "${imageName}"
                        ),
                        variablesReplaceItemConfig( 
                            name: 'config.typeDNA.key',
                            value: "${env.typeDNAKey}"
                        ),
                        variablesReplaceItemConfig( 
                            name: 'config.typeDNA.secret',
                            value: "${env.typeDNASecret}"
                        ),
                        variablesReplaceItemConfig( 
                            name: 'config.twitter.key',
                            value: "${env.twitterKey}"
                        ),
                        variablesReplaceItemConfig( 
                            name: 'config.twitter.secret',
                            value: "${env.twitterSecret}"
                        )
                    ],
                    fileEncoding: 'UTF-8', 
                    filePath: 'kube.yaml', 
                    variablesPrefix: '#{', 
                    variablesSuffix: '}#'
            )]
        )
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        image = docker.build("${imageName}")
    }

    stage('Push image') {
        // pushing the image to dockerhub
        docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_creds') {
            image.push()
        }
    }

    stage('Deploy to Kubernetes'){
        sh "export KUBECONFIG=~/.kube/config"
        sh 'ls'
        sh "kubectl apply -f kube.yaml"
    }

}
