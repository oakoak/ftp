package org.oak.ftpbackend;




import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.Date;

public class FileDTO {
    private String name;
    private Boolean isFolder;
    private String path;
    private Date createdTime;

    public FileDTO(String name, Boolean isFolder, String path) {
        super();
        this.name = name;
        this.isFolder = isFolder;
        this.path = path;
        this.createdTime = new Date();
    }

    public FileDTO() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getFolder() {
        return isFolder;
    }

    public void setFolder(Boolean folder) {
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

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    @Override
    public String toString() {
        return "FileDTO{" +
                "name='" + name + '\'' +
                ", isFolder=" + isFolder +
                ", path='" + path + '\'' +
                ", createdTime=" + createdTime +
                '}';
    }
}
