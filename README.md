# action-ros-lint

[![GitHub Action Status](https://github.com/ros-tooling/action-ros-lint/workflows/Test%20action-ros-lint/badge.svg)](https://github.com/ros-tooling/action-ros-lint) [![Greenkeeper badge](https://badges.greenkeeper.io/ros-tooling/action-ros-lint.svg)](https://greenkeeper.io/)

This action runs [ROS 2](https://index.ros.org/doc/ros/) linters on a ROS 2 package.

## Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
- uses: actions/checkout@v1
- uses: ros-tooling/setup-ros@master
- uses: ros-tooling/action-ros-lint@master
  with:
    package-name: your_package_name
```

Run generic and Python linters:

```yaml
jobs:
  ament_lint:
    runs-on: ubuntu-18.04
    strategy:
      fail-fast: false
      matrix:
          linter: [copyright, flake8, mypy, pep257, pep8, xmllint]
    steps:
    - uses: actions/checkout@v1
    - uses: ros-tooling/setup-ros@master
    - uses: ros-tooling/action-ros-lint@master
      with:
        linter: ${{ matrix.linter }}
        package-name: your_package_name
```

## License

The scripts and documentation in this project are released under the [Apache 2](LICENSE)
