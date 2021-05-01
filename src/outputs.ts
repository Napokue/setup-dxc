import * as core from "@actions/core";

export default class Outputs {
    private _dxcPath: string | undefined;

    public set DxcPath(value: string) {
        this.setOutput("dxc-path", value);
    }

    private setOutput(name: string, value: string) : string {
        return core.setOutput(name, value);
    }
}