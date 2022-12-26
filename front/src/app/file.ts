export class File {
  name: string | undefined;
  type: string | undefined;
  owner: string | undefined;
  createdTime: Date | undefined;
  isFolder:boolean | undefined;
  path: string | undefined;
  size:number | undefined;

  constructor(name: string | undefined, path: string | undefined, createdTime: Date | undefined, isFolder: boolean | undefined, size:number | undefined) {
    this.name = name
    this.path = path
    this.isFolder = isFolder
    this.createdTime = createdTime
    this.size = size
  }
}
