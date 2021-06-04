module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        bump: {
            options: {
                files: ["package.json", "src/index.ts"],
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

    // Default task(s).
    grunt.registerTask("default", ["uglify"]);
};
