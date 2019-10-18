import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";
import * as io from "@actions/io";

async function runAptGetInstall(packages: string[]): Promise<number> {
   return exec.exec(
        "sudo",
        ["DEBIAN_FRONTEND=noninteractive", "RTI_NC_LICENSE_ACCEPTED=yes",
         "apt-get", "install", "--no-install-recommends", "--quiet",
         "--yes"].concat(packages)
    )
}

async function run() {
  try {
    const linterTool = core.getInput("linter");
    const packageName = core.getInput("package-name");
    const ros2Distribution = core.getInput("distribution");
    const ros2WorkspaceDir = process.env.GITHUB_WORKSPACE;

    await exec.exec("rosdep", ["update"]);

    await runAptGetInstall([`ros-${ros2Distribution}-ament-${linterTool}`]);

    const repo = github.context.repo;
    const options = {
      cwd: ros2WorkspaceDir
    };
    await exec.exec(
        "bash",
        ["-c",
         `source /opt/ros/${ros2Distribution}/setup.sh && ament_${linterTool}`],
        options);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
