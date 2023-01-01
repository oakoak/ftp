package org.oak.ftpbackend;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface FileService {
    List<FileDTO> getListFiles(String path);

    public void save(MultipartFile file, String folder) throws IOException;

    public Resource load(String filename);

    public void move(String source, String target) throws IOException;

    public void delete(String fileName);
}
