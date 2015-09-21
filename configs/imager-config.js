var AWS_CREDENTIALS = require("./aws-credentials");

module.exports = {
    aws: {
        path: AWS_CREDENTIALS.image_path,
        region: AWS_CREDENTIALS.aws_region,
        accessKeyId: AWS_CREDENTIALS.access_key,
        secretAccessKey: AWS_CREDENTIALS.secret_key
    },
    cleanup: {
        versions: true,
        original: true
    },
    original: {
        awsImageAcl: 'private'
    },
    versions: [{
        identifier: "large",
        maxHeight: 1040,
        maxWidth: 1040,
        format: 'png',
        suffix: '-large',
        quality: 80,
        awsImageAcl: 'public-read'
    },{
        identifier: "medium",
        maxWidth: 780,
        aspect: '3:2!h',
        format: 'png',
        suffix: '-medium',
        awsImageAcl: 'public-read'
    },{
        identifier: "small",
        maxWidth: 320,
        aspect: '16:9!h',
        format: 'png',
        suffix: '-small',
        awsImageAcl: 'public-read'
    },{
        identifier: "thumb1",
        maxHeight: 100,
        aspect: '1:1',
        format: 'png',
        suffix: '-thumb1',
        awsImageAcl: 'public-read'
    },{
        identifier: "thumb2",
        maxHeight: 250,
        maxWidth: 250,
        aspect: '1:1',
        format: 'png',
        suffix: '-thumb2',
        awsImageAcl: 'public-read'
    }]
};