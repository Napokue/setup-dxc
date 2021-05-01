import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as path from "path";
import Inputs from "./inputs";
import Outputs from "./outputs";

const IS_WINDOWS = process.platform === 'win32';

const DxcRepoUrl = "https://github.com/microsoft/DirectXShaderCompiler";

function GetDxcTagDownloadUrl(tag: string, filename: string) {
  return `${DxcRepoUrl}/releases/download/${tag}/${filename}`;
}

const inputs : Inputs = new Inputs();
const outputs : Outputs = new Outputs();

async function run() {
      if (IS_WINDOWS === false) {
        core.setFailed('setup-dxc can only be run on Windows runners.');
        return;
      }

      try {
        const dxcZipPath = await tc.downloadTool(GetDxcTagDownloadUrl(inputs.Tag, inputs.DxcDownloadFilename));

        const dxcPath = path.join(
          process.env["ProgramW6432"] as string,
          inputs.DxcFolder
        );  
        
        await tc.extractZip(dxcZipPath, dxcPath);

        const toolFolderPath = `${dxcPath}\\bin\\x64\\`;
        
        core.addPath(toolFolderPath);
        outputs.DxcPath = toolFolderPath;
      } catch (error) {
        core.setFailed(error.message);
      }
}

run();