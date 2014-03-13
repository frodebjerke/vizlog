module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      less: {
        files: ['public/src/style/**/*.less'],
        tasks: ['less:dev']
      }
    },
    less: {
      dev: {
        files: {
          'public/dist/style.css': 'public/src/style/**/*.less'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['less:dev', 'watch']);
};
