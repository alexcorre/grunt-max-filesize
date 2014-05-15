# grunt-max-filesize

> Throws an error if files are over a certain size.

## Getting Started
This plugin requires Grunt `~0.4.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-max-filesize --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-max-filesize');
```

## The "maxFilesize" task

### Overview
In your project's Gruntfile, add a section named `max_filesize` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  maxFilesize: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.maxBytes
Type: `Number`
Default value: `undefined`

The maximum number of bytes a file can be. If any files are larger than this value a fatal error will be thrown.

### Usage Examples

#### Default Options
There are no default options. If maxBytes option is not defined for the multitask or for subtasks, the maxFilesize will not run.

#### Verify files under X bytes.
Running this multitask will ensure that files in the `lib` directory are under 3000 bytes, and files in the `app` directory are under 10000 bytes. Using standard grunt file globbing works.

```js
grunt.initConfig({
  maxFilesize: {
    libs: {
      options: {
        maxBytes: 3000
      },
      src: ['lib/*']
    }
    app: {
      options: {
        maxBytes: 10000
      },
      src: ['app/*']
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
