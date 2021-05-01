import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as path from "path";
import axios from "axios";
import Inputs from "./inputs";
import Outputs from "./outputs";

const inputs : Inputs = new Inputs();
const outputs : Outputs = new Outputs();

const IS_WINDOWS = process.platform === 'win32';

const GithubApiUrl = "https://api.github.com/repos/";
const DxcRepoName = "microsoft/DirectXShaderCompiler/";
const DxcApiUrl = `${GithubApiUrl}${DxcRepoName}releases/`;

// The dxc zip file always has the following format: "dxc_YYYY-MM-DD".
const DxcAssetPrefix = "dxc_"

function GetDxcReleaseApiUrl(tag: string) {
  if (tag === "latest") {
    return `${DxcApiUrl}${tag}`;
  }
  
  return `${DxcApiUrl}tags/${tag}`;
}

async function GetDxcAssetUrl() : Promise<string> {
  const res = await axios.get(GetDxcReleaseApiUrl(inputs.Tag));
  const assets : any[] = Object.values(res.data["assets"]);
  
  for (const asset of assets) {
    const name : string = asset["name"];
    if (name.startsWith(DxcAssetPrefix)) {
      return asset["browser_download_url"];
    }    
  }

  throw new Error("Dxc zip file could not be found.");
}

async function run() {
      if (IS_WINDOWS === false) {
        core.setFailed('setup-dxc can only be run on Windows runners.');
        return;
      }

      try {
        const dxcAssetUrl = await GetDxcAssetUrl();
        const dxcZipPath = await tc.downloadTool(dxcAssetUrl);

        const dxcPath = path.join(
          process.env["ProgramW6432"] as string,
          "dxc"
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