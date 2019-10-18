# action-ros2-lint

[![GitHub Action Status](https://github.com/thomas-moulard/action-ros2-lint/workflows/Test%20action-ros2-lint/badge.svg)](https://github.com/thomas-moulard/action-ros2-lint)

This action compiles [ROS 2](https://index.ros.org/doc/ros2/) from source, and run colon-test on the package under test.

## Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
- uses: actions/checkout@v1
- uses: thomas-moulard/setup-ros2@0.0.3
- uses: thomas-moulard/action-ros2-lint@master
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
    - uses: thomas-moulard/setup-ros2@0.0.3
    - uses: thomas-moulard/action-ros2-lint@master
      with:
        linter: ${{ matrix.linter }}
        package-name: your_package_name
```

## License

The scripts and documentation in this project are released under the [Apache 2](LICENSE)
