# Napokue/setup-dxc
A GitHub Action to setup the [DirectXShaderCompiler](https://github.com/microsoft/DirectXShaderCompiler) in the workflow.

This action will do the following steps:
* Download the the zip file from the [release page](https://github.com/microsoft/DirectXShaderCompiler/releases). Based on the input it will by default download the "latest" tagged release, otherwise it will download the specified tagged release.
* Extract the zip file to the `%ProgramW6432%\dxc` directory.
* Add the location of the bin folder of the compiler (`%ProgramW6432%\dxc\bin\x64`) to the PATH variable.
* Add the location of the bin folder of the compiler (`%ProgramW6432%\dxc\bin\x64`) to the `outputs`.

## Inputs

### `tag`
**Optional** that will download a tagged DirectXShaderCompiler release. When not specified, the latest tag will be downloaded.

## Outputs

### `dxc-path`
Location of the dxc compiler. This location will be `%ProgramW6432%\dxc\bin\x64`.

## Example Usage
```yml
- name: setup-dxc
  id: setup-dxc
  uses: napokue/setup-dxc@vx.x.x # where x.x.x is Major, Minor, and Revision respectively

# In the outputs, the variable "dxc-path" is available for use. This is the location of the dxc compiler.
- name: test-dxc-default
  run: |
    echo "setup-dxc-default - ${{steps.setup-dxc-default.outputs.dxc-path}}"
    dxc -help
```


