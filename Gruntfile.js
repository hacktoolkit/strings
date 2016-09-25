module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '_harp/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '_harp/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        less: {
            development: {
                options: {
                    paths: ['./_harp/assets/css'],
                    yuicompress: true
                },
                files: {
                    './_harp/assets/css/combined.css': ['./_harp/assets/_less/combined.less']
                }
            }
        },
        watch: {
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'qunit']
            },
            less: {
                files: [
                    './_harp/assets/_less/**/*.less',
                    './_harp/assets/htk/_less/**/*.less'
                ],
                tasks: ['less']
            },
            cssmin: {
                files: [
                    './_harp/assets/css/**/*.css',
                    '!./_harp/assets/css/**/*.min.css'
                ],
                tasks: ['cssmin']
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
