# Napokue/setup-dxc
A GitHub Action to setup the DirectXShaderCompiler in the workflow. The compiler will also become available in the PATH variable.

## Inputs

### `tag`
**Required** Tag that will be used to download a specific version of the DirectXShaderCompiler release.

### `dxc-download-filename`
**Required** Filename that will be downloaded from the tag. 

**Note:** This is a temporarily input, until we implemented a way to automatically get the right zip file from the release.

### `dxc-folder`
**Optional** input that specifies that folder name where the dxc zip will be extracted to. Default value is `dxc`.

## Outputs

### `dxc-path`
Location of the dxc compiler.

## Example Usage
```yml
- name: Add DirectXShaderCompiler
  uses: napokue/setup-dxc@vx.x.x # where x.x.x is Major, Minor, and Revision respectively
```
