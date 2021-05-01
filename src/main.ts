import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as path from "path";
import Inputs from "./inputs";

const IS_WINDOWS = process.platform === 'win32';

const DxcRepoUrl = "https://github.com/microsoft/DirectXShaderCompiler";

function GetDxcTagDownloadUrl(tag: string, filename: string) {
  return `${DxcRepoUrl}/releases/download/${tag}/${filename}`;
}

const inputs : Inputs = new Inputs();

async function run(): Promise<void> {
      if (IS_WINDOWS === false) {
        core.setFailed('setup-dxc can only be run on Windows runners.');
        return;
      }

      try {
        console.log(inputs.Tag);
        console.log(inputs.DxcDownloadFilename);
        console.log(inputs.DxcFolder);

        const dxcZipPath = await tc.downloadTool(GetDxcTagDownloadUrl(inputs.Tag, inputs.DxcDownloadFilename));
        console.log(dxcZipPath);


        const dxcPath = path.join(
          process.env["ProgramW6432"] as string,
          inputs.DxcFolder
        );  
        
        console.log(dxcPath);

        const resultPath = await tc.extractZip(dxcZipPath, dxcPath);

        console.log(resultPath);        

      } catch (error) {
        core.setFailed(error.message);
      }      
}

run();