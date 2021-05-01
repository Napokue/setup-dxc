import * as core from "@actions/core";

const IS_WINDOWS = process.platform === 'win32';

async function run(): Promise<void> {
      if (IS_WINDOWS === false) {
        core.setFailed('setup-dxc can only be run on Windows runners.');
        return;
      }

      try {
          core.debug("Do something");          
      } catch (error) {
        core.setFailed(error.message);
      }      
}

run();