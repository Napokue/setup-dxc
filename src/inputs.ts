import * as core from "@actions/core";

export default class Inputs {
    private _tag: string | undefined;

    // TODO Temporarily input as dxc has 4 assets, and we don't have a way to get the right one implicity yet.
    private _dxcDownloadFilename: string | undefined;

    private _dxcFolder: string | undefined;

    public get Tag() {
        if (this._tag === undefined) {
            this._tag = this.getInput("tag");
        }
        
        return this._tag;
    }

    public get DxcDownloadFilename() {
        if (this._dxcDownloadFilename === undefined) {
            this._dxcDownloadFilename = this.getInput("dxc-download-filename")
        }

        return this._dxcDownloadFilename;
    }

    public get DxcFolder() {
        if (this._dxcFolder === undefined) {
            this._dxcFolder = this.getInput("dxc-folder")
        }

        return this._dxcFolder;
    }

    private getInput(name: string) : string {
        return core.getInput(name);
    }    
}