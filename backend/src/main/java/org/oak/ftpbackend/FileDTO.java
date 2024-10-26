package org.oak.ftpbackend;

import java.util.Date;

public class FileDTO {
    private String name;
    private Boolean isFolder;
    private String path;
    private Date createdTime;
    private Long size;

    public FileDTO(String name, Boolean isFolder, String path, Long size, Long createdTime) {
        super();
        this.name = name;
        this.isFolder = isFolder;
        this.path = path;
        this.createdTime = new Date(createdTime);
        this.size = size;
    }

    @Override
    public String toString() {
        return "FileDTO{" +
                "name='" + name + '\'' +
                ", isFolder=" + isFolder +
                ", path='" + path + '\'' +
                ", createdTime=" + createdTime +
                ", size=" + size +
                '}';
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public FileDTO() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsFolder() {
        return isFolder;
    }

    public void setIsFolder(Boolean folder) {
        isFolder = folder;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }


}
