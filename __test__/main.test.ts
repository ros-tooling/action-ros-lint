import * as action_ros_lint from "../src/action-ros-lint";

describe('Run workflow', () => {
    it('run workflow', async () => {
        await expect(action_ros_lint.run()).resolves.not.toThrow();
    })
})
