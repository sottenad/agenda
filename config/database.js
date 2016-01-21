var config = {
    "development": {
        'mongourl' : 'mongodb://localhost:27017/agenda-test'
    },
    "production": {
        'mongourl' : process.env.MONGOLAB_URI
    }
}

