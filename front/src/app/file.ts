export class File {
  name: string | undefined;
  type: string | undefined;
  owner: string | undefined;
  createdTime: Date | undefined;
  isFolder:boolean | undefined;
  path: string | undefined;

  constructor(name: string | undefined, path: string | undefined, createdTime: Date | undefined, isFolder: boolean | undefined) {
    this.name = name
    this.path = path
    this.isFolder = isFolder
    this.createdTime = createdTime
  }
}
