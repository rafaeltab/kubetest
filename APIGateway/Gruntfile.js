module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        bump: {
            options: {
                files: ["package.json"],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false,
                globalReplace: false,
                prereleaseName: false,
                metadata: "",
                regExp: false,
            },
        },
    });

    grunt.loadNpmTasks("grunt-bump");

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // Default task(s).
    grunt.registerTask("default", ["uglify"]);
};
