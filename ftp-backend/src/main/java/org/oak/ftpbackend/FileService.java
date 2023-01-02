package org.oak.ftpbackend;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;


public interface FileService {
    List<FileDTO> getListFiles(String path);

    public boolean save(MultipartFile file, String folder) throws IOException;

    public Resource load(String filename);

    public Path move(String source, String target) throws IOException;

    public boolean delete(String fileName);
}
