# Napokue/setup-dxc
A GitHub Action to setup the DirectXShaderCompiler in the workflow. The compiler will also become available in the PATH variable.

## Inputs

### `tag`
**Required** that will download a tagged DirectXShaderCompiler release. When not specified, the latest tag will be downloaded.

## Outputs

### `dxc-path`
Location of the dxc compiler.

## Example Usage
```yml
- name: Add DirectXShaderCompiler
  uses: napokue/setup-dxc@vx.x.x # where x.x.x is Major, Minor, and Revision respectively
```
