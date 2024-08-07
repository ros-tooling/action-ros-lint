import * as core from "@actions/core";
import * as action_ros_lint from "../src/action-ros-lint";

describe('Run workflow', () => {
    it('run workflow', async () => {
        await expect(action_ros_lint.run()).resolves.not.toThrow();
        // Check and reset process exit code, which is set when core.setFailed() is called
        expect(process.exitCode).toBe(core.ExitCode.Failure);
        process.exitCode = core.ExitCode.Success;
    })
})
