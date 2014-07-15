'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		assemble: {
			options: {
		        flatten: true,
		        prettify: {
		          indent: 2,
		          condense: true,
		          newlines: true
		        },
		        assets: 'assets/',
		        helpers: 'src/templates/helpers/*.js',
		        partials: ['src/templates/includes/*.hbs', 'src/templates/includes/email/*.hbs'],
		        layoutdir: 'src/templates/layouts',
		        layout: 'default.hbs',
		    },
	      	page001: {
	      		files: {'dist/001/': ['001/index.hbs']},
	      		options: {
	      			partials: '001/*.hbs',
	      			data: '001/*.json'
	      		}
	      	},
			email: {
				files: {'dist/email/': ['email/index.hbs']},
				options: {
					partials: 'email/*.hbs',
					data: 'email/*.json'
				}
			},
		},
		clean: ['dist/**/*'],
		connect: {
			options: {
				port: 8000,
				livereload: 35729,
				hostname: 'localhost',
				open: {appName: 'Google Chrome'},
				base: ['dist/']
			},
			livereload: true,
		},
		copy: {
			img: {
				expand: true,
					cwd: 'assets/img/',
					src: '*',
					dest: 'dist/assets/img/',
					flatten: true,
			},
			css: {
				expand: true,
					cwd: 'assets/css/',
					src: '*',
					dest: 'dist/assets/css/',
					flatten: true,
			}
		},
		less: {
			development: {
				options: {
					paths: ["assets/css"]
				},
					files: {
					"assets/css/main.css": "src/less/main.less"
				},
			},
		},
		replace: {},
		watch: {
			options: {
					livereload: true,
				},
			hbs: {
				files: ['001/*.hbs', 'email/*.hbs', 'src/templates/**/*.hbs'],
				tasks: ['assemble'],
			},
		},
	});
	// Load npm plugins to provide necessary tasks.
  	grunt.loadNpmTasks('assemble');
  	grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-text-replace');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	// Default task to be run.
  	grunt.registerTask('default', ['clean', 'less', 'assemble']);
  	grunt.registerTask('serve', ['clean', 'less', 'copy', 'assemble', 'connect', 'watch']);
};
