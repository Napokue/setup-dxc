import * as core from "@actions/core";

export default class Inputs {
    private _tag: string | undefined;

    public get Tag() {
        if (this._tag === undefined) {
            this._tag = this.getInput("tag");
        }
        
        return this._tag;
    }

    private getInput(name: string) : string {
        return core.getInput(name);
    }    
}