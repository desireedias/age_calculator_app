const { option } = require("grunt");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
            development: {
                files:{
                    "dev/styles/main.css":"src/styles/main.less"
                }
            },
            production:{
                options:{
                    compress: true,
                },

                files:{
                    "dist/styles/main.min.css":"src/styles/main.less"
                }
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },

            javascript: {
                files: ['src/scripts/**/*.js'],
                tasks: ['copy:development'],
            },
            
            html: {
                files: ['src/*.html'],
                tasks: ['copy:development']
            }
        },

        replace: {
            production: {
                options: {
                    patterns: [
                        {
                            match: /href="\.\.\/dev\/styles\/main\.css"/g,
                            replacement: 'href="styles/main.min.css"'
                        },
                        { 
                            match: /src="\.\/scripts\/app\.js"/g, 
                            replacement: 'src="scripts/app.min.js"'
                        }
                    ]
                },
                files: [
                    {
                        expand: true, 
                        cwd: 'dist/', 
                        src: ['index.html'], 
                        dest: 'dist/'
                    }
                ]
            }
        },

        uglify: {
            production: {
                files: {
                    "dist/scripts/app.min.js":"src/scripts/app.js",
                }
            }
        },

        copy: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: 'index.html',
                    dest: 'dev/'
                },
                {
                    expand: true,
                    cwd: 'src/scripts',
                    src: 'app.js',
                    dest: 'dev/scripts'
                }
            ]
            },
            production: {
                files:[
                    {
                        expand: true,
                        cwd: 'src/',
                        src: 'index.html',
                        dest: 'dist/',
                    }
                ]
            }
        }

    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace')

    grunt.registerTask('dev', ['less:development', 'copy:development' ])
    grunt.registerTask('default', ['dev', 'watch']);
    grunt.registerTask('build', ['less:production', 'uglify:production', 'copy:production', 'replace:production']);
}
