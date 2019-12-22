import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as path from "path";

async function runAptGetInstall(packages: string[]): Promise<number> {
	return exec.exec(
		"sudo",
		[
			"DEBIAN_FRONTEND=noninteractive",
			"RTI_NC_LICENSE_ACCEPTED=yes",
			"apt-get",
			"install",
			"--no-install-recommends",
			"--quiet",
			"--yes"
		].concat(packages)
	);
}

async function run() {
	try {
		const matchersPath = path.join(__dirname, "..");
		console.log(
			`##[add-matcher]${path.join(matchersPath, "ament_copyright.json")}`
		);
		console.log(
			`##[add-matcher]${path.join(matchersPath, "ament_flake8.json")}`
		);

		const linterTool = core.getInput("linter");
		const packageName = core.getInput("package-name", { required: true });
		const packageNameList = packageName.split(RegExp("\\s"));
		const rosDistribution = core.getInput("distribution");
		const rosWorkspaceDir =
			core.getInput("workspace-directory") || process.env.GITHUB_WORKSPACE;

		await exec.exec("rosdep", ["update"]);

		await runAptGetInstall([`ros-${rosDistribution}-ament-${linterTool}`]);

		const options = {
			cwd: rosWorkspaceDir
		};

		// The following command source setup.sh so that the linter can be used,
		// it then uses colcon list to determine the package directory, and finally
		// invoke the linter.
		await exec.exec(
			"bash",
			[
				"-c",
				`source /opt/ros/${rosDistribution}/setup.sh && ` +
					`ament_${linterTool} $(colcon list --packages-select ${packageNameList.join(
						" "
					)} -p)`
			],
			options
		);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
