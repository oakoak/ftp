package org.oak.ftpbackend;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface FileService {
    List<FileDTO> getListFiles(String path);

    public void save(MultipartFile file);

    public Resource load(String filename);
}
