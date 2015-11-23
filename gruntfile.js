module.exports = function (grunt) {

    function main(gruntConfig) {
        grunt.initConfig(gruntConfig);
        loadTasks();
        registerTasks();
        grunt.log.ok("Welcome to the build script")
    }

    function registerTasks() {
        var strs = [];
        function register(a, c, b) {
            grunt.registerTask(a, b, c);
            strs.push(["|   > grunt " + a + (a.length < 9 ? "\t\t -- " : "\t -- ") + b, typeof c === "function" ? null : c]);
        }

        register('default', function () {
            strs.forEach(function (arr) {
                grunt.log.ok(arr[0]);
                arr[1] && arr[1].length > 1 && grunt.log.writeln(arr[1])
            })
        }, 'Usage')

        register('prepare', ["copy:prepare", "symlink:prepare"],
            'Prepare for development -- only needed once to copy libs and create a src symlink in wwwroot');
        register('run', ['connect', 'open', 'watch'],
            "Run the dev server and watch for TS file changes; also opens browser");
    }

    function loadTasks() {
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-symlink');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-open');
        grunt.loadNpmTasks('grunt-ts');
    }

    main({
        pkg: grunt.file.readJSON('package.json'),

        // grunt-contrib-connect
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './wwwroot/'
                }
            }
        },

        // grunt-contrib-copy
        copy: {
            prepare: {
                expand: true,
                flatten: true,
                src: ['bower_components/phaser/build/phaser.js', 'bower_components/requirejs/require.js'],
                dest: 'wwwroot/libs/'
            }
        },

        // grunt-open
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        },

        // grunt-contrib-symlink
        symlink: {
            prepare: {
                src: 'src',
                dest: 'wwwroot/src'
            }
        },

        // grunt-ts
        ts: {
            default: {
                tsconfig: true
            }
        },

        // grunt-contrib-watch
        watch: {
            files: '**/*.ts',
            tasks: ['ts']
        }
    });
}
