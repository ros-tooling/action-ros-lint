# action-ros-lint

[![GitHub Action Status](https://github.com/ros-tooling/action-ros-lint/workflows/Test%20action-ros-lint/badge.svg)](https://github.com/ros-tooling/action-ros-lint)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ros-tooling/action-ros-lint)](https://dependabot.com)

This action runs [ROS 2](https://index.ros.org/doc/ros/) linters on a ROS 2 package.
This command does not compile any code intentionally to make it as fast as possible (<2 min).
The objective is to give contributors feedback about their change quickly.
It may also be used to avoid wasting CI resources (no need to compile, and run the tests if it does not pass the linters).

For linting requiring to compile code, or to compile and run tests, [ros-tooling/action-ros-ci] can be used instead.

:warning: This action runs the linters available in the latest ROS 2 release (Eloquent). This action output may not match other ROS 2 releases, or ROS 2 development branches.

## Developing

For development and release workflows, see [DEVELOPING.md](DEVELOPING.md)

## Usage

See [action.yml](action.yml)

### Basic

```yaml
container:
  image: ubuntu:bionic
steps:
- uses: actions/checkout@v2
- uses: ros-tooling/setup-ros@master
- uses: ros-tooling/action-ros-lint@master
  with:
    linter: copyright
    package-name: your_package_name
```

### Run generic and Python linters

```yaml
jobs:
  ament_lint:
    runs-on: ubuntu-latest
    container:
      image: ubuntu:bionic
    strategy:
      fail-fast: false
      matrix:
          linter: [copyright, flake8, mypy, pep257, pep8, xmllint]
    steps:
    - uses: actions/checkout@v2
    - uses: ros-tooling/setup-ros@master
    - uses: ros-tooling/action-ros-lint@master
      with:
        linter: ${{ matrix.linter }}
        package-name: your_package_name
```

### Run generic and Python linters using a custom Docker image (experimental)

Using a custom Docker image removes the need to run `setup-ros`, which makes the
runs less flaky, and faster. This setup is new, and experimental.

The docker image is provided by [ros-tooling/setup-ros-docker].

```yaml
jobs:
  ament_lint:
    runs-on: ubuntu-latest
    container:
      image: rostooling/setup-ros-docker:ubuntu-bionic-ros-eloquent-ros-base-latest
      options: -u root  # setup-node requires root access
    strategy:
      fail-fast: false
      matrix:
          linter: [copyright, flake8, mypy, pep257, pep8, xmllint]
    steps:
    - uses: actions/checkout@v2
    - uses: ros-tooling/action-ros-lint@master
      with:
        linter: ${{ matrix.linter }}
        package-name: your_package_name
```

## License

The scripts and documentation in this project are released under the [Apache 2](LICENSE)

[ros-tooling/action-ros-ci]: https://github.com/ros-tooling/action-ros-ci
[ros-tooling/setup-ros-docker]: https://github.com/ros-tooling/setup-ros-docker
