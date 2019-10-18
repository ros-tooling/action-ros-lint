"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const github = __importStar(require("@actions/github"));
function runAptGetInstall(packages) {
    return __awaiter(this, void 0, void 0, function* () {
        return exec.exec("sudo", ["DEBIAN_FRONTEND=noninteractive", "RTI_NC_LICENSE_ACCEPTED=yes",
            "apt-get", "install", "--no-install-recommends", "--quiet",
            "--yes"].concat(packages));
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const linterTool = core.getInput("linter");
            const packageName = core.getInput("package-name");
            const ros2Distribution = core.getInput("distribution");
            const ros2WorkspaceDir = process.env.GITHUB_WORKSPACE;
            yield exec.exec("rosdep", ["update"]);
            yield runAptGetInstall([`ros-${ros2Distribution}-ament-${linterTool}`]);
            const repo = github.context.repo;
            const options = {
                cwd: ros2WorkspaceDir
            };
            yield exec.exec("bash", ["-c",
                `source /opt/ros/${ros2Distribution}/setup.sh && ament_${linterTool}`], options);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
