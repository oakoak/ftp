export class File {
  name: string | undefined;
  type: string | undefined;
  owner: string | undefined;
  createdTime: Date | undefined;
  folder:boolean | undefined;
  path: string | undefined;

  constructor(name: string | undefined, path: string | undefined, createdTime: Date | undefined, folder: boolean | undefined) {
    this.name = name
    this.path = path
    this.folder = folder
    this.createdTime = createdTime
  }
}
